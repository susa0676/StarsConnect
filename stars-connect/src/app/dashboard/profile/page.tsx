"use client";
import React from "react";
import Link from "next/link";

const ProfilePage = () => {
  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col md:flex-row p-8">
        {/* Avatar Section */}
        <div className="flex justify-center md:justify-start md:w-1/3">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face"
            alt="User Avatar"
            className="w-40 h-40 rounded-full object-cover border-4 border-purple-500"
          />
        </div>

        {/* Info Section */}
        <div className="md:w-2/3 mt-6 md:mt-0 md:ml-10">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">John Doe</h2>
          <p className="text-gray-500 dark:text-gray-300 text-sm">Computer Science • 3rd Year • Student</p>

          <div className="mt-4 space-y-2 text-sm text-gray-700 dark:text-gray-200">
            <p><span className="font-medium">Email:</span> john.doe@example.com</p>
            <p><span className="font-medium">Phone:</span> +91 9876543210</p>
            <p><span className="font-medium">College:</span> VIT University</p>
            <p><span className="font-medium">City:</span> Chennai</p>
          </div>

          <button
            className="mt-6 inline-block px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition"
          ><Link href="./settings">
            ✏️ Edit Profile</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
