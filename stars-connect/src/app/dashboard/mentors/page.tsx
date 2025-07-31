"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Search, MapPin, Award, Calendar, Star } from 'lucide-react';

const FindMentor = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [availableOnly, setAvailableOnly] = useState(false);
  const [mentors, setMentors] = useState<MentorData[]>([]);
  const [isClient, setIsClient] = useState(false);

  const router = useRouter();

  type MentorData = {
    id?: number;
    name?: string;
    bio?: string;
    location?: string;
    photo?: string;
    company?: string;
    experience?: string;
    rating?: string;
    sessions?: string;
    expertise?: string[];
    available?: boolean;
    price?: string;
    description?: string;
  };

  const companies = ['All', 'Microsoft', 'Meta', 'Salesforce', 'Shopify', 'DeepMind', 'Netflix', 'Stripe', 'Adobe'];
  const experienceLevels = ['All', '5+ Years', '7+ Years', '10+ Years', '12+ Years'];

  useEffect(() => {
    // Ensure the code runs on client only
    if (typeof window !== 'undefined') {
      const expire = localStorage.getItem("expire");
      if (!expire || Date.now() > Number(expire)) {
        localStorage.clear();
        router.push("/login");
      } else {
        setIsClient(true);
        fetch("http://localhost:5000/dashboard/mentors/")
          .then((res) => res.json())
          .then((data) => setMentors(data))
          .catch((err) => console.error(err));
      }
    }
  }, [router]);

  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch =
      (mentor.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (mentor.bio || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (mentor.expertise || []).some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesCompany =
      !selectedCompany || selectedCompany === 'All' || mentor.company === selectedCompany;

    const matchesExperience =
      !selectedExperience ||
      selectedExperience === 'All' ||
      (mentor.expertise || []).includes(selectedExperience.split('+')[0]);

    const matchesAvailability = !availableOnly || mentor.available;

    return matchesSearch && matchesCompany && matchesExperience && matchesAvailability;
  });

  if (!isClient) return null;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Find a Mentor</h1>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Filter Mentors</h2>
          <p className="text-gray-600 mb-4">Narrow down your search by applying filters below.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Expertise</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="e.g. Software Development"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                value={selectedExperience}
                onChange={(e) => setSelectedExperience(e.target.value)}
              >
                <option value="">Select experience</option>
                {experienceLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
              >
                <option value="">e.g. Google, Microsoft</option>
                {companies.map((company) => (
                  <option key={company} value={company}>
                    {company}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={availableOnly}
                  onChange={(e) => setAvailableOnly(e.target.checked)}
                />
                <div
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    availableOnly ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      availableOnly ? 'transform translate-x-5' : ''
                    }`}
                  ></div>
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

        {/* Mentor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMentors.map((mentor) => (
            <Link href={`/dashboard/mentors/${mentor.id}`} key={mentor.id || mentor.name}>
              <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                <div className="p-6 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                    {mentor.photo ? (
                      <img src={mentor.photo} className="w-20 h-20 rounded-full" alt="mentor" />
                    ) : (
                      <span className="text-2xl font-bold text-gray-600">
                        {(mentor.name || 'NA')
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{mentor.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{mentor.bio || "Title not updated"}</p>
                  <div className="flex items-center justify-center text-sm text-gray-500 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    {mentor.location || "Location not updated"}
                  </div>
                  <div className="flex items-center justify-center text-sm text-gray-600 mb-3">
                    <Award className="w-4 h-4 mr-1" />
                    {mentor.experience || "Experience not updated"}
                  </div>
                  <div className="flex items-center justify-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      {mentor.rating || "No rating"}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {mentor.sessions || "No"} sessions
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 justify-center mb-4">
                    {(mentor.expertise || ['None']).map((skill, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="px-6 pb-4">
                  <div
                    className={`text-center py-2 rounded-md text-sm font-medium ${
                      mentor.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {mentor.available ? 'Available' : 'Unavailable'}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          © 2025 STARS Connect. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default FindMentor;
