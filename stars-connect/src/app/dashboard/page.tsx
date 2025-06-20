"use client"

import React, { useState } from "react";
import {
  BookOpen,
  Users,
  MessageSquare,
  Calendar,
  Clock,
  MessageCircle,
  UserPlus,
  Activity,
  Award,
  TrendingUp,
  LucideIcon,
} from "lucide-react";

// Types
interface CurrentUser {
  name: string;
  role: "student" | "alumni" | "admin";
  avatar: string;
  department: string;
  year: string;
}

interface Stat {
  label: string;
  value: string;
  icon: LucideIcon;
  color: string;
}

interface ActivityLog {
  action: string;
  time: string;
}

interface QuickAction {
  label: string;
  icon: LucideIcon;
  color: string;
}

interface Event {
  title: string;
  date: string;
  type: string;
}

interface StatsCardProps {
  stat: Stat;
}

const Dashboard = () => {
  const currentUser: CurrentUser = {
    name: "John Doe",
    role: "student",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format",
    department: "Computer Science",
    year: "3rd Year",
  };

  const getRoleBasedStats = (): Stat[] => {
    const baseStats: Record<string, Stat[]> = {
      student: [
        { label: "Resources Read", value: "12", icon: BookOpen, color: "text-blue-600 dark:text-blue-400" },
        { label: "Mentorship Sessions", value: "8", icon: Users, color: "text-green-600 dark:text-green-400" },
        { label: "Forum Posts", value: "24", icon: MessageSquare, color: "text-purple-600 dark:text-purple-400" },
        { label: "Events Attended", value: "6", icon: Calendar, color: "text-orange-600 dark:text-orange-400" },
      ],
      alumni: [
        { label: "Students Mentored", value: "15", icon: UserPlus, color: "text-blue-600 dark:text-blue-400" },
        { label: "Sessions Conducted", value: "32", icon: Activity, color: "text-green-600 dark:text-green-400" },
        { label: "Success Stories", value: "8", icon: Award, color: "text-purple-600 dark:text-purple-400" },
        { label: "Community Impact", value: "95%", icon: TrendingUp, color: "text-orange-600 dark:text-orange-400" },
      ],
      admin: [
        { label: "Total Users", value: "1,247", icon: Users, color: "text-blue-600 dark:text-blue-400" },
        { label: "Active Sessions", value: "89", icon: Activity, color: "text-green-600 dark:text-green-400" },
        { label: "Reports Generated", value: "156", icon: BookOpen, color: "text-purple-600 dark:text-purple-400" },
        { label: "System Uptime", value: "99.9%", icon: TrendingUp, color: "text-orange-600 dark:text-orange-400" },
      ],
    };
    return baseStats[currentUser.role] || baseStats.student;
  };

  const getWelcomeMessage = (): string => {
    const messages: Record<string, string> = {
      student: `Welcome back, ${currentUser.name}! Ready to continue your learning journey?`,
      alumni: `Hello ${currentUser.name}! Thank you for giving back to the community.`,
      admin: `Good day, ${currentUser.name}! Here's your system overview.`,
    };
    return messages[currentUser.role];
  };

  const StatsCard: React.FC<StatsCardProps> = ({ stat }) => {
    const Icon = stat.icon;
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stat.value}</p>
          </div>
          <div className={`p-3 rounded-lg bg-gray-50 dark:bg-gray-700 ${stat.color}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </div>
    );
  };

  const recentActivities: ActivityLog[] = [
    { action: "Completed mentorship session", time: "2 hours ago" },
    { action: "Posted in Q&A forum", time: "5 hours ago" },
    { action: "Registered for webinar", time: "1 day ago" },
    { action: "Updated profile information", time: "2 days ago" },
  ];

  const quickActions: QuickAction[] = [
    { label: "Schedule Meeting", icon: Calendar, color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" },
    { label: "Ask Question", icon: MessageCircle, color: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400" },
    { label: "Join Event", icon: Users, color: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400" },
    { label: "View Resources", icon: BookOpen, color: "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400" },
  ];

  const upcomingEvents: Event[] = [
    { title: "Career Guidance Workshop", date: "Tomorrow, 2:00 PM", type: "Workshop" },
    { title: "Alumni Networking Session", date: "June 25, 6:00 PM", type: "Networking" },
    { title: "Technical Interview Prep", date: "June 28, 4:00 PM", type: "Mentorship" },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">{getWelcomeMessage()}</h2>
        <p className="text-indigo-100">
          {currentUser.role === "student" && `${currentUser.department} • ${currentUser.year}`}
          {currentUser.role === "alumni" && "Making a difference in student lives"}
          {currentUser.role === "admin" && "System administrator dashboard"}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {getRoleBasedStats().map((stat, idx) => (
          <StatsCard key={idx} stat={stat} />
        ))}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
            <Clock className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, idx) => (
              <div key={idx} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.action}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, idx) => {
              const Icon = action.icon;
              return (
                <button
                  key={idx}
                  className={`p-4 rounded-lg text-left hover:scale-105 transition-all duration-200 ${action.color}`}
                >
                  <Icon className="w-6 h-6 mb-2" />
                  <p className="text-sm font-medium">{action.label}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Upcoming Events</h3>
        <div className="space-y-4">
          {upcomingEvents.map((event, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-sm"
            >
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-indigo-500 rounded-full" />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{event.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{event.date}</p>
                </div>
              </div>
              <span className="px-3 py-1 text-xs font-medium bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200 rounded-full">
                {event.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
