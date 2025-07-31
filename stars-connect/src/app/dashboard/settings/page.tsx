"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const SettingsPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    location: "",
    bio: "",
    photo: "",
  });

  useEffect(() => {
    const expire = localStorage.getItem("expire");
    const userId = localStorage.getItem("id");

    if (!expire || Date.now() > Number(expire)) {
      localStorage.clear();
      router.push("/login");
    }

    if (userId) {
      fetch(`http://localhost:5000/dashboard/settings/account/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          setForm(data.user);
        })
        .catch((err) => console.error(err));
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = localStorage.getItem("id");

    const res = await fetch(`http://localhost:5000/dashboard/settings/account/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Profile updated successfully!");
      router.push("/dashboard/profile");
    } else {
      alert("Update failed.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 mt-10 bg-white dark:bg-gray-900 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full p-2 border rounded" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full p-2 border rounded" />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="w-full p-2 border rounded" />
        <input name="dob" value={form.dob} onChange={handleChange} placeholder="Date of Birth" className="w-full p-2 border rounded" />
        <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="w-full p-2 border rounded" />
        <input name="photo" value={form.photo} onChange={handleChange} placeholder="Profile Image URL" className="w-full p-2 border rounded" />
        <textarea name="bio" value={form.bio} onChange={handleChange} placeholder="Bio" className="w-full p-2 border rounded" />
        <button type="submit" className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700">Save Changes</button>
      </form>
    </div>
  );
};

export default SettingsPage;
