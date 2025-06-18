import React  from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage(){
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-white'>
      <nav className='flex items-center justify-between px-6 py-4 max-w-7xl mx-auto'>
        <div className='flex items-center space-x-2'>
          <div className='w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-lg flex items-center justify-center'>
            <div className='w-4 h-4 bg-white rounded-sm opacity-80'></div>
          </div>
          <span className='text-xl font-bold text-gray-800'>STARS Connect</span>
        </div>
        <div className='hidden md:flex items-center space-x-8'>
          <Link href="/" className='text-gray-600 hover:text-red-800 trasition-colors'>Home</Link>
          <Link href="/" className='text-gray-600 hover:text-red-800 trasition-colors'>About</Link>
          <Link href="/" className='text-gray-600 hover:text-red-800 trasition-colors'>Features</Link>
          <Link href="/" className='text-gray-600 hover:text-red-800 trasition-colors'>Contact</Link>
        </div>
        <div className='flex items-center space-x-4'>
          <Link href="/login" className='text-gray-600 hover:text-red-800 font-bold transition-colors'>Login</Link>
          <Link href="/register" className='bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors'>Register</Link>
        </div>
      </nav>
      <main className='max-w-7xl mx-auto px-6 py-12'>
        <div className='grid lg:grid-cols-2 gap-12 items-center'>
          <div className='space-y-8'>
            <div className='space-y-4'>
             <h1 className='text-5xl lg:text-6xl font-bold text-gray-900 leading-tight'>Unlock {' '}<span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">Mentorship</span> <br /> Empower {' '}<span className="bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent">Futures.</span></h1>
             <p className="text-lg text-gray-600 leading-relaxed max-w-lg">STARS Connect bridges students and alumni for unparalled carrer development and professional growth. Build your network, gain insights, and achieve your aspirations.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Get Started →
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Learn More
              </button>
            </div>
            <div className="flex space-x-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">10K+</div>
                <div className="text-sm text-gray-600">Students Connected</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">5K+</div>
                <div className="text-sm text-gray-600">Alumni Mentors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">95%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>
          
          </div>
          
      </main>
      <footer>

              </footer>
    </div>
  )
}