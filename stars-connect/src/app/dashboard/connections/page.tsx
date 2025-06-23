"use client";
import { useState } from "react";
import { UserPlus, UserCheck, UserX, Search } from "lucide-react";
import { useRouter } from 'next/navigation'; 

interface User {
  id: number;
  name: string;
  role: string;
  status: "Connected" | "Pending" | "Not Connected";
  mutualConnections: number;
}

const mockUsers: User[] = [
  { id: 1, name: "Alice Sharma", role: "Student", status: "Connected", mutualConnections: 5 },
  { id: 2, name: "Ravi Kumar", role: "Alumni", status: "Pending", mutualConnections: 2 },
  { id: 3, name: "Neha Verma", role: "Faculty", status: "Not Connected", mutualConnections: 8 },
  { id: 4, name: "Arjun Rao", role: "Student", status: "Connected", mutualConnections: 3 },
  { id: 5, name: "Sana Iqbal", role: "Industry", status: "Not Connected", mutualConnections: 1 },
];

const ConnectionsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const filteredUsers = mockUsers.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
        <p className="text-gray-500 text-sm">{user.role}</p>
        <p className="text-xs text-gray-400 mt-1">{user.mutualConnections} mutual connections</p>
      </div>

      {/* Middle: Status */}
      <div className="mt-4">
        {user.status === "Connected" && (
          <div className="inline-flex items-center bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm gap-1">
            <UserCheck size={16} /> Connected
          </div>
        )}

        {user.status === "Pending" && (
          <div className="flex gap-2 mt-2">
            <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
              Accept
            </button>
            <button className="bg-gray-300 text-gray-800 px-3 py-1 rounded text-sm hover:bg-gray-400">
              Reject
            </button>
          </div>
        )}
      </div>

      {/* Bottom: Actions */}
      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={() => router.push(`/dashboard/messenger/${user.id}`)}
          className="bg-blue-500 text-white px-4 py-1 rounded text-sm hover:bg-blue-600"
        >
          Message
        </button>

        {user.status === "Not Connected" && (
          <button className="bg-red-600 text-white px-4 py-1 rounded text-sm hover:bg-red-700">
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