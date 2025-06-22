"use client";
import Link from "next/link";
import React, { useState, useEffect, ReactNode } from "react";
import {
  Menu, X, Home, User, BookOpen, Users,
  MessageCircle, Heart, Calendar, Settings,
  Sun, Moon, ChevronDown, Bell, Search
} from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: Home, href: "/dashboard" },
  { id: "resources", label: "Resources", icon: BookOpen, href: "/dashboard/resources" },
  { id: "mentors", label: "Mentors", icon: Users, href: "/dashboard/mentors" },
  { id: "forum", label: "Q&A Forum", icon: MessageCircle, href: "/dashboard/forum" },
  { id: "community", label: "Community", icon: Heart, href: "/dashboard/community" },
  { id: "events", label: "Events & Webinars", icon: Calendar, href: "/dashboard/events" },
  { id: "settings", label: "Settings", icon: Settings, href: "/dashboard/settings" },
];

const adminItems = [
  { id: "user-mgmt", label: "User Management", icon: Users, href: "/dashboard/admin/usermanagement" },
  { id: "star-profiles", label: "Star Profiles", icon: User, href: "/dashboard/admin/stars" },
  { id: "analytics", label: "Analytics", icon: BookOpen, href: "/dashboard/admin/analytics" },
  { id: "connections", label: "Connections", icon: Heart, href: "/dashboard/admin/connections" },
];

const Layout = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [userRole, setUserRole] = useState("student"); // Replace with actual user role

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Sidebar */}
      {sidebarOpen && (
        <div className="w-64 bg-white dark:bg-gray-900 shadow-lg flex flex-col transition-all duration-300">
          {/* Logo & Close Button */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
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
              className="p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Sidebar Navigation */}
          <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
            {sidebarItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 rounded-lg transition hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}

            {/* Admin Items */}
            {userRole === "admin" && (
              <>
                <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                {adminItems.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 rounded-lg transition hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
              </>
            )}
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
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
          {/* Menu Button & Logo in Topbar */}
          <div className="flex items-center space-x-3">
            {!sidebarOpen && (
              <>
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="p-2 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <Menu className="w-6 h-6" />
                </button>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-sm" />
                  </div>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">STARS</span>
                </div>
              </>
            )}
          </div>

          {/* Right Controls */}
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

            {/* Dark Mode Button */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Notification Bell */}
            <button className="relative p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile Info */}
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
        </header>

        {/* Page Body */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
