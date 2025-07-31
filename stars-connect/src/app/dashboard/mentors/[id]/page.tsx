"use client";

import {useEffect,useState } from 'react'
import { useParams,useRouter} from "next/navigation";
import { MapPin, Award, Calendar, Star } from "lucide-react";

// Define type for mentor data
type Mentor = {
  id?:number,
  name?: string;
  title?: string;
  location?: string;
  experience?: string;
  sessions?: number;
  rating?: number;
  available?: boolean;
  bio?: string;
  expertise?: string[];
  photo?: string;
};

// Use string keys instead of numbers

export default function MentorProfilePage() {
  const router = useRouter();
  const expire = localStorage.getItem("expire");
  if(!expire || Date.now() > Number(expire)){
      localStorage.clear();
      router.push("/login");
  }
  const params = useParams();
  const idParam = Array.isArray(params?.id) ? params.id[0] : params?.id;
  if (!idParam) {
    return <div className="p-6">Invalid mentor ID</div>;
  }
  
  const [mentor,setMentor] = useState<Mentor | null>(null);
  useEffect(() =>{fetch(`http://localhost:5000/dashboard/mentors/${idParam}`,).then((res) => res.json()).then((data) => {setMentor(data)}).catch((err) => console.error(err))},[idParam])

  if (!mentor) {
    return <div className="p-6">Mentor not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
          <img
            src={mentor.photo}
            alt={mentor.name}
            className="w-40 h-40 rounded-full object-cover border-2 border-gray-200"
          />
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold text-gray-900">{mentor.name}</h1>
            <p className="text-gray-600">{mentor.title}</p>
            <div className="flex items-center text-sm text-gray-500 mt-2 gap-2 justify-center md:justify-start">
              <MapPin className="w-4 h-4" />
              <span>{mentor.location}</span>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center mb-6">
          <div className="flex flex-col items-center">
            <Award className="w-5 h-5 text-red-600 mb-1" />
            <p className="font-medium text-gray-800">{mentor.experience ||'Not updated'}</p>
            <span className="text-xs text-gray-500">Experience</span>
          </div>
          <div className="flex flex-col items-center">
            <Calendar className="w-5 h-5 text-red-600 mb-1" />
            <p className="font-medium text-gray-800">{mentor.sessions ||'No '}</p>
            <span className="text-xs text-gray-500">Sessions</span>
          </div>
          <div className="flex flex-col items-center">
            <Star className="w-5 h-5 text-yellow-500 mb-1" />
            <p className="font-medium text-gray-800">{mentor.rating ||'No one '}</p>
            <span className="text-xs text-gray-500">Rating</span>
          </div>
        </div>

        {/* Bio */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">About</h2>
          <p className="text-gray-700">{mentor.bio}</p>
        </div>

        {/* Expertise */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Expertise</h2>
          <div className="flex flex-wrap gap-2">
            {(mentor.expertise||["None"]).map((skill: string, index: number) => (
              <span
                className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Availability & Action */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div
            className={`text-sm font-medium px-4 py-2 rounded ${
              mentor.available
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {mentor.available
              ? "Available for Mentorship"
              : "Currently Unavailable"}
          </div>
          <button
            className={`px-6 py-2 text-white font-medium rounded-md transition ${
              mentor.available
                ? "bg-red-700 hover:bg-red-800"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!mentor.available}
          >
            {mentor.available ? "Request Mentorship" : "Unavailable"}
          </button>
        </div>
      </div>
    </div>
  );
}
