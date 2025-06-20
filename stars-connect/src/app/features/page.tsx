import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function FeaturesPage() {
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
      <section className="bg-white rounded-2xl shadow-lg p-8 sm:p-10 max-w-4xl mx-auto text-gray-800">
        <h1 className="text-4xl font-extrabold mb-6 text-purple-700">🌟 Key Features</h1>
        <ul className="space-y-6 text-lg">
          <li>
            🧑‍🏫 <span className="font-semibold">Mentorship Matching:</span> Smart filters to match students with domain-relevant alumni mentors.
          </li>
          <li>
            📁 <span className="font-semibold">Resource Library:</span> Access previous year papers, resume templates, coding sets, and more.
          </li>
          <li>
            🎓 <span className="font-semibold">Alumni Spotlights:</span> Read inspiring success stories from past STARS members.
          </li>
          <li>
            💬 <span className="font-semibold">Q&A Forum:</span> Ask questions, get guidance — a mini StackOverflow for STARS.
          </li>
          <li>
            📢 <span className="font-semibold">Event Announcements:</span> Stay updated with webinars, mock interviews, and workshops.
          </li>
          <li>
            🛠️ <span className="font-semibold">Admin Panel:</span> Facilitates user/content moderation and event/resource management.
          </li>
        </ul>
      </section>
    </main>
  );
}