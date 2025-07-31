"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Plus,
  MessageCircle,
  ArrowUp,
  ChevronDown,
  User,
  X,
} from "lucide-react";

// ... types remain unchanged

type Answer = {
  id: string;
  author: string;
  answer: string;
  timeAgo: string;
  aid: string;
  aa: string;
};

type Question = {
  id: string;
  title: string;
  description: string;
  author: string;
  aid: string;
  aa: string;
  time: string;
  tags: string[];
  answers: Answer[];
  upvotes: number;
  hasAnswers: boolean;
};

const QAForum = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showMoreTags, setShowMoreTags] = useState(false);
  const [askModalOpen, setAskModalOpen] = useState(false);
  const [viewModalQ, setViewModalQ] = useState<Question | null>(null);
  const [answerText, setAnswerText] = useState("");
  const [ques, setQues] = useState("");
  const [des, setDes] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [questions, setQuestions] = useState<Question[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Move all localStorage logic inside useEffect
    const expire = localStorage.getItem("expire");
    if (!expire || Date.now() > Number(expire)) {
      localStorage.clear();
      router.push("/login");
    } else {
      setIsAuthenticated(true); // Continue rendering after auth check
    }
  }, [router]);

  useEffect(() => {
    if (isAuthenticated) {
      fetch("http://localhost:5000/dashboard/forum/")
        .then((res) => res.json())
        .then((data) => setQuestions(data))
        .catch((err) => console.error(err));
    }
  }, [isAuthenticated]);

  useEffect(() => {
    document.body.style.overflow = askModalOpen || viewModalQ ? "hidden" : "auto";
  }, [askModalOpen, viewModalQ]);
  /* ---------- dummy data ---------- */
 
  function timeAgo(gettime :string):string{
    const now = Date.now();
    const date = parseInt(gettime.slice(2));
    const secs = Math.floor((now - date)/1000)
    const inter:{ago:string,sec:number}[] = [
      {ago:"year",sec : 31536000},{ago:"month",sec:2592000},
      {ago:"week",sec : 604800},{ago:"day",sec:86400},
      {ago:"hour",sec : 3600},{ago:"minutes",sec:60},{ago:"seconds",sec:1}
    ]
    for(let i of inter){
      const count = Math.floor(secs/i.sec)
      if(count >= 1){ return `${count} ${i.ago}${count > 1?'s':''} ago`}
    }
      return 'Just now'

  }

  const allTags = [
    "AI",
    "ML",
    "Web Dev",
    "Cybersecurity",
    "React",
    "Performance",
    "DevOps",
    "Docker",
    "Microservices",
    "API",
    "GraphQL",
    "Security",
    "Natural Language Processing",
    "Production",
    "Database",
    "Cloud",
    "Python",
    "JavaScript",
  ];
  const displayedTags = showMoreTags ? allTags : allTags.slice(0, 6);

  /* ---------- helper functions ---------- */
  const toggleTag = (tag: string) =>
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );

  const tagColor = (tag: string) =>
    ({
      AI: "bg-purple-100 text-purple-800",
      ML: "bg-blue-100 text-blue-800",
      "Web Dev": "bg-green-100 text-green-800",
      Cybersecurity: "bg-red-100 text-red-800",
      React: "bg-cyan-100 text-cyan-800",
      Performance: "bg-orange-100 text-orange-800",
      DevOps: "bg-gray-100 text-gray-800",
      Security: "bg-red-100 text-red-800",
      "Natural Language Processing": "bg-indigo-100 text-indigo-800",
    }[tag] || "bg-gray-100 text-gray-800");

  const filteredQuestions = questions.filter((q) => {
    const title = q.title?.toLowerCase().includes(searchTerm.toLowerCase()) || "";
    const descr = q.description?.toLowerCase().includes(searchTerm.toLowerCase()) || "";
    const searchMatch = title || descr;
    const tagMatch =
      selectedTags.length === 0 || selectedTags.some((t) => q.tags.includes(t));
    return searchMatch && tagMatch;
  });

  const handleQuestion = async(e :React.FormEvent) =>{
      e.preventDefault();
      const res = await fetch("http://localhost:5000/dashboard/forum/ask",{
        method:'POST',
        headers:{'content-type':'application/json'},
        body:JSON.stringify({id:`Q-${Date.now()}`,title:ques,description:des,author:`${localStorage.getItem('name')} (${localStorage.getItem('role')})`,aid:localStorage.getItem("id")})
      })
      const data = await res.json();
      if(res.ok){
        setQuestions(data);
        setQues("");
        setDes("");
        setAskModalOpen(false);
        console.log("Success",data);
      }
  }
  const handleAnswer =async() =>{
  
    if(!viewModalQ) return null;
    const res = await fetch(`http://localhost:5000/dashboard/forum/ans/${viewModalQ.id}`,{
      method:"POST",
      headers:{'content-type':"application/json"},
      body:JSON.stringify({id:`A-${Date.now()}`,answer:answerText,author:`${localStorage.getItem('name')} (${localStorage.getItem('role')})`,aid:localStorage.getItem("id")})
    })
    const data = await res.json();
    if(res.ok){
      setAnswerText("");    
      setViewModalQ(data);
      setAskModalOpen(false);
      console.log("Success")
    }
    else console.log("Failed");


  }
  /* ---------- lock scroll when any modal open ---------- */
  const modalOpen = askModalOpen || viewModalQ;
  useEffect(() => {
  fetch("http://localhost:5000/dashboard/forum/").then(res => res.json()).then(data => {setQuestions(data)}).catch(err => console.error(err));

    document.body.style.overflow = modalOpen ? "hidden" : "auto";
  }, [modalOpen]);

  /* ---------- JSX ---------- */
  return (
    <div className="flex gap-6 p-6 bg-gray-50 min-h-screen">
      {/* ============= Main content ============= */}
      <div className="flex-1">
        <div className="bg-white rounded-lg shadow-sm">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b">
            <h1 className="text-2xl font-bold text-gray-900">Q&A Forum</h1>
            <button
              onClick={() => setAskModalOpen(true)}
              className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-800 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Ask Question
            </button>
          </div>

          {/* Search + Tags */}
          <div className="p-6 border-b">
            <div className="flex gap-4 items-center mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search questions..."
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-gray-600">Tags:</span>
              {displayedTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    selectedTags.includes(tag)
                      ? "bg-red-700 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {tag}
                </button>
              ))}
              <button
                onClick={() => setShowMoreTags(!showMoreTags)}
                className="px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                {showMoreTags ? "Less Tags" : "More Tags"}
                <ChevronDown
                  className={`w-3 h-3 inline ml-1 transition-transform ${
                    showMoreTags ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Question list */}
          <div className="p-6">
            {filteredQuestions.length === 0 && (
              <div className="text-center py-12">
                <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No questions found</h3>
                <p className="text-gray-600">Try different search terms.</p>
              </div>
            )}

            <div className="space-y-6">
              {filteredQuestions.map((q) => (
                <div
                  key={q.id}
                  className="border rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      {q.aa?<img src={q.aa} className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center"/>:<User className="w-5 h-5 text-gray-600" />}
                    </div>

                    <div className="flex-1">
                      <div className="flex gap-2 text-sm text-gray-500 mb-1">
                        <span className="font-medium text-gray-900">
                          {q.author}
                        </span>
                        <span>•</span>
                        <span>{timeAgo(q.id)}</span>
                      </div>

                      <h3 className="text-lg font-semibold mb-2">
                        {q.title.charAt(0).toUpperCase()+q.title.slice(1)}
                      </h3>

                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {q.description.charAt(0).toUpperCase()+q.description.slice(1)}
                      </p>

                      {/* tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {q.tags?.map((tag) => (
                          <span
                            key={tag}
                            className={`px-2 py-1 rounded-full text-xs font-medium ${tagColor(
                              tag
                            )}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* stats + button */}
                      <div className="flex items-center justify-between">
                        <div className="flex gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" /> {q.answers.length==0?"No ":q.answers.length}
                            &nbsp;Answers
                          </span>
                          <span className="flex items-center gap-1">
                            <ArrowUp className="w-4 h-4" /> {q.upvotes}
                            &nbsp;Upvotes
                          </span>
                        </div>
                        <button
                          onClick={() => setViewModalQ(q)}
                          className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-800 text-sm"
                        >
                          View & Add answer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ========= Ask‑Question Modal ========= */}
      {askModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white w-full max-w-xl p-6 rounded-lg shadow-lg relative">
            <button
              onClick={() => setAskModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold mb-4">Ask a New Question</h2>
            <form
              className="space-y-4"
              onSubmit={handleQuestion}
            >
              <input
                className="w-full border rounded px-3 py-2"
                placeholder="Question title"
                value = {ques}
                onChange={(e) => setQues(e.target.value)}
                required
              />
              <textarea
                rows={4}
                className="w-full border rounded px-3 py-2"
                placeholder="Describe your question..."
                required
                value = {des}
                onChange = {(e) => setDes(e.target.value)}
              />
              <button
                type="submit"
                className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800"
              >
                Post Question
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ========= View‑Question & Answer Modal ========= */}
      {viewModalQ && (
        <div className="fixed inset-0 z-50 flex items-center min-h-screen justify-center bg-black/50">
          <div className={`bg-white w-full max-w-2xl h-screen p-6 rounded-lg shadow-lg relative max-h-[90vh]  transform transition-transform duration-300 ease-in-out translate-y-0 opacity-100'`}>
            <button
              onClick={() => {
                setTimeout(() => setViewModalQ(null),300);
                setAnswerText("");
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold mb-2">{viewModalQ.title}</h2>
            <p className="text-gray-700 mb-4">{viewModalQ.description}</p>
              <div className="h-80 overflow-y-auto ">
            {/* answer textarea */}
            {viewModalQ.answers.map((q) => (
                <div
                  key={q.id}
                  className="border rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      {q.aa?<img src={q.aa} className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center"/>:<User className="w-5 h-5 text-gray-600" />}
                    </div>

                    <div className="flex-1">
                      <div className="flex gap-2 text-sm text-gray-500 mb-1">
                        <span className="font-medium text-gray-900">
                          {q.author}
                        </span>
                        <span>•</span>
                        <span>{timeAgo(q.id)}</span>
                      </div>

                      <h3 className="text-lg font-semibold mb-2">
                        {q.answer.charAt(0).toUpperCase()+q.answer.slice(1)}
                      </h3>

                      </div>
                    </div>
                  </div>
              ))|| <h3 className="text-lg font-semibold mb-2">
              No Answer
            </h3>}
            </div>
            <label className="block text-sm font-medium mb-1">
              Your Answer
            </label>
            <textarea
              rows={5}
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
              className="w-full h-20 border rounded px-3 py-2 mb-2 focus:ring-red-500"
              placeholder="Type your answer here…"
            />
            <button
              onClick={() => {
                setTimeout(() => setViewModalQ(null),300);
                setAnswerText("");
              }}
              className=" bg-gray-700 text-gray-300 px-5 py-2 mx-3 rounded hover:bg-gray-700"
            >
              Cancel</button>
            <button
              type="submit"
              onClick={handleAnswer}
              className="bg-red-700 text-white px-5 py-2 mx-3 rounded hover:bg-red-800"
            >
              Submit Answer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QAForum;
