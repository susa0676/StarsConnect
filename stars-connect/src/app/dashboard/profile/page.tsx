"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    role: "",
    phone: "",
    photo: "",
    dob: "",
    location: "",
    bio: "",
  });
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const expire = localStorage.getItem("expire");
      const id = localStorage.getItem("id");

      if (!expire || Date.now() > Number(expire)) {
        localStorage.clear();
        router.push("/login");
        return;
      }

      setIsClient(true);

      fetch(`http://localhost:5000/dashboard/settings/account/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.user) setProfile(data.user);
        })
        .catch((err) => console.error(err));
    }
  }, [router]);

  const { name, photo, role, ...rest } = profile;

  if (!isClient) return null;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col md:flex-row p-8">
        {/* Avatar Section */}
        <div className="inline-block text-center">
          <img
            src={photo || "https://via.placeholder.com/150"}
            alt="User Avatar"
            className="w-40 h-40 rounded-full object-cover border-4 border-purple-500"
          />
          <Link href="./settings">
            <button className="mt-6 inline-block px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition">
              ✏️ Edit Profile
            </button>
          </Link>
        </div>

        {/* Info Section */}
        <div className="md:w-2/3 mt-6 md:mt-0 md:ml-10">
          <h2 className="text-2xl font-bold text-gray-800 pl-4 dark:text-white">{name}</h2>
          <p className="text-gray-500 dark:text-gray-300 pl-4 text-sm">{role}</p>

          <div className="mt-4 space-y-2 text-sm text-gray-700 dark:text-gray-200">
            {Object.entries(rest).map(([k, v]) => (
              <div key={k}>
                <table className="w-full border-0 px-4 py-2 text-left">
                  <tbody>
                    <tr>
                      <td className="w-1/4 px-4 py-2 text-left font-semibold">{k.toUpperCase()}</td>
                      <td className={`px-4 py-2 text-left ${k === "email" ? "" : "capitalize"}`}>
                        {typeof v === "object" ? JSON.stringify(v) : v}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
