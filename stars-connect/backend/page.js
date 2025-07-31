
var express = require("express");
var session = require('express-session');
var path=require('path');
var fs = require('fs');
var cors = require('cors');
var app = express();
var multer = require('multer');
const { randomInt } = require("crypto");

const dirname = path.join(__dirname,'../src/app/')
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(dirname));
app.use(cors({
    origin:'http://localhost:3000',credentials:true
}));

app.use(session({
    secret:"stars",resave:false,saveUninitialized:true,cookie:{maxAge:90000}
}))


app.use("/dashboard/resources/download",express.static(path.join(__dirname,'uploads')));
let uniqueName;
const storage = multer.diskStorage({
    destination : (req,res,cb) => {
        const uploadDir = path.join(__dirname,'uploads');
        cb(null,uploadDir);
    },
    filename: (req,file,cb) => {
        uniqueName =  Date.now() + '_'+ req.body.title +path.extname(file.originalname);
        cb(null,uniqueName);
    }
});
let uniName;
const photo = multer.diskStorage({
    destination : (req,res,cb) => {
        const uploadDir = path.join(__dirname,'uploads');
        cb(null,uploadDir);
    },
    filename: (req,file,cb) => {
        uniName = req.params.id + '_' +"photo"+path.extname(file.originalname);
        cb(null,uniName);
    }
});
const profile = multer({storage:photo});
const upload = multer({storage});
app.get("/",() => {
    console.log("Frontend connected");
}) 

app.get("/dashboard/resources",(req,res) => {
    const data = fs.readFileSync(path.join(__dirname,'resources.json'));
    res.status(200).json(JSON.parse(data));
})

app.get("/dashboard/resources/:id",(req,res) => {
    const id = req.params.id;
    const data = JSON.parse(fs.readFileSync(path.join(__dirname,'resources.json')));
    const resfile = data.find(d => d.id == id)
    res.status(200).json(resfile);
})

app.post("/dashboard/resources/upload",upload.single('file'),(req,res) =>{
    for(const k in req.body){
        req.body[k] = capitalize(req.body[k])
    }
    const {title,description,uid,uploadedBy,role} = req.body;
    
    const file = req.file;
    if(!file) return res.status(410).json({msg:"File not found"})
    const fileData = {
        id:(file.filename).split(".")[0],uid,title,description,uploadedBy, role,originalName:file.originalname,fileName:file.fileName,
        downloadUrl:`http://localhost:5000/dashboard/resources/download/${file.filename}`,uploadedAt:new Date()
    };
    let resources = [];
    if(fs.existsSync(path.join(__dirname,'resources.json'))){
        const d = fs.readFileSync(path.join(__dirname,'resources.json'))
        resources = JSON.parse(d);
        resources.unshift(fileData);
        fs.writeFileSync(path.join(__dirname,'resources.json'),JSON.stringify(resources,null,2));
        res.status(200).json(resources)
    }
    else{
        res.status(401).json({msg:'Failure'});
    }
})

app.get("/dashboard/resources/download/:file",(req,res) => {
    const file = req.params.file;
    const fpath = path.join(__dirname,'uploads',file);
    if(fs.existsSync(fpath)) res.download(fpath)
    else res.status(404).json({status:"Not found"});
})

app.get("/dashboard/mentors",(req,res) =>{
    const data = fs.readFileSync(path.join(__dirname,'user.json'));
    const jdata = JSON.parse(data);
    const usr = jdata.filter(d => d.role === "Alumni")
    res.status(200).json(usr.map(({password,connections,...rest}) => rest));
})

