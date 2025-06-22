"use client"
import { useState } from 'react';
import Link from 'next/link';

import { Search, Plus, MessageCircle, ArrowUp, ChevronDown, User ,X} from 'lucide-react';

interface Question {
  id: number;
  title: string;
  description: string;
  author: string;
  authorAvatar: string;
  timeAgo: string;
  tags: string[];
  answers: number;
  upvotes: number;
  hasAnswers: boolean;
}

const QAForum = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showMoreTags, setShowMoreTags] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const questions: Question[] = [
    {
      id: 1,
      title: 'Best practices for securing web applications against XSS attacks?',
      description: 'Looking for robust security measures against XSS in web apps. Any best practices?',
      author: 'Alice Johnson',
      authorAvatar: '/api/placeholder/40/40',
      timeAgo: '2 days ago',
      tags: ['Cybersecurity', 'Web Dev', 'Security'],
      answers: 8,
      upvotes: 85,
      hasAnswers: true
    },
    {
      id: 2,
      title: 'How does Large Language Models (LLMs) attention mechanism work?',
      description: 'Demystifying LLM attention: how it processes text, and what\'s multi-head attention?',
      author: 'Bob Smith',
      authorAvatar: '/api/placeholder/40/40',
      timeAgo: '3 days ago',
      tags: ['AI', 'ML', 'Natural Language Processing'],
      answers: 5,
      upvotes: 62,
      hasAnswers: true
    },
    {
      id: 3,
      title: 'Optimizing React performance for large datasets?',
      description: 'Tips for optimizing React rendering with large datasets and lists.',
      author: 'Charlie Green',
      authorAvatar: '/api/placeholder/40/40',
      timeAgo: '4 days ago',
      tags: ['Web Dev', 'React', 'Performance'],
      answers: 12,
      upvotes: 110,
      hasAnswers: true
    },
    {
      id: 4,
      title: 'Docker containerization best practices for microservices?',
      description: 'What are the recommended practices for containerizing microservices with Docker?',
      author: 'Diana Miller',
      authorAvatar: '/api/placeholder/40/40',
      timeAgo: '5 days ago',
      tags: ['DevOps', 'Docker', 'Microservices'],
      answers: 7,
      upvotes: 43,
      hasAnswers: true
    },
    {
      id: 5,
      title: 'Understanding GraphQL vs REST API design patterns?',
      description: 'When should I choose GraphQL over REST? What are the trade-offs?',
      author: 'Eva Rodriguez',
      authorAvatar: '/api/placeholder/40/40',
      timeAgo: '6 days ago',
      tags: ['API', 'GraphQL', 'Web Dev'],
      answers: 9,
      upvotes: 76,
      hasAnswers: true
    },
    {
      id: 6,
      title: 'Machine Learning model deployment strategies for production?',
      description: 'Looking for best practices on deploying ML models at scale in production environments.',
      author: 'Frank Wilson',
      authorAvatar: '/api/placeholder/40/40',
      timeAgo: '1 week ago',
      tags: ['ML', 'DevOps', 'Production'],
      answers: 4,
      upvotes: 38,
      hasAnswers: true
    }
  ];

  const allTags: string[] = ['AI', 'ML', 'Web Dev', 'Cybersecurity', 'React', 'Performance', 'DevOps', 'Docker', 'Microservices', 'API', 'GraphQL', 'Security', 'Natural Language Processing', 'Production', 'Database', 'Cloud', 'Python', 'JavaScript'];
  const displayedTags: string[] = showMoreTags ? allTags : allTags.slice(0, 6);

  const toggleTag = (tag: string): void => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const getTagColor = (tag: string): string => {
    const colors: Record<string, string> = {
      'AI': 'bg-purple-100 text-purple-800',
      'ML': 'bg-blue-100 text-blue-800',
      'Web Dev': 'bg-green-100 text-green-800',
      'Cybersecurity': 'bg-red-100 text-red-800',
      'React': 'bg-cyan-100 text-cyan-800',
      'Performance': 'bg-orange-100 text-orange-800',
      'DevOps': 'bg-gray-100 text-gray-800',
      'Security': 'bg-red-100 text-red-800',
      'Natural Language Processing': 'bg-indigo-100 text-indigo-800'
    };
    return colors[tag] || 'bg-gray-100 text-gray-800';
  };

  const filteredQuestions: Question[] = questions.filter(question => {
    const matchesSearch = question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => question.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  return (
    <div className="flex gap-6 p-6 bg-gray-50 min-h-screen">
      {/* Sidebar */}
      

      {/* Main Content */}
      <div className="flex-1">
        <div className="bg-white rounded-lg shadow-sm">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b">
            <h1 className="text-2xl font-bold text-gray-900">Q&A Forum</h1>
            <button
  onClick={() => setIsModalOpen(true)}
  className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-800 transition-colors flex items-center gap-2"
>
  <Plus className="w-4 h-4" />
  Ask Question
</button>

          </div>

          {/* Search and Tags */}
          <div className="p-6 border-b">
            <div className="flex gap-4 items-center mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search questions..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-gray-600">Tags:</span>
              {displayedTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    selectedTags.includes(tag)
                      ? 'bg-red-700 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
              <button
                onClick={() => setShowMoreTags(!showMoreTags)}
                className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                {showMoreTags ? 'Less Tags' : 'More Tags'}
                <ChevronDown className={`w-3 h-3 inline ml-1 transition-transform ${showMoreTags ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>

          {/* Questions List */}
          <div className="p-6">
            <div className="space-y-6">
              {filteredQuestions.map((question) => (
                <div key={question.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    {/* Author Avatar */}
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-gray-600" />
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Author and Time */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-gray-900">{question.author}</span>
                        <span className="text-gray-500">•</span>
                        <span className="text-sm text-gray-500">{question.timeAgo}</span>
                      </div>

                      {/* Question Title */}
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-red-700 cursor-pointer">
                        {question.title}
                      </h3>

                      {/* Question Description */}
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {question.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {question.tags.map((tag, index) => (
                          <span key={index} className={`px-2 py-1 rounded-full text-xs font-medium ${getTagColor(tag)}`}>
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Stats and Action */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            <span>{question.answers} Answers</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <ArrowUp className="w-4 h-4" />
                            <span>{question.upvotes} Upvotes</span>
                          </div>
                        </div>
                        <Link href={`/dashboard/forum/${question.id}`}>
  <button className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-800 transition-colors text-sm">
    View Question
  </button>
</Link>

                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredQuestions.length === 0 && (
              <div className="text-center py-12">
                <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No questions found</h3>
                <p className="text-gray-600">Try adjusting your search terms or tags.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {isModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-6 relative">
      <button
        onClick={() => setIsModalOpen(false)}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        <X className="w-5 h-5" />
      </button>
      <h2 className="text-xl font-bold mb-4 text-gray-800">Ask a New Question</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            placeholder="Enter your question title"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            rows={4}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            placeholder="Describe your question in detail..."
          />
        </div>
        <button
          type="submit"
          className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-800"
        >
          Post Question
        </button>
      </form>
    </div>
  </div>
)}

    </div>
  );
};

export default QAForum;