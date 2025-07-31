"use client"
import React, { useState } from 'react';
import { User, GraduationCap, Briefcase, Shield } from 'lucide-react';
import {useRouter} from 'next/navigation'
const RegistrationForm = () => {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState('');
  const [status,setStatus] = useState("");
  const [statType,setStatType] = useState("");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role:'',
    // Student fields
    rollNo: '',
    dept: '',
    year: '',
    domainInterests: '',
    skills: '',
    // Alumni fields
    passingYear: '',
    company: '',
    position: '',
    expertise: '',
    availability: '',
    // Admin fields
    adminCode: '',
    designation: ''
  });
  const departments = [
    "Computer Science and Engineering (CSE)",
    "Information Technology (IT)",
    "Electronics and Communication Engineering (ECE)",
    "Electrical and Electronics Engineering (EEE)",
    "Mechanical Engineering (ME)",
    "Civil Engineering (CE)",
    "Aerospace Engineering",
    "Biotechnology",
    "Biomedical Engineering",
    "Chemical Engineering",
    "Fashion Technology",
    "Artificial Intelligence and Data Science",
    "Artificial Intelligence and Machine Learning",
    "CSE - Business Systems with Data Analytics (TCS Collaboration)",
    "CSE - Blockchain Technology",
    "Robotics and Automation",
    "CSE - Gaming Technology",
    "CSE - Cyber Security and Digital Forensics",
    "CSE - Internet of Things (IoT)",
    "CSE - Human Computer Interaction",
    "Mechatronics",
    "Manufacturing Engineering"
  ];
  
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {

    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = async(e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();

  const form = e.currentTarget as HTMLFormElement; // ✅ This is the correct reference to the form element

  if (!form.checkValidity()) {
    form.reportValidity(); // 🔍 This triggers the browser validation message
    return;
  }
    if (formData.password !== formData.confirmPassword) {
      setStatus("Password and confirm password do not match")
      setStatType('failed');
      setTimeout(() => {setStatus('');setStatType('')},5000)
      return;
    }
    setStatus("Registered successfully");
    setStatType('success');
    setTimeout(() => {setStatus('');setStatType('')},5000)
    formData.role = selectedRole;
    formData.confirmPassword = '';
    let roleData = Object.fromEntries(Object.entries(formData).filter(([k,value]) => (value !== null && value !== undefined && value !== '')))
    const res = await fetch('http://localhost:5000/register',{
      method:'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify(roleData)
    });
    const data = await res.json();
    if(res.ok){
      console.log('Registration successful');
      router.push('/login');
    }
    else{
      console.log("Registration failed");
      router.push('/register');
    }
    setStatus(data.status)
    setStatType(data.statType);
    setTimeout(() => {setStatus('');setStatType('')})
  }
  const handleRoleChange = (role: React.SetStateAction<string>) => {
    setSelectedRole(role);
    // Reset role-specific fields when switching roles
    setFormData(prev => ({
      ...prev,
      rollNo: '',
      dept: '',
      year: '',
      domainInterests: '',
      skills: '',
      passingYear: '',
      company: '',
      position: '',
      expertise: '',
      availability: '',
      adminCode: '',
      designation: ''
    }));
  };

  const roleOptions = [
    { value: 'student', label: 'Student', icon: GraduationCap, color: 'bg-blue-500' },
    { value: 'alumni', label: 'Alumni', icon: Briefcase, color: 'bg-green-500' },
  ];

  return (
    
    < div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 relative overflow-hidden">
      {/* Background Logo Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="flex flex-wrap justify-center items-center h-full gap-32">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center space-x-3 transform rotate-12">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-sm opacity-80"></div>
              </div>
              <div className="text-2xl font-bold text-gray-800">
                STARS Connect
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="max-w-2xl mx-auto relative z-10">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="flex justify-center items-center mb-4 space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <div className="w-6 h-6 bg-white rounded-md"></div>
              </div>
              <div className="text-2xl font-bold text-gray-800">
                STARS Connect
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
            <p className="text-gray-600">Connect, learn, and grow with our community.</p>
          </div>

          <div className="space-y-6">
            {/* Role Selection */}
            <div className="flex flex-col items-center space-y-4">
    <h3 className="text-lg font-semibold text-gray-900">Select Your Role</h3>
    
    <div className="flex flex-row justify-center gap-5 flex-wrap ">
       {roleOptions.map((role) => {
                  const IconComponent = role.icon;
                  return (
                    <button
                      key={role.value}
                      type="button"
                      onClick={() => handleRoleChange(role.value)}
                      className={`p-4 rounded-xl border-2 w-60 h-30 transition-all duration-200 ${
                        selectedRole === role.value
                          ? `border-indigo-500 bg-indigo-50 shadow-md`
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                      }`}
                    >
                      <div className="flex flex-col items-center space-y-2">
                        <div className={`p-2 rounded-lg ${role.color} text-white`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <span className="font-medium text-gray-900">{role.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {selectedRole && (
              <form onSubmit={handleRegister}>

              <div className="space-y-6 animate-fadeIn">
                {/* Common Fields */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                    Basic Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password *
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                        placeholder="Create a password"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm Password *
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                        placeholder="Confirm your password"
                      />
                    </div>
                  </div>
                </div>

                {/* Role-specific Fields */}
                {selectedRole === 'student' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                      Student Information
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Roll Number *
                        </label>
                        <input
                          type="text"
                          name="rollNo"
                          value={formData.rollNo}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                          placeholder="e.g., 21CS001"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Department *
                        </label>
                        <select
                          name="dept"
                          value={formData.dept}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                        >
                          <option value="" disabled >Select Department</option>
                          {departments.map((dept) => (
                              <option key={dept} value={dept}>{dept}
    </option>
  ))}              </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Year *
                        </label>
                        <select
                          name="year"
                          value={formData.year}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                        >
                          <option value="" disabled >Select Year</option>
                          <option value="1">1st Year</option>
                          <option value="2">2nd Year</option>
                          <option value="3">3rd Year</option>
                          <option value="4">4th Year</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Domain Interests *
                      </label>
                      <input
                        type="text"
                        name="domainInterests"
                        value={formData.domainInterests}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                        placeholder="e.g., Web Development, AI/ML, Data Science"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Skills *
                      </label>
                      <textarea
                        name="skills"
                        value={formData.skills}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                        placeholder="List your technical skills (e.g., JavaScript, Python, React)"
                      />
                    </div>
                  </div>
                )}

                {selectedRole === 'alumni' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                      Alumni Information
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Passing Year *
                        </label>
                        <input
                          type="number"
                          name="passingYear"
                          value={formData.passingYear}
                          onChange={handleInputChange}
                          required
                          min="1990"
                          max="2025"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                          placeholder="e.g., 2020"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current Company *
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                          placeholder="e.g., Google, Microsoft, Startup"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Position *
                      </label>
                      <input
                        type="text"
                        name="position"
                        value={formData.position}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                        placeholder="e.g., Software Engineer, Product Manager"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expertise Areas *
                      </label>
                      <textarea
                        name="expertise"
                        value={formData.expertise}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                        placeholder="What you can mentor students in (e.g.,Blockchain, Cybersecurity, DevOps)"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Availability for Mentoring *
                      </label>
                      <select
                        name="availability"
                        value={formData.availability}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                      >
                        <option value="" disabled hidden>---Select available---</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-6">
                  <button
                    className="w-full bg-gradient-to-r from-red-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold text-lg shadow-lg hover:from-red-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200"
                  >
                    Create {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} Account
                  </button>
                </div>
                {status && (<p className ={`text-center text-sm text-${statType == 'success' ? "green":"red"}-600`}>{status}</p>)}
                <div className="text-center pt-4">
                  <p className="text-gray-600">
                    Already have an account?{' '}
                    <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium">
                      Sign in here
                    </a>
                  </p>
                </div>
              </div></form>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default RegistrationForm;