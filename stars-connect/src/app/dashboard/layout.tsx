"use client";
import Link from "next/link";
import React, { useState, useEffect, ReactNode } from "react";
import {
  Menu, X, Home, User, BookOpen, Users,
  MessageCircle, Heart, Calendar, Settings,
  Sun, Moon, ChevronDown, Bell, Search,
} from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: Home, href: "/dashboard" },
  { id: "profile", label: "Profile Setup", icon: User, href: "/dashboard/profile" },
  { id: "resources", label: "Resources", icon: BookOpen, href: "/dashboard/resources" },
  { id: "mentors", label: "Mentors", icon: Users, href: "/dashboard/mentors" },
  { id: "forum", label: "Q&A Forum", icon: MessageCircle, href: "/dashboard/forum" },
  { id: "community", label: "Community", icon: Heart, href: "/dashboard/community" },
  { id: "events", label: "Events & Webinars", icon: Calendar, href: "/dashboard/events" },
  { id: "settings", label: "Settings", icon: Settings, href: "/dashboard/settings" },
];

const Layout = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex h-screen">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 lg:relative lg:inset-0`}
        >
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-sm"></div>
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  STARS Connect
                </span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2">
              {sidebarItems.map((item) => (
  <Link key={item.id} href={item.href} className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 rounded-lg transition hover:bg-gray-100 dark:hover:bg-gray-800">
    <item.icon className="w-5 h-5 mr-3" />
    <span className="font-medium">{item.label}</span>
  </Link>
))}
            </nav>

            {/* Dark Mode Toggle */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={toggleDarkMode}
                className="w-full flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 mr-3" />
                ) : (
                  <Moon className="w-5 h-5 mr-3" />
                )}
                <span className="font-medium">
                  {darkMode ? "Light Mode" : "Dark Mode"}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Bar */}
          <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between px-6 py-4">
              {/* Sidebar Toggle */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <Menu className="w-6 h-6" />
                </button>
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white capitalize">
                </h1>
              </div>

              {/* Search and Right Items */}
              <div className="flex items-center space-x-4">
                {/* Search */}
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                {/* Dark Mode Toggle */}
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>

                {/* Notification */}
                <button className="relative p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Profile */}
                <div className="flex items-center space-x-2 pl-4 border-l border-gray-200 dark:border-gray-700">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                    className="w-8 h-8 rounded-full object-cover"
                    alt="User"
                  />
                  <div className="hidden sm:block text-sm text-gray-800 dark:text-gray-200">
                    <div className="font-medium">John Doe</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Student</div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-auto p-6">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
