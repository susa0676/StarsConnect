// File: app/dashboard/resources/[id]/page.tsx

import { notFound } from "next/navigation";
import React from "react";

interface Resource {
  id: string;
  title: string;
  uploadedBy: string;
  uploadDate: string;
  description: string;
  fileUrl: string;
}

// Mock API or replace with your actual API endpoint
export async function generateStaticParams() {
  const res = await fetch("https://your-api.com/resources"); // Replace with your API
  const resources: Resource[] = await res.json();

  return resources.map((res) => ({
    id: res.id,
  }));
}

async function getResource(id: string): Promise<Resource | null> {
  const res = await fetch(`https://your-api.com/resources/${id}`); // Replace with your API
  if (!res.ok) return null;
  return res.json();
}

export default async function ResourcePage({ params }: { params: { id: string } }) {
  const resource = await getResource(params.id);

  if (!resource) return notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">{resource.title}</h1>
      <p className="text-sm text-gray-600 mb-2">
        Uploaded by {resource.uploadedBy} on {resource.uploadDate}
      </p>
      <p className="mb-4 text-gray-800 dark:text-gray-200">{resource.description}</p>

      <div className="mb-6">
        <iframe
          src={resource.fileUrl}
          className="w-full h-96 border rounded"
          title="File Preview"
        />
      </div>

      <a
        href={resource.fileUrl}
        download
        className="inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
      >
        Download File
      </a>
    </div>
  );
}
