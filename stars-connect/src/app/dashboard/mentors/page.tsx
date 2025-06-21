"use client"
import { useState } from 'react';
import { Search, MapPin, Building, Award, Clock, Calendar, Star } from 'lucide-react';

const FindMentor = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [availableOnly, setAvailableOnly] = useState(false);

  const mentors = [
    {
      id: 1,
      name: 'Dr. Emily Brown',
      title: 'Senior Software Engineer at Microsoft',
      location: 'Redmond, WA',
      company: 'Microsoft',
      experience: '8+ Years of Experience',
      rating: 4.9,
      sessions: 156,
      expertise: ['Software Development', 'System Design', 'Career Growth'],
      available: true,
      image: '/api/placeholder/80/80',
      price: 'Free',
      description: 'Passionate about helping junior developers grow their technical and leadership skills.'
    },
    {
      id: 2,
      name: 'Michael Wong',
      title: 'Lead Cybersecurity Engineer at Facebook',
      location: 'San Francisco, CA',
      company: 'Meta',
      experience: '10+ Years of Experience',
      rating: 4.8,
      sessions: 203,
      expertise: ['Cybersecurity', 'Network Security', 'Penetration Testing'],
      available: true,
      image: '/api/placeholder/80/80',
      price: 'Free',
      description: 'Expert in cybersecurity with extensive experience in threat detection and prevention.'
    },
    {
      id: 3,
      name: 'Dr. Arya Sharma',
      title: 'Principal Data Scientist at SalesForce Labs',
      location: 'Austin, TX',
      company: 'Salesforce',
      experience: '12+ Years of Experience',
      rating: 4.9,
      sessions: 289,
      expertise: ['Data Science', 'Machine Learning', 'AI Research'],
      available: true,
      image: '/api/placeholder/80/80',
      price: 'Free',
      description: 'Helping aspiring data scientists master ML algorithms and statistical analysis.'
    },
    {
      id: 4,
      name: 'David Rodriguez',
      title: 'Senior Full Stack Developer at Shopify',
      location: 'Toronto, ON',
      company: 'Shopify',
      experience: '7+ Years of Experience',
      rating: 4.7,
      sessions: 134,
      expertise: ['Full Stack Development', 'React', 'Node.js'],
      available: true,
      image: '/api/placeholder/80/80',
      price: 'Free',
      description: 'Passionate about modern web development and helping others build scalable applications.'
    },
    {
      id: 5,
      name: 'Sophia Lee',
      title: 'AI Research Scientist at DeepMind',
      location: 'London, UK',
      company: 'DeepMind',
      experience: '9+ Years of Experience',
      rating: 4.9,
      sessions: 167,
      expertise: ['Artificial Intelligence', 'Deep Learning', 'Research'],
      available: false,
      image: '/api/placeholder/80/80',
      price: 'Free',
      description: 'Research scientist specializing in advanced AI systems and neural networks.'
    },
    {
      id: 6,
      name: 'James O\'Connell',
      title: 'Senior DevOps Engineer at Netflix',
      location: 'Los Angeles, CA',
      company: 'Netflix',
      experience: '11+ Years of Experience',
      rating: 4.8,
      sessions: 198,
      expertise: ['DevOps', 'Cloud Architecture', 'Kubernetes'],
      available: true,
      image: '/api/placeholder/80/80',
      price: 'Free',
      description: 'Expert in cloud infrastructure and helping teams implement robust DevOps practices.'
    },
    {
      id: 7,
      name: 'Priya Patel',
      title: 'Product Manager at Stripe',
      location: 'San Francisco, CA',
      company: 'Stripe',
      experience: '6+ Years of Experience',
      rating: 4.8,
      sessions: 142,
      expertise: ['Product Management', 'Strategy', 'Analytics'],
      available: true,
      image: '/api/placeholder/80/80',
      price: 'Free',
      description: 'Experienced product manager focused on fintech and payment solutions.'
    },
    {
      id: 8,
      name: 'Kenji Tanaka',
      title: 'Senior UX Designer at Adobe',
      location: 'San Jose, CA',
      company: 'Adobe',
      experience: '8+ Years of Experience',
      rating: 4.7,
      sessions: 176,
      expertise: ['UX Design', 'User Research', 'Design Systems'],
      available: true,
      image: '/api/placeholder/80/80',
      price: 'Free',
      description: 'Passionate about creating intuitive user experiences and design thinking methodologies.'
    }
  ];

  const companies = ['All', 'Microsoft', 'Meta', 'Salesforce', 'Shopify', 'DeepMind', 'Netflix', 'Stripe', 'Adobe'];
  const experienceLevels = ['All', '5+ Years', '7+ Years', '10+ Years', '12+ Years'];

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.expertise.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCompany = !selectedCompany || selectedCompany === 'All' || mentor.company === selectedCompany;
    const matchesExperience = !selectedExperience || selectedExperience === 'All' || mentor.experience.includes(selectedExperience.split('+')[0]);
    const matchesAvailability = !availableOnly || mentor.available;
    
    return matchesSearch && matchesCompany && matchesExperience && matchesAvailability;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Find a Mentor</h1>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Filter Mentors</h2>
          <p className="text-gray-600 mb-4">Narrow down your search by applying filters below.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Expertise</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="e.g. Software Development"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Years of Experience */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                value={selectedExperience}
                onChange={(e) => setSelectedExperience(e.target.value)}
              >
                <option value="">Select experience</option>
                {experienceLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
              >
                <option value="">e.g. Google, Microsoft</option>
                {companies.map(company => (
                  <option key={company} value={company}>{company}</option>
                ))}
              </select>
            </div>

            {/* Available Only Toggle */}
            <div className="flex items-end">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={availableOnly}
                  onChange={(e) => setAvailableOnly(e.target.checked)}
                />
                <div className={`relative w-11 h-6 rounded-full transition-colors ${availableOnly ? 'bg-green-500' : 'bg-gray-200'}`}>
                  <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${availableOnly ? 'transform translate-x-5' : ''}`}></div>
                </div>
                <span className="ml-3 text-sm font-medium text-gray-700">Available Only</span>
              </label>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">{filteredMentors.length} mentors found</span>
            <button className="bg-red-700 text-white px-6 py-2 rounded-md hover:bg-red-800 transition-colors">
              Apply Filters
            </button>
          </div>
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMentors.map((mentor) => (
            <div key={mentor.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              {/* Profile Header */}
              <div className="p-6 text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-600">
                    {mentor.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{mentor.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{mentor.title}</p>
                <div className="flex items-center justify-center text-sm text-gray-500 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  {mentor.location}
                </div>
                <div className="flex items-center justify-center text-sm text-gray-600 mb-3">
                  <Award className="w-4 h-4 mr-1" />
                  {mentor.experience}
                </div>
                
                {/* Rating and Sessions */}
                <div className="flex items-center justify-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    {mentor.rating}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {mentor.sessions} sessions
                  </div>
                </div>

                {/* Expertise Tags */}
                <div className="flex flex-wrap gap-1 justify-center mb-4">
                  {mentor.expertise.slice(0, 2).map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Availability Status */}
              <div className="px-6 pb-4">
                <div className={`text-center py-2 rounded-md text-sm font-medium ${
                  mentor.available 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {mentor.available ? 'Available' : 'Unavailable'}
                </div>
              </div>

              {/* Action Button */}
              <div className="px-6 pb-6">
                <button 
                  className={`w-full py-2 rounded-md text-sm font-medium transition-colors ${
                    mentor.available
                      ? 'bg-red-700 text-white hover:bg-red-800'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={!mentor.available}
                >
                  {mentor.available ? 'Request Mentorship' : 'Request Mentorship'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          © 2025 STARS Connect. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default FindMentor;