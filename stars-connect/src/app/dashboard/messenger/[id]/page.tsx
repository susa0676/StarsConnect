"use client";

import { useRouter,useParams,useSearchParams } from "next/navigation";
import { useState,useEffect ,useRef} from "react";
import { ArrowLeft, Send } from "lucide-react";

import Link from "next/link";

const mockMessages = [
  { from: "", text: "Hi, I’m interested in connecting!", timestamp: new Date().toLocaleString()}];

const MessengerPage = () => {
  const param = useParams();
  const userid = param.id as string;
  const rout = useSearchParams()
  const to = rout.get("name");
  const ref = useRef<HTMLDivElement| null>(null)
  const chatContainerRef = useRef<HTMLDivElement| null>(null)
  const id = localStorage.getItem('id')== userid.split("-")[0]?userid.split("-")[1]:userid.split("-")[0];
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState(mockMessages);
  
  const sendMessage = async() => {
    if (!message.trim()) return;
    const newMsg = { from: localStorage.getItem('id'), text: message, timestamp: new Date().toLocaleString() }

    const res = await fetch(`http://localhost:5000/dashboard/messenger/${userid}`,{
      method:'POST',
      headers:{'content-type':'application/json'},
      body:JSON.stringify(newMsg)
    })
    const data = await res.json();
    if(res.ok){
      setChat(data);
      setMessage("");
      scrollDown();
    }
  };
  const router = useRouter();
  const expire = localStorage.getItem("expire");
  if(!expire || Date.now() > Number(expire)){
      localStorage.clear();
      router.push("/login");
  }
  useEffect(() => { fetch(`http://localhost:5000/dashboard/messenger/${userid}`).then(res => res.json()).then(data => {setChat(data);}).catch(err => console.error(err));},[])
  const scrollDown = () => {
    ref.current?.scrollIntoView({behavior:"smooth"})
  }

  return (
    <div className="p-4 min-h-4xl  bg-gray-50">
      <div className="max-w-5xl mx-auto bg-black rounded-lg shadow p-4">
        <div className="flex items-center gap-4 bg-white  border-b pb-3 mb-3 rounded-circle-3">
          <Link href="/dashboard/connections">
            <ArrowLeft className="text-gray-500 hover:text-gray-800 cursor-pointer" />
          </Link>
          <h2 className="text-lg font-semibold text-gray-800">Chat with User {to}</h2>
        </div>

        <div className="space-y-4 h-96 overflow-y-auto border p-3 rounded" ref = {chatContainerRef}>
          {chat.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-fit p-2 rounded-lg text-sm ${
                msg.from == localStorage.getItem('id')
                  ? "bg-blue-100 text-black text-right ml-auto"
                  : "bg-gray-100  text-left text-yellow-900"
              }`}
            >

             <h3 className={"bg-black-800 text-white-200"}>{msg.from == localStorage.getItem('id')?"You":to}</h3>
              <p>{msg.text}</p>
              <span className="text-xs text-gray-400 font-light">{msg.timestamp}</span>
              
            </div>
          ))}
          <div ref = {ref} />

        </div>
        <div className="mt-4 flex items-center gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
          />
          <button
            onClick={sendMessage}
            className="bg-red-600 text-white p-2 rounded hover:bg-red-700"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
export default  MessengerPage