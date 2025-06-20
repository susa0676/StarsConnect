import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm opacity-80"></div>
          </div>
          <span className="text-xl font-bold text-gray-800">STARS Connect</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-gray-600 hover:text-gray-800 transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-gray-800 transition-colors">
            About
          </Link>
          <Link href="/features" className="text-gray-600 hover:text-gray-800 transition-colors">
            Features
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-gray-800 transition-colors">
            Contact
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link href="/login" className="text-gray-600 hover:text-gray-800 transition-colors">
            Login
          </Link>
          <Link 
            href="/register" 
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Register
          </Link>
        </div>
      </nav>
      <section className="bg-white rounded-2xl shadow-lg p-8 p-6 sm:p-10 max-w-4xl mx-auto text-gray-800">
        <h1 className="text-4xl font-extrabold mb-6 text-indigo-700">Welcome to STARS Connect 🚀</h1>
        <p className="mb-4 text-lg leading-relaxed">
          STARS Connect is a mentorship and resource-sharing platform exclusively built for the VIT STARS community.
          Our mission is to bridge the gap between alumni and current students by creating a space for mentorship,
          career guidance, resource sharing, and inspiration.
        </p>
        <p className="mb-4 text-lg leading-relaxed">
          Whether you're a student seeking direction or an alumnus ready to give back — STARS Connect is your personalized
          gateway to a stronger, more connected future.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-indigo-600">Why STARS Connect?</h2>
        <ul className="list-disc pl-6 space-y-2 text-base">
          <li>🔗 Tailored to STARS students & alumni</li>
          <li>👨‍🏫 Mentor-Mentee matchmaking</li>
          <li>📚 Central resource library</li>
          <li>💬 Community Q&A platform</li>
          <li>🎓 Celebrating alumni success</li>
        </ul>
      </section>
    </main>
  );
}
