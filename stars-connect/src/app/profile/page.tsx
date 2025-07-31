"use client"

import React, { useState ,useEffect} from "react";
import {useRouter} from 'next/navigation'
const ProfilePage = () => {

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    role:"",
    phone:"",
    photo:"",
    dob:"",
    location:"",
    bio: "",
  });
  const router = useRouter();
  const expire = localStorage.getItem("expire");
  if(!expire || Date.now() > Number(expire)){
      localStorage.clear();
      router.push("/login");
  }
  useEffect(() => {fetch("http://localhost:5000/dashboard/settings/account/"+localStorage.getItem("id")).then(res => res.json()).then(data => setProfile(data.user)).catch(err => console.error(err))});

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">👤 Profile Setup</h1>

        {/* Profile Image Upload */}
        <div className="flex items-center gap-6 mb-8 justify-center">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-indigo-500 shadow-md">
            <img
              src={profile.photo || "https://via.placeholder.com/100"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            {Object.entries(profile).map(([k,v]) =>(
              <div >
                <table>
                  <tr>
                    <td>{k}</td><td>{v}</td>
                  </tr>
                  </table>
              </div>
            ))}
          </div>
        </div>

              </div>
    </main>
  );
};

export default ProfilePage;
