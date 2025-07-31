"use client"
import React, { useState ,useEffect} from 'react';
import { Search, Download, FileText, Code, Database, Users, CheckSquare, Book, X } from 'lucide-react';
import {useRouter} from "next/navigation"
import Link from 'next/link';

import { url } from 'inspector';
import { Url } from 'next/dist/shared/lib/router/router';

const ResourceLibrary = () => {
  
  type FileResources = {
    id:string,
    uid:string,
    title: string,
    uploadedBy: string,
    role:string,
    uploadedAt: string,
    downloadUrl:string,
    category: string
  };
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedFileType, setSelectedFileType] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [resources,setResources] = useState<FileResources[]>([]);
  
  const router = useRouter();
  const expire = localStorage.getItem("expire");
  if(!expire || Date.now() > Number(expire)){
      localStorage.clear();
      router.push("/login");
  }
  useEffect(() =>{ 
    fetch("http://localhost:5000/dashboard/resources/").then((res) => res.json()).then((data) => setResources(data)).catch(err => console.error("error"))
  })
  const icon = [
    <FileText className="w-6 h-6 text-blue-600" />,<Code className="w-6 h-6 text-gray-600" />,
    <Database className="w-6 h-6 text-pink-600" />, <Book className="w-6 h-6 text-red-600" />
  ]
  const bg = ['red','gray','orange','pink']
  
  let recentlyUploaded = [{
    title: 'Operating Systems - Exam Paper',
    uploadedBy: 'Alice Johnson',
    icon: <FileText className="w-4 h-4 text-blue-600" />
  }];
  let popularResources = [{
    title: 'Data Structures and Algorithms',
    uploadedBy: 'Alice Johnson',
    icon: <Book className="w-4 h-4 text-gray-800" />
  }]
  const handleUploadSubmit = async(e : React.FormEvent) => {
    e.preventDefault();
    if (!title || !file) {
      setError("Please enter a title and choose a file.");
      return;
    }
    const formData = new FormData();
    formData.append('title',title);
    formData.append("description",description);
    formData.append('file',file);
    formData.append('uid',localStorage.getItem('id') || "") ;

    formData.append('uploadedBy',localStorage.getItem('name') || 'John');
    formData.append('role',localStorage.getItem('role') || 'Student') ;
    
    const res = await fetch("http://localhost:5000/dashboard/resources/upload",{
        method:'POST',
        body:formData
    })
    const data = await res.json();
    if(res.ok){
      setResources(prev => data)
      console.log("Uploaded");
    }

      setSuccess(true);
      setTimeout(() => {
      setSuccess(false);
      setTitle('');
      setDescription('');
      setFile(null);
      setIsModalOpen(false);
    }, 1500);
  };

 /* const resources = [
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
      icon: ,
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
  ];*/

  const categories = ['All', 'Academic', 'Career', 'Practice', 'Interview'];
  const fileTypes = ['All', 'PDF', 'DOC', 'PPT', 'XLS'];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex gap-6 p-6 bg-gray-50 min-h-screen relative">
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-2 right-2">
              <X className="w-5 h-5 text-gray-500 hover:text-red-500" />
            </button>
            <h2 className="text-lg font-semibold mb-4">Upload Resource</h2>
            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Resource Title" required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
              <textarea
                placeholder="Description (optional)"
                value={description} required
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
              <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
              {success && <p className="text-sm text-green-600">Upload successful!</p>}
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Upload</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1">
        <div className="bg-white rounded-lg shadow-sm">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b">
            <h1 className="text-2xl font-bold text-gray-900">Resource Library</h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-800 transition-colors flex items-center gap-2"
            >
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
              {filteredResources.map((resource,index) => (
                  <Link href={`/dashboard/resources/${resource.id}`} key={resource.id}>

                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg bg-${bg[index%4]}-50`}>
                      {icon[index%4]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {resource.title.toUpperCase()}
                      </h3>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>Uploaded By: {resource.uploadedBy} ({resource.role})</p>
                        <p>Uploaded Date: {resource.uploadedAt.slice(0,10)}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-center">
                    <a href={resource.downloadUrl} className="text-gray-600  hover:text-gray-800 transition-colors">
                      <Download className="w-4 h-4" />
                    </a>
                  </div>
                </div></Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-80 space-y-6">
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
