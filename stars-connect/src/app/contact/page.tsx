import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ContactPage() {
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
      <section className="bg-white rounded-2xl shadow-lg p-8  sm:p-10 max-w-4xl mx-auto text-gray-800">
        <h1 className="text-4xl font-extrabold mb-6 text-pink-700">📞 Contact Us</h1>
        <p className="mb-4 text-lg">Have questions, suggestions, or need help?</p>
        <ul className="mb-6 space-y-2 text-base">
          <li>📧 <strong>Email:</strong> starsconnect@vit.ac.in</li>
          <li>📱 <strong>Phone:</strong> +91 98765 43210</li>
        </ul>
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500" placeholder="Your Name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500" placeholder="Your Email" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500" rows={4} placeholder="Your Message" />
          </div>
          <button type="submit" className="bg-pink-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-pink-700 transition">Submit</button>
        </form>
      </section>
    </main>
  );
}
