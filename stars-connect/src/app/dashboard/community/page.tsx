"use client"
import { useState } from 'react';
import { Search, Plus, MessageCircle, Heart, Share2, Bookmark, TrendingUp, Users, Calendar, Award, Eye, ThumbsUp, Filter, MoreHorizontal } from 'lucide-react';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  authorRole: string;
  timeAgo: string;
  category: string;
  likes: number;
  comments: number;
  views: number;
  isLiked: boolean;
  isBookmarked: boolean;
  tags: string[];
}

interface CommunityMember {
  id: number;
  name: string;
  role: string;
  company: string;
  posts: number;
  reputation: number;
}

interface TrendingTopic {
  id: number;
  title: string;
  posts: number;
  growth: string;
}

const Community = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedFilter, setSelectedFilter] = useState<string>('Latest');

  const posts: Post[] = [
    {
      id: 1,
      title: "How I landed my dream job at Google - AMA about the interview process",
      content: "After 6 months of preparation and multiple rounds of interviews, I finally got an offer from Google! Happy to share my experience and answer questions about the technical interviews, behavioral rounds, and preparation strategies that worked for me.",
      author: "Sarah Chen",
      authorRole: "Software Engineer",
      timeAgo: "2 hours ago",
      category: "Career",
      likes: 89,
      comments: 23,
      views: 342,
      isLiked: false,
      isBookmarked: false,
      tags: ["Interview", "Google", "Career Advice"]
    },
    {
      id: 2,
      title: "Building a real-time chat app with Next.js and Socket.io - Tutorial",
      content: "I've been working on a real-time messaging application and wanted to share the complete tutorial. This covers setting up the backend with Node.js, implementing Socket.io for real-time communication, and building a responsive UI with Next.js and Tailwind CSS.",
      author: "Mike Rodriguez",
      authorRole: "Full Stack Developer",
      timeAgo: "4 hours ago",
      category: "Tech",
      likes: 156,
      comments: 31,
      views: 892,
      isLiked: true,
      isBookmarked: true,
      tags: ["Next.js", "Socket.io", "Tutorial"]
    },
    {
      id: 3,
      title: "Women in Tech: Overcoming imposter syndrome in senior roles",
      content: "As someone who recently got promoted to a senior engineering position, I want to discuss the challenges of imposter syndrome and share strategies that helped me build confidence. Let's create a supportive discussion around this important topic.",
      author: "Emily Johnson",
      authorRole: "Senior Software Engineer",
      timeAgo: "6 hours ago",
      category: "Discussion",
      likes: 234,
      comments: 67,
      views: 1205,
      isLiked: false,
      isBookmarked: true,
      tags: ["Women in Tech", "Career Growth", "Mental Health"]
    },
    {
      id: 4,
      title: "Machine Learning study group - Week 3: Neural Networks deep dive",
      content: "Our weekly ML study group is covering neural networks this week. We'll be discussing backpropagation, gradient descent, and implementing a simple neural network from scratch. Join us for collaborative learning!",
      author: "David Kim",
      authorRole: "ML Engineer",
      timeAgo: "8 hours ago",
      category: "Study Group",
      likes: 67,
      comments: 19,
      views: 456,
      isLiked: false,
      isBookmarked: false,
      tags: ["Machine Learning", "Study Group", "Neural Networks"]
    },
    {
      id: 5,
      title: "Remote work setup tour - My productivity-focused home office",
      content: "Sharing my remote work setup after a year of working from home. This includes my tech stack, productivity tools, ergonomic considerations, and tips for maintaining work-life balance. What does your setup look like?",
      author: "Alex Thompson",
      authorRole: "Product Manager",
      timeAgo: "12 hours ago",
      category: "Lifestyle",
      likes: 98,
      comments: 28,
      views: 634,
      isLiked: true,
      isBookmarked: false,
      tags: ["Remote Work", "Productivity", "Setup"]
    },
    {
      id: 6,
      title: "Open source contribution guide - How to get started with your first PR",
      content: "Contributing to open source can be intimidating, but it's one of the best ways to improve your coding skills and give back to the community. Here's a step-by-step guide to making your first meaningful contribution.",
      author: "Jennifer Wu",
      authorRole: "DevOps Engineer",
      timeAgo: "1 day ago",
      category: "Tech",
      likes: 145,
      comments: 41,
      views: 789,
      isLiked: false,
      isBookmarked: true,
      tags: ["Open Source", "Git", "Contributing"]
    }
  ];

  const communityMembers: CommunityMember[] = [
    { id: 1, name: "Sarah Chen", role: "Software Engineer", company: "Google", posts: 23, reputation: 892 },
    { id: 2, name: "Mike Rodriguez", role: "Full Stack Developer", company: "Meta", posts: 31, reputation: 756 },
    { id: 3, name: "Emily Johnson", role: "Senior SWE", company: "Microsoft", posts: 18, reputation: 654 },
    { id: 4, name: "David Kim", role: "ML Engineer", company: "OpenAI", posts: 27, reputation: 589 }
  ];

  const trendingTopics: TrendingTopic[] = [
    { id: 1, title: "AI & Machine Learning", posts: 234, growth: "+12%" },
    { id: 2, title: "Interview Preparation", posts: 189, growth: "+8%" },
    { id: 3, title: "Career Advice", posts: 156, growth: "+15%" },
    { id: 4, title: "Remote Work", posts: 143, growth: "+6%" },
    { id: 5, title: "Web Development", posts: 127, growth: "+9%" }
  ];

  const categories: string[] = ['All', 'Career', 'Tech', 'Discussion', 'Study Group', 'Lifestyle'];
  const filters: string[] = ['Latest', 'Popular', 'Most Liked', 'Most Commented'];

  const toggleLike = (postId: number): void => {
    // Handle like toggle logic here
    console.log(`Toggle like for post ${postId}`);
  };

  const toggleBookmark = (postId: number): void => {
    // Handle bookmark toggle logic here
    console.log(`Toggle bookmark for post ${postId}`);
  };

  const filteredPosts: Post[] = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex gap-6 p-6 bg-gray-50 min-h-screen">
      {/* Main Content */}
      <div className="flex-1">
        <div className="bg-white rounded-lg shadow-sm">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Community</h1>
              <p className="text-gray-600 mt-1">Connect, share, and learn together</p>
            </div>
            <button className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-800 transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Post
            </button>
          </div>

          {/* Search and Filters */}
          <div className="p-6 border-b">
            <div className="flex gap-4 items-center mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search discussions..."
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
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <select 
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                {filters.map(filter => (
                  <option key={filter} value={filter}>{filter}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Posts Feed */}
          <div className="divide-y divide-gray-200">
            {filteredPosts.map((post) => (
              <div key={post.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  {/* Author Avatar */}
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-semibold">
                      {post.author.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Post Header */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-gray-900">{post.author}</span>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-500">{post.authorRole}</span>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-500">{post.timeAgo}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ml-auto ${
                        post.category === 'Career' ? 'bg-blue-100 text-blue-800' :
                        post.category === 'Tech' ? 'bg-green-100 text-green-800' :
                        post.category === 'Discussion' ? 'bg-purple-100 text-purple-800' :
                        post.category === 'Study Group' ? 'bg-orange-100 text-orange-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {post.category}
                      </span>
                    </div>

                    {/* Post Title */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-red-700 cursor-pointer">
                      {post.title}
                    </h3>

                    {/* Post Content */}
                    <p className="text-gray-600 mb-3 line-clamp-3">
                      {post.content}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Post Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <button 
                          onClick={() => toggleLike(post.id)}
                          className={`flex items-center gap-1 text-sm transition-colors ${
                            post.isLiked ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                          {post.likes}
                        </button>
                        <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                          <MessageCircle className="w-4 h-4" />
                          {post.comments}
                        </button>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Eye className="w-4 h-4" />
                          {post.views}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => toggleBookmark(post.id)}
                          className={`p-2 rounded-md transition-colors ${
                            post.isBookmarked ? 'text-red-600 bg-red-50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <Bookmark className={`w-4 h-4 ${post.isBookmarked ? 'fill-current' : ''}`} />
                        </button>
                        <button className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors">
                          <Share2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-80 space-y-6">
        {/* Community Stats */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Community Stats</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">2,543</div>
              <div className="text-sm text-gray-600">Members</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">1,892</div>
              <div className="text-sm text-gray-600">Posts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">5,234</div>
              <div className="text-sm text-gray-600">Comments</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">98%</div>
              <div className="text-sm text-gray-600">Active</div>
            </div>
          </div>
        </div>

        {/* Trending Topics */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-red-600" />
            <h2 className="text-lg font-semibold text-gray-900">Trending Topics</h2>
          </div>
          <div className="space-y-3">
            {trendingTopics.map((topic) => (
              <div key={topic.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <div>
                  <div className="font-medium text-gray-900">{topic.title}</div>
                  <div className="text-sm text-gray-600">{topic.posts} posts</div>
                </div>
                <div className="text-sm font-medium text-green-600">{topic.growth}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Contributors */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-red-600" />
            <h2 className="text-lg font-semibold text-gray-900">Top Contributors</h2>
          </div>
          <div className="space-y-4">
            {communityMembers.map((member, index) => (
              <div key={member.id} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 truncate">{member.name}</div>
                  <div className="text-sm text-gray-600">{member.company}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{member.reputation}</div>
                  <div className="text-xs text-gray-500">points</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-3">
              <Users className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-gray-900">Join Study Groups</span>
            </button>
            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-3">
              <Calendar className="w-5 h-5 text-green-600" />
              <span className="font-medium text-gray-900">Upcoming Events</span>
            </button>
            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-3">
              <MessageCircle className="w-5 h-5 text-purple-600" />
              <span className="font-medium text-gray-900">Discussion Rooms</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;