"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Send } from "lucide-react";
import Link from "next/link";

const mockMessages = [
  { from: "self", text: "Hi, I’m interested in connecting!", timestamp: "10:00 AM" },
  { from: "other", text: "Hey! Sure, let’s connect.", timestamp: "10:05 AM" },
];

export default function MessengerPage() {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState(mockMessages);

  const sendMessage = () => {
    if (!message.trim()) return;
    setChat([...chat, { from: "self", text: message, timestamp: new Date().toLocaleTimeString() }]);
    setMessage("");
  };

  return (
    <div className="p-4 min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-4">
        <div className="flex items-center gap-4 border-b pb-3 mb-3">
          <Link href="/dashboard/connections">
            <ArrowLeft className="text-gray-500 hover:text-gray-800 cursor-pointer" />
          </Link>
          <h2 className="text-lg font-semibold text-gray-800">Chat with User #{id}</h2>
        </div>

        <div className="space-y-4 h-96 overflow-y-auto border p-3 rounded">
          {chat.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-[75%] p-2 rounded-lg text-sm ${
                msg.from === "self"
                  ? "bg-blue-100 text-right ml-auto"
                  : "bg-gray-100 text-left"
              }`}
            >
              <p>{msg.text}</p>
              <span className="text-xs text-gray-400">{msg.timestamp}</span>
            </div>
          ))}
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
