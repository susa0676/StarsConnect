"use client"
import { useState } from 'react';
import { Search, Download, FileText, Code, Database, Users, CheckSquare, Book } from 'lucide-react';

const ResourceLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedFileType, setSelectedFileType] = useState('All');

  const resources = [
    {
      id: 1,
      title: 'Operating Systems - Exam Paper S23',
      uploadedBy: 'Alice Johnson',
      uploadDate: '2023-11-15',
      icon: <FileText className="w-6 h-6 text-blue-600" />,
      bgColor: 'bg-blue-50',
      category: 'Academic'
    },
    {
      id: 2,
      title: 'Software Engineering Resume Template',
      uploadedBy: 'Bob Williams',
      uploadDate: '2023-11-14',
      icon: <Code className="w-6 h-6 text-gray-600" />,
      bgColor: 'bg-gray-50',
      category: 'Career'
    },
    {
      id: 3,
      title: 'DSA Practice Problems Set 1',
      uploadedBy: 'Charlie Brown',
      uploadDate: '2023-11-13',
      icon: <Database className="w-6 h-6 text-pink-600" />,
      bgColor: 'bg-pink-50',
      category: 'Practice'
    },
    {
      id: 4,
      title: 'Interview Prep: System Design Basics',
      uploadedBy: 'Diana Miller',
      uploadDate: '2023-11-12',
      icon: <FileText className="w-6 h-6 text-gray-600" />,
      bgColor: 'bg-gray-50',
      category: 'Interview'
    },
    {
      id: 5,
      title: 'Data Structures and Algorithms Handbook',
      uploadedBy: 'Alice Johnson',
      uploadDate: '2023-11-10',
      icon: <Book className="w-6 h-6 text-red-600" />,
      bgColor: 'bg-red-50',
      category: 'Academic'
    },
    {
      id: 6,
      title: 'Internship Application Checklist',
      uploadedBy: 'Frank White',
      uploadDate: '2023-11-09',
      icon: <CheckSquare className="w-6 h-6 text-orange-600" />,
      bgColor: 'bg-orange-50',
      category: 'Career'
    }
  ];

  const recentlyUploaded = [
    {
      title: 'Operating Systems - Exam Paper',
      uploadedBy: 'Alice Johnson',
      icon: <FileText className="w-4 h-4 text-blue-600" />
    },
    {
      title: 'Software Engineering Resume',
      uploadedBy: 'Bob Williams',
      icon: <Code className="w-4 h-4 text-gray-600" />
    },
    {
      title: 'DSA Practice Problems Set',
      uploadedBy: 'Charlie Brown',
      icon: <Database className="w-4 h-4 text-purple-600" />
    }
  ];

  const popularResources = [
    {
      title: 'Data Structures and Algorithms',
      uploadedBy: 'Alice Johnson',
      icon: <Book className="w-4 h-4 text-gray-800" />
    },
    {
      title: 'Salary Data Analysis - Tech',
      uploadedBy: 'Henry Wilson',
      icon: <FileText className="w-4 h-4 text-yellow-600" />
    },
    {
      title: 'Interview Prep: System Design',
      uploadedBy: 'Diana Miller',
      icon: <FileText className="w-4 h-4 text-pink-600" />
    }
  ];

  const categories = ['All', 'Academic', 'Career', 'Practice', 'Interview'];
  const fileTypes = ['All', 'PDF', 'DOC', 'PPT', 'XLS'];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex gap-6 p-6 bg-gray-50 min-h-screen">
      {/* Main Content */}
      <div className="flex-1">
        <div className="bg-white rounded-lg shadow-sm">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b">
            <h1 className="text-2xl font-bold text-gray-900">Resource Library</h1>
            <button className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-800 transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Upload
            </button>
          </div>

          {/* Search and Filters */}
          <div className="p-6 border-b">
            <div className="flex gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search resources by title or keyword..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <select 
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Resource Category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <select 
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                value={selectedFileType}
                onChange={(e) => setSelectedFileType(e.target.value)}
              >
                <option value="">File Type</option>
                {fileTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Resource Grid */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <div key={resource.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${resource.bgColor}`}>
                      {resource.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {resource.title}
                      </h3>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>Uploaded By: {resource.uploadedBy}</p>
                        <p>Upload Date: {resource.uploadDate}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-center">
                    <button className="text-gray-600 hover:text-gray-800 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-80 space-y-6">
        {/* Recently Uploaded */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recently Uploaded</h2>
          <div className="space-y-4">
            {recentlyUploaded.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="p-1">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-600">
                    {item.uploadedBy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Resources */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Popular Resources</h2>
          <div className="space-y-4">
            {popularResources.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="p-1">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-600">
                    {item.uploadedBy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceLibrary;