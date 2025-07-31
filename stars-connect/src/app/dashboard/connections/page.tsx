"use client";
import { useState ,useEffect} from "react";
import { UserPlus, UserCheck, UserX, Search } from "lucide-react";
import { useRouter } from 'next/navigation'; 

const ConnectionsPage = () => {
  
  type User = {
    id: number,
    name: string,
    role: string,
    status: "Connected" | "Pending" | "Requested"| "Not connected",
    mutualConnections: number
  }

  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const [mockUsers,setMockUsers] = useState<User[]>([]);
  useEffect(() => {fetch(`http://localhost:5000/dashboard/connections/${localStorage.getItem('id')}`).then((res) => res.json()).then((d) => {setMockUsers(d)}).catch(err => console.error(err))},[])
  const expire = localStorage.getItem("expire");
  if(!expire || Date.now() > Number(expire)){
      localStorage.clear();
      router.push("/login");
  }
  const filteredUsers = mockUsers.filter((user) =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleToConnect = async(id:number,request:string) =>{
    const res = await fetch(`http://localhost:5000/dashboard/connections/request`,{
      method:'POST',
      headers:{'content-type':'application/json'},
      body:JSON.stringify({id,uid:localStorage.getItem("id"),request})
    })
    const data = await res.json();
    if(res.ok){
      setMockUsers(data);
    }
  }

  const handleMessenger = (id:number,name:string) =>{
    const query = new URLSearchParams({name}).toString()
    router.push(`/dashboard/messenger/${[id,localStorage.getItem('id')].sort().join("-")}?${query}`)}
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Connections</h1>

      {/* Search Bar */}
      <div className="mb-6 max-w-md relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-red-500"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* User Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {filteredUsers.map((user) => (
    <div
      key={user.id}
      className="bg-white p-6 rounded-lg shadow group hover:shadow-md transition-all border flex flex-col justify-between"
    >
      {/* Top: User Info */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800">{user.name.charAt(0).toUpperCase()+user.name.slice(1)}</h2>
        <p className="text-gray-500 text-sm">{user.role.charAt(0).toUpperCase()+user.role.slice(1)}</p>
        <p className="text-xs text-gray-400 mt-1">{user.mutualConnections} mutual connections</p>
      </div>

      {/* Middle: Status */}
      <div className="mt-4">
        {user.status === "Connected" && (<>
          <div className="inline-flex items-center bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm gap-1">
            <UserCheck size={16} /> Connected
            
          </div>
          <button
          onClick={() => handleMessenger(user.id,user.name)}
          className="bg-blue-500 text-white m-4 px-4 py-1 rounded text-sm hover:bg-blue-600"
        >
          Message
        </button></>
        )}

        {user.status === "Pending" && (
          <div className="flex gap-2 mt-2">
            <button type="submit" onClick={() => handleToConnect(user.id,"Accept")} className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
              Accept
            </button>
            <button type="submit" onClick={() => handleToConnect(user.id,"Reject")} className="bg-gray-300 text-gray-800 px-3 py-1 rounded text-sm hover:bg-gray-400">
              Reject
            </button>
          </div>
        )}
        {user.status === "Requested" && (
          <button type="submit" onClick={() => handleToConnect(user.id,"Reject")} className="bg-gray-300 text-gray-800 px-3 py-1 rounded text-sm hover:bg-gray-400">
          Cancel Request
        </button>
        )}
      </div>

      {/* Bottom: Actions */}
      <div className="mt-6 flex justify-between items-center">
        

        {user.status === "Not connected" && (
          <button type="submit" onClick={() => handleToConnect(user.id,"Request")} className="bg-red-600 text-white px-4 py-1 rounded text-sm hover:bg-red-700">
            <UserPlus size={16} className="inline mr-1" />
            Connect
          </button>
        )}
      </div>
    </div>
  ))}
</div>


      {/* No Results */}
      {filteredUsers.length === 0 && (
        <p className="text-gray-500 text-center mt-12">No users found for "{searchTerm}"</p>
      )}
    </div>
  );
};

export default ConnectionsPage;