app.get("/dashboard/mentors/:id",(req,res) => {
    const name = req.params.id;
    const data =  JSON.parse(fs.readFileSync(path.join(__dirname,'user.json')));
    const jdata =data.find(j => j.id == name && j.role == 'Alumni');
    if(!jdata || !data) res.status(404).json({status:"User not found"})
    const {password,connections,...rest} = jdata;
    res.status(200).json(rest)
})
app.get("/dashboard/forum",(req,res) => {
    const data = fs.readFileSync(path.join(__dirname,'q&a.json'));
    const jdata = JSON.parse(data);
    res.status(200).json(jdata);
})
app.post("/dashboard/forum/ask",(req,res) => {
    for(const k in req.body){
        req.body[k] = capitalize(req.body[k])
    }
    const {id,title ,aid, description,author} = req.body;
    const ques = JSON.parse(fs.readFileSync(path.join(__dirname,'q&a.json')));
    const user = JSON.parse(fs.readFileSync(path.join(__dirname,'user.json')));
    const aut = user.find(d => d.id == aid);
    const aa = aut.photo;
    const data = {id,title,description,aid,aa,author,time:new Date().toISOString(),answers:[]}
    if(!data) res.status(404).json({status:"Question uploaded is failed "})
    ques.unshift(data);
    fs.writeFileSync(path.join(__dirname,'q&a.json'),JSON.stringify(ques,null,2));
    console.log("Question is inserted successfully")
    res.status(200).json(ques)
})

app.post("/dashboard/forum/ans/:qid",(req,res) => {
    for(const k in req.body){
        req.body[k] = capitalize(req.body[k])
    }
    const qid = req.params.qid;
    const {id,answer,author,aid} = req.body;
    const que = fs.readFileSync(path.join(__dirname,'q&a.json'));
    const jque = JSON.parse(que);
    const user = JSON.parse(fs.readFileSync(path.join(__dirname,'user.json')));
    const aut = user.find(d => d.id == aid);
    const aa = aut.photo;
    let rep = jque.find(q => q.id === qid)
    if(!rep) res.status(404).json({status:"Question ID is not found"})
    const data = { id,answer,aid,aa,time:new Date().toISOString(),author}
    rep.answers.unshift(data);
    fs.writeFileSync(path.join(__dirname,'q&a.json'),JSON.stringify(jque,null,2))
    console.log("Answer is inserted successfully!");
    res.status(200).json(rep);
})

app.get("/dashboard/connections/:id",(req,res) => {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname,'user.json')));
    const id = req.params.id;
    const user = data.find((u) => u.id == id)
    const result = data.map(d => {
        if(d.id != user.id){
            const status = user.connections.connected.includes(d.id)?"Connected":
                            user.connections.received.includes(d.id)?"Pending":
                            user.connections.requested.includes(d.id)?"Requested":"Not connected";
            return {
                id:d.id,name:d.name,status,role:d.role
            }
        }
        else return ''
    })
    console.log("Connections data transfered")
    res.status(200).json(result);
})

app.post("/dashboard/connections/request",async(req,res) => {
    const {uid,id,request} = req.body;
    const data = JSON.parse(fs.readFileSync(path.join(__dirname,'user.json')))
    const from = data.find(d => d.id == uid);
    const to = data.find(d => d.id == id);
    if(request ==="Request" && !from.connections.connected.includes(to.id) && !from.connections.requested.includes(to.id) && !from.connections.received.includes(to.id) &&
    !to.connections.connected.includes(from.id) && !to.connections.requested.includes(from.id) && !to.connections.received.includes(from.id)){
        from.connections.requested.push(to.id);
        to.connections.received.push(from.id);
    }
    if(request === "Accept" && !from.connections.connected.includes(to.id) && !from.connections.requested.includes(to.id) && from.connections.received.includes(to.id) &&
    !to.connections.connected.includes(from.id) && to.connections.requested.includes(from.id) && !to.connections.received.includes(from.id)){
        to.connections.requested = to.connections.requested.filter(d => d !== from.id)
        from.connections.received = from.connections.received.filter(d => d !== to.id);
        from.connections.connected.push(to.id);
        to.connections.connected.push(from.id);
    }
    if(request === "Reject" && !from.connections.connected.includes(to.id) && !from.connections.requested.includes(to.id) && from.connections.received.includes(to.id) &&
    !to.connections.connected.includes(from.id) && to.connections.requested.includes(from.id) && !to.connections.received.includes(from.id)){
        to.connections.requested = to.connections.requested.filter(d => d !== from.id);
        from.connections.received = from.connections.received.filter(d => d !== to.id);
    }
    if(request === "Reject" && !from.connections.connected.includes(to.id) && from.connections.requested.includes(to.id) && !from.connections.received.includes(to.id) &&
    !to.connections.connected.includes(from.id) && !to.connections.requested.includes(from.id) && to.connections.received.includes(from.id)){
        from.connections.requested = from.connections.requested.filter(d => d !== to.id);
        to.connections.received = to.connections.received.filter(d => d !== from.id);
    }
    fs.writeFileSync(path.join(__dirname,"user.json"),JSON.stringify(data,null,2));
    const newData = await fetch(`http://localhost:5000/dashboard/connections/${from.id}`)
    res.status(200).json(await newData.json());
})
app.get("/dashboard/settings/account/:id",(req,res) => {
    const id = req.params.id;
    const data = JSON.parse(fs.readFileSync(path.join(__dirname,"user.json")))
    const user = data.find(d => d.id == id);
    if(!user) res.status(404).json({statType:"failed",status:"User not found",user:{err:"Not found"}})
    res.status(200).json({user:{photo:user.photo,name:user.name,role:user.role,email:user.email,phone:user.phone,location:user.location,dob:user.dob,bio:user.bio}})
})

