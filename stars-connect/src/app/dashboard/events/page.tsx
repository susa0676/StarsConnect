"use client"
import React, { useState } from 'react';
import { Search, Calendar, Clock, MapPin, Users, Filter, Plus } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  type: string;
  date: string;
  time: string;
  description: string;
  organizer: string;
  image: string;
  category: string;
}

type UserRole = 'admin' | 'alumni' | 'student';

interface User {
  id: number;
  name: string;
  role: UserRole;
  email: string;
}

const EventsMainContent = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('All Types');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [selectedAudience, setSelectedAudience] = useState<string>('All Audiences');
  
  // Mock current user - in real app, this would come from auth context
  const [currentUser] = useState<User>({
    id: 1,
    name: 'John Doe',
    role: 'alumni', // Change this to 'admin' or 'alumni' to test different permissions
    email: 'john.doe@example.com'
  });

  const events: Event[] = [
    {
      id: 1,
      title: 'Networking Fundamentals Webinar',
      type: 'Webinar',
      date: 'February 15, 2025',
      time: '4:00 PM - 5:00 PM',
      description: 'Learn the art of effective professional networking, online and offline.',
      organizer: 'STARS Alumni Association',
      image: '/api/placeholder/300/200',
      category: 'Professional Development'
    },
    {
      id: 2,
      title: 'Public Speaking Masterclass',
      type: 'Workshop',
      date: 'March 01, 2025',
      time: '2:00 PM - 4:00 PM',
      description: 'Boost your confidence and refine your presentation skills in this interactive masterclass.',
      organizer: 'STARS Communication Dept.',
      image: '/api/placeholder/300/200',
      category: 'Skills Development'
    },
    {
      id: 3,
      title: 'Guest Lecture: Entrepreneurship in the Digital Age',
      type: 'Guest Lecture',
      date: 'April 20, 2025',
      time: '11:00 AM - 12:30 PM',
      description: 'Learn from successful entrepreneurs about launching and scaling digital businesses.',
      organizer: 'STARS Business School',
      image: '/api/placeholder/300/200',
      category: 'Business'
    },
    {
      id: 4,
      title: 'Summer Research Opportunities Info Session',
      type: 'Webinar',
      date: 'April 25, 2025',
      time: '3:00 PM - 4:00 PM',
      description: 'Discover various research programs and funding opportunities for undergraduate students.',
      organizer: 'STARS Research Office',
      image: '/api/placeholder/300/200',
      category: 'Academic'
    },
    {
      id: 5,
      title: 'Annual Career Success Workshop',
      type: 'Workshop',
      date: 'October 26, 2024',
      time: '10:00 AM - 12:00 PM',
      description: 'Hands on session to enhance your resume writing and interview skills.',
      organizer: 'STARS Career Services',
      image: '/api/placeholder/300/200',
      category: 'Career'
    },
    {
      id: 6,
      title: 'Guest Lecture: Future of AI in Tech',
      type: 'Guest Lecture',
      date: 'November 10, 2024',
      time: '2:00 PM - 3:30 PM',
      description: 'Insights into the transformative impact of Artificial Intelligence on modern technology.',
      organizer: 'STARS Computer Science Dept.',
      image: '/api/placeholder/300/200',
      category: 'Technology'
    },
    {
      id: 7,
      title: 'Spring 2025 Internship Fair',
      type: 'Workshop',
      date: 'December 05, 2024',
      time: '9:00 AM - 4:00 PM',
      description: 'Connect with leading companies offering internships for the upcoming Spring semester.',
      organizer: 'STARS Career Services',
      image: '/api/placeholder/300/200',
      category: 'Career'
    },
    {
      id: 8,
      title: 'Mock Interview Marathon: Tech Edition',
      type: 'Mock Interview',
      date: 'January 20, 2025',
      time: '1:00 PM - 5:00 PM',
      description: 'Practice technical interviews with industry professionals and receive personalized feedback.',
      organizer: 'STARS Engineering Society',
      image: '/api/placeholder/300/200',
      category: 'Career'
    }
  ];

  const eventTypes: string[] = ['All Types', 'Webinar', 'Workshop', 'Guest Lecture', 'Mock Interview'];
  const categories: string[] = ['All Categories', 'Professional Development', 'Skills Development', 'Business', 'Academic', 'Career', 'Technology'];
  const audiences: string[] = ['All Audiences', 'Students', 'Alumni', 'Faculty', 'Industry Professionals'];

  const filteredEvents: Event[] = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.organizer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'All Types' || event.type === selectedType;
    const matchesCategory = selectedCategory === 'All Categories' || event.category === selectedCategory;
    
    return matchesSearch && matchesType && matchesCategory;
  });

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedType('All Types');
    setSelectedCategory('All Categories');
    setSelectedAudience('All Audiences');
  };

  // Check if user can create events (only admin and alumni)
  const canCreateEvents = currentUser.role === 'admin' || currentUser.role === 'alumni';
  
  // Function to get role display name
  const getRoleDisplayName = (role: UserRole): string => {
    const roleNames = {
      admin: 'Administrator',
      alumni: 'Alumni',
      student: 'Student'
    };
    return roleNames[role];
  };
  
  const getTypeColor = (type: string): string => {
    const colors: { [key: string]: string } = {
      'Webinar': 'bg-blue-600',
      'Workshop': 'bg-red-600',
      'Guest Lecture': 'bg-green-600',
      'Mock Interview': 'bg-purple-600'
    };
    return colors[type] || 'bg-gray-600';
  };

  return (
    <div className="flex-1 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Upcoming Events</h1>
          <p className="text-gray-600 mt-1">
            Welcome, {currentUser.name} ({getRoleDisplayName(currentUser.role)})
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          {canCreateEvents ? (
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
              <Plus size={20} />
              Create Event
            </button>
          ) : (
            <div className="text-right">
              <div className="text-sm text-gray-500 mb-1">
                Only administrators and alumni can create events
              </div>
              <button 
                disabled 
                className="bg-gray-300 text-gray-500 px-4 py-2 rounded-lg flex items-center gap-2 cursor-not-allowed"
              >
                <Plus size={20} />
                Create Event
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Role-based Information Banner */}
      {currentUser.role === 'student' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2">
            <Users className="text-blue-600" size={20} />
            <div>
              <h3 className="font-semibold text-blue-800">Student Access</h3>
              <p className="text-blue-700 text-sm">
                As a student, you can register for events. Contact your alumni network or administrators to suggest new events.
              </p>
            </div>
          </div>
        </div>
      )}

      {(currentUser.role === 'alumni' || currentUser.role === 'admin') && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2">
            <Users className="text-green-600" size={20} />
            <div>
              <h3 className="font-semibold text-green-800">
                {currentUser.role === 'admin' ? 'Administrator' : 'Alumni'} Access
              </h3>
              <p className="text-green-700 text-sm">
                You can create and manage events, as well as register for events organized by others.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search events, topics, organizers..."
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap gap-4">
            <select
              value={selectedType}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {eventTypes.map((type: string) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <select
              value={selectedCategory}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map((category: string) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <select
              value={selectedAudience}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedAudience(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {audiences.map((audience: string) => (
                <option key={audience} value={audience}>{audience}</option>
              ))}
            </select>

            <button
              onClick={clearFilters}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 underline transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredEvents.map((event: Event) => (
          <div key={event.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {/* Event Image */}
            <div className="relative h-48 bg-gradient-to-r from-gray-200 to-gray-300">
              <div className={`absolute top-3 left-3 ${getTypeColor(event.type)} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                {event.type}
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                <div className="w-16 h-16 bg-white bg-opacity-80 rounded-full flex items-center justify-center">
                  <Calendar className="text-gray-600" size={24} />
                </div>
              </div>
            </div>

            {/* Event Content */}
            <div className="p-6">
              <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">
                {event.title}
              </h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-600 text-sm">
                  <Calendar size={16} className="mr-2" />
                  {event.date}
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <Clock size={16} className="mr-2" />
                  {event.time}
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {event.description}
              </p>

              <div className="text-xs text-gray-500 mb-4">
                Organizer: {event.organizer}
              </div>

              {currentUser.role === 'student' ? (
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors duration-200">
                  Register for Event
                </button>
              ) : (
                <div className="space-y-2">
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors duration-200">
                    Register for Event
                  </button>
                  <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors duration-200 text-sm">
                    Manage Event
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="text-gray-400" size={32} />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No events found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Results Count */}
      {filteredEvents.length > 0 && (
        <div className="mt-8 text-center text-gray-600">
          Showing {filteredEvents.length} of {events.length} events
        </div>
      )}
    </div>
  );
};

export default EventsMainContent;