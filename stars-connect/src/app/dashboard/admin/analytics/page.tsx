"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Users,
  Activity,
  Calendar,
  MessageSquare,
  FileText,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import Chart from "chart.js/auto";

const AnalyticsPage = () => {
  const summary = {
    total_students: 1200,
    active_students: 843,
    total_events: 58,
    upcoming_events: 12,
    total_posts: 305,
    total_answers: 841,
  };

  const dailyActive = {
    Tue: 32,
    Wed: 65,
    Thu: 82,
    Fri: 81,
    Sat: 64,
    Sun: 83,
    Mon: 24,
  };

  const barData = {
    labels: Object.keys(dailyActive),
    datasets: [
      {
        label: "Daily Active Users",
        data: Object.values(dailyActive),
        backgroundColor: "rgba(239, 68, 68, 0.8)",
        borderRadius: 6,
      },
    ],
  };

  const doughnutData = {
    labels: ["Posts", "Answers"],
    datasets: [
      {
        data: [summary.total_posts, summary.total_answers],
        backgroundColor: ["#f43f5e", "#4ade80"],
        borderColor: ["#fff", "#fff"],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Analytics Overview</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {[
          {
            icon: <Users className="text-blue-500" />,
            label: "Total Students",
            value: summary.total_students,
          },
          {
            icon: <Activity className="text-green-500" />,
            label: "Active Students",
            value: summary.active_students,
          },
          {
            icon: <Calendar className="text-purple-500" />,
            label: "Total Events",
            value: summary.total_events,
          },
          {
            icon: <Calendar className="text-orange-500" />,
            label: "Upcoming Events",
            value: summary.upcoming_events,
          },
          {
            icon: <FileText className="text-pink-500" />,
            label: "Forum Posts",
            value: summary.total_posts,
          },
          {
            icon: <MessageSquare className="text-yellow-500" />,
            label: "Answers",
            value: summary.total_answers,
          },
        ].map((item, i) => (
          <div key={i} className="p-5 bg-white rounded-lg shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gray-100 rounded-full">{item.icon}</div>
              <div>
                <p className="text-gray-500 text-sm">{item.label}</p>
                <h2 className="text-2xl font-bold text-gray-800">{item.value}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        {/* Bar Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-red-500" />
            Weekly User Activity
          </h2>
          <Bar data={barData} />
        </div>

        {/* Doughnut Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-green-500" />
            Engagement Overview
          </h2>
          <Doughnut data={doughnutData} />
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Upcoming Events Summary
        </h2>
        <ul className="space-y-2">
          <li className="text-sm text-gray-600">March 5 — Internship Fair</li>
          <li className="text-sm text-gray-600">March 10 — AI Workshop</li>
          <li className="text-sm text-gray-600">March 18 — Guest Lecture</li>
          <li className="text-sm text-gray-600">April 2 — Startup Panel</li>
        </ul>
      </div>
    </div>
  );
};

export default AnalyticsPage;