app.post("/dashboard/settings/account/:id",profile.single('file'),async(req,res) => {
    const id = req.params.id;
    const data = JSON.parse(fs.readFileSync(path.join(__dirname,"user.json")))
    const user = data.find(d => d.id == id)
    const field = ["name","email","phone","location","dob","bio"]
    field.forEach((k) => {
        if(k == "email" && data.find(d => d.email == req.body[k]) && user.email != req.body[k]){
            return res.status(410).json({status:"Already email exist"})
        }
        if(req.body[k] && req.body[k].trim() !=='')
            user[k] = k!='email'?capitalize(req.body[k]):req.body[k]
    })
    if(req.file){
        user.photo = 'http://localhost:5000/dashboard/resources/download/'+uniName
    }
    fs.writeFileSync(path.join(__dirname,"user.json"),JSON.stringify(data,null,2));
    res.status(200).json({user:{photo:user.photo,name:user.name,role:user.role,email:user.email,phone:user.phone,location:user.location,dob:user.dob,bio:user.bio},status:"Profile updated successfully!",statType:"success"})
    
})

app.post("/dashboard/settings/chgpwd/:id",(req,res) => {
    const id = req.params.id;
    const {current,newPwd} = req.body;
    const data = JSON.parse(fs.readFileSync(path.join(__dirname,'user.json')));
    const user = data.find(d => d.id == id);
    if(user == -1)return res.status(403).json({msg:"User not find"});
    if(user.password != current) return res.status(404).json({msg:"Current Password is incorrect"});
    
    user.password = newPwd;
    fs.writeFileSync(path.join(__dirname,"user.json"),JSON.stringify(data,null,2))
    console.log("Password updated");
    res.status(200).json({status:"Password updated!"});
})
app.post("/dashboard/profile",(req,res) => {
    const id = req.body.id;
    const usrDet = JSON.parse(fs.readFileSync(path.join(__dirname,'user.json')))
    const usrRes = JSON.parse(fs.readFileSync(path.join(__dirname,'resources.json')))
    const usrQA = JSON.parse(fs.readFileSync(path.join(__dirname,'q&a.json')))
    const getDet = usrDet.find(d => d.id == id);
    if(!getDet) res.status(404).send("User not found")
    const {password,connections,...Personal }= getDet;
    const frd = [];
    connections.connected.forEach( q => {
        const d = usrDet.find(z => q == z.id);
        frd.push({name:d.name,role:d.role});
    })
    Personal.Friends = frd;
    const Question = [],Answer = [],Resource = [];
    usrQA.forEach(q =>{
        if(q.aid == id){
            Question.push({Question:q.title,CreatedAt:new Date(q.time).toLocaleString()})
        }
        q.answers.forEach(a =>{
            if(a.aid == id){
                Answer.push({Question:q.title,QuestionBy:q.author,QuestionAt:new Date(q.time).toLocaleString(),Answer:a.answer,AnswerAt:new Date(a.time).toLocaleString()})
            }
        })
    })
    usrRes.forEach(q=> {
        if(q.uid == id){
            Resource.push({Title:q.title,CreatedAt:new Date(q.uploadedAt).toLocaleString()})
        }
    })
    res.status(200).json({Personal,Resource,Question,Answer});

})
app.get("/dashboard/messenger/:id",async(req,res) => {
    const id= req.params.id;
    const data = JSON.parse(fs.readFileSync(path.join(__dirname,"messenger.json")));
    const msg = data.find(d => d.id == id);
    if(msg) res.status(200).json(msg.messages)
})

