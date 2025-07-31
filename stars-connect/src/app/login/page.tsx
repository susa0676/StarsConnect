"use client"
import React, { useState ,useEffect} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/navigation'


const LoginPage: React.FC = () => {
  const router = useRouter();
  useEffect(() =>{
    fetch("http://localhost:5000/").then((res) => res.text()).then((data) => console.log("Backend connected")).catch(err => console.error("error"))
  },[]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [status,setStatus] = useState("");
  const [statType,setStatType] = useState("");

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    
    const res = await fetch('http://localhost:5000/login',{
      method:'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({ email,password})
    });
    const data = await res.json();
    if(res.ok){
      localStorage.setItem('name',data.name);
      localStorage.setItem('expire',(Date.now()+1800000).toString())
      localStorage.setItem('id',data.id)
      localStorage.setItem('role',data.role);
      localStorage.setItem('photo',data.photo);
      console.log("Login successfully",new Date(Number(localStorage.getItem('expire'))))
      router.push("/dashboard");
    }
    else{
      console.log("Invalid credential");
    }
    setStatType(data.statType);
    setStatus(data.status);
    setTimeout(()=>{setStatType("");setStatus("")},4000)
  };

  const handleGoogleLogin = () => {
    // Handle Google OAuth login
    console.log('Google login clicked');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Brand Section */}
      <div className="flex-1 bg-gradient-to-br from-pink-400 via-pink-500 to-rose-500 flex items-center justify-center relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-32 right-16 w-24 h-24 bg-white/15 rounded-full blur-lg"></div>
          <div className="absolute top-1/2 left-8 w-16 h-16 bg-white/20 rounded-full blur-md"></div>
        </div>
        
        <div className="text-center text-white z-10 px-8">
          {/* Logo */}
          <div className="flex items-center justify-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-500 rounded-lg flex items-center justify-center shadow-2xl">
              <div className="w-8 h-8 bg-white rounded-md opacity-80"></div>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">
            STARS Connect
          </h1>
          <p className="text-xl text-pink-100 font-light tracking-wide">
            Unlock Mentorship. Empower Futures.
          </p>
          
          {/* Decorative lines */}
          <div className="mt-12 flex items-center justify-center space-x-4">
            <div className="w-12 h-0.5 bg-white/30"></div>
            <div className="w-3 h-3 bg-white/40 rounded-full"></div>
            <div className="w-12 h-0.5 bg-white/30"></div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 bg-gray-50 flex items-center justify-center px-8">
        <div className="w-full max-w-md">
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Welcome to STARS Connect
              </h2>
              <p className="text-gray-600">Sign in to your account</p>
            </div>

            <form  className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                  required
                />
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <Link 
                    href="/forgot-password" 
                    className="text-sm text-pink-600 hover:text-pink-700 transition-colors"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              {/* Login Button */}
              <button onClick={handleSubmit}
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-pink-600 hover:to-rose-600 transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
              >
                Login
              </button>
              {status && (<p className ={`text-center text-sm text-${statType == 'success' ? "green":"red"}-600`}>{status}</p>)}

            </form>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-sm text-gray-500 bg-white">OR</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Google Login */}
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center space-x-3 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-gray-700 font-medium">Login with Google</span>
            </button>

            {/* Register Link */}
            <div className="mt-6 text-center">
              <span className="text-gray-600">Don't have an account? </span>
              <Link 
                href="/register" 
                className="text-pink-600 hover:text-pink-700 font-semibold transition-colors"
              >
                Register
              </Link>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              By signing in, you agree to our{' '}
              <Link href="/terms" className="text-pink-600 hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-pink-600 hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;