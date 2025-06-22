'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { MessageCircle, ArrowUp, User } from 'lucide-react';

const dummyData: Record<string, any> = {
  "1": {
    title: 'Best practices for securing web applications against XSS attacks?',
    description: 'Looking for robust security measures against XSS in web apps. Any best practices?',
    author: 'Alice Johnson',
    timeAgo: '2 days ago',
    tags: ['Cybersecurity', 'Web Dev', 'Security'],
    answers: 8,
    upvotes: 85
  },
  "2": {
    title: 'How does Large Language Models (LLMs) attention mechanism work?',
    description: 'Demystifying LLM attention: how it processes text, and what\'s multi-head attention?',
    author: 'Bob Smith',
    timeAgo: '3 days ago',
    tags: ['AI', 'ML', 'Natural Language Processing'],
    answers: 5,
    upvotes: 62
  },
  // Add other dummy entries if needed
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

export default function QuestionDetailPage() {
  const { id } = useParams();
  const [question, setQuestion] = useState<any>(null);
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    if (id && typeof id === 'string') {
      setQuestion(dummyData[id]);
    }
  }, [id]);

  const handleSubmitAnswer = () => {
    alert(`Answer submitted: ${answer}`);
    setAnswer('');
  };

  if (!question) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6">
        {/* Question Section */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-5 h-5 text-gray-600" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium text-gray-900">{question.author}</span>
              <span className="text-gray-500">•</span>
              <span className="text-sm text-gray-500">{question.timeAgo}</span>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-2">{question.title}</h3>
            <p className="text-gray-700 mb-4">{question.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {question.tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getTagColor(tag)}`}
                >
                  {tag}
                </span>
              ))}
            </div>

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
          </div>
        </div>

        {/* Answer Section */}
        <div className="border-t pt-6 mt-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-2">Your Answer</h4>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
            rows={5}
            placeholder="Write your answer here..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <button
            onClick={handleSubmitAnswer}
            className="mt-4 bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-800 transition-colors"
          >
            Submit Answer
          </button>
        </div>
      </div>
    </div>
  );
}