app.post("/dashboard/messenger/:id",async(req,res) => {
    const id= req.params.id;
    const getmsg = req.body;
    const data = JSON.parse(fs.readFileSync(path.join(__dirname,"messenger.json")));
    let newData = data.find(d => d.id == id);
    if(!newData){
        newData = {id:id,messages:[]}
        data.push(newData);
    }
    newData.messages.push(getmsg);
    fs.writeFileSync(path.join(__dirname,"messenger.json"),JSON.stringify(data,null,2));
    res.status(200).json(newData.messages);
})
function capitalize(name){
    return String(name).charAt(0).toUpperCase()+String(name).slice(1).toLowerCase()
}
app.post("/dashboard/",(req,res) => {
    const id = req.body.id
    const data = JSON.parse(fs.readFileSync(path.join(__dirname,'user.json')));
    const usr = data.find(d => d.id == id);
    const us ={name:usr.name,role:usr.role,avatar:usr.photo,email:usr.email,phone:usr.phone,location:usr.location,bio:usr.bio}
    if(usr)
        res.status(200).json({statType:"success",status:"User data fetched",user:us});
    else
        res.status(403).json({statType:"failed",status:"User data not found"})
})
app.post('/register',(req,res) => {
    const data = req.body;
    for(const k in data){
        if(k == "password" || k == "email"){}
        else
            data[k] = capitalize(data[k])
    }
    const email = req.body.email;
    data.id = randomInt(1,9)+ ""+Date.now()+"" +randomInt(1,9);
    data.name = capitalize(data.name);
    data.connections = {};
    data.connections.connected = [];
    data.connections.requested = [];
    data.connections.received = [];
    data.location = '';
    data.phone = '';
    data.dob = '';
    data.gender = '';
    data.bio = '';
    data.photo = '';
    if (data.role == 'Student'){
            data.skills = data.skills.replace(/\r?\n|\r/g, ' ')
            data.skills = data.skills.split(/[,|-]+/).map(d => capitalize(d.trim())).filter(word => word.length > 0);
            data.domainInterests = data.domainInterests.replace(/\r?\n|\r/g, ' ')

            data.domainInterests = data.domainInterests.split(/[,|-]+/).map(d => capitalize(d.trim())).filter(word => word.length > 0);
    }
    if(data.role =="Alumni" ){
        data.expertise = data.expertise.replace(/\r?\n|\r/g, ' ')
        data.expertise = data.expertise.split(/[,|-]+/).map(d => capitalize(d.trim())).filter(word => word.length > 0);
    }
    let users = [];
    const d = fs.readFileSync(path.join(__dirname,'user.json'))
    users = JSON.parse(d);
    const cid = users.find(user => user.id === data.id)
    if(cid)     data.id = randomInt(1,9)+ ""+Date.now()+""+randomInt(1,9);
    const check = users.find(user => user.email === email)
    if(!check){
        users.push(data);
        fs.writeFileSync(path.join(__dirname,'user.json'),JSON.stringify(users,null,2));
        console.log('Registered successful '+ email);
        res.status(200).json({statType:'success',status:"Registered successfully"});
    }
    else{
        res.status(401).json({statType:'failed',status:"Registered failed"});
    }
});

app.post('/login', (req,res) => {
    const {email,password} =req.body;
    let users = [];
    if(fs.existsSync(path.join(__dirname,'user.json'))){
        const d = fs.readFileSync(path.join(__dirname,'user.json'))
        users = JSON.parse(d);
    }
    const check = users.find(user => user.email === email && user.password === password )

    if(check){
        req.session.user = {id:check.id,name:check.name,role:check.role,avatar:check.photo};
        console.log('Login successful ');
        res.status(200).json({status:"Login successfully",statType:'Success',role:check.role,name:check.name,id:check.id,photo:check.photo})
    }
    else{
        res.status(401).json({statType:'Failure',status:"Invalid credential"});
    }

})
app.listen(5000,() => console.log("Server running on 5000"))
