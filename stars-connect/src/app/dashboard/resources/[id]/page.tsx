// File: app/dashboard/resources/[id]/page.tsx

import { notFound } from "next/navigation";
import React from "react";

// Define the shape of the resource object
interface Resource {
  id: string;
  filename: string;
  title: string;
  uploadedBy: string;
  uploadedAt: string;
  description: string;
  downloadUrl: string;
}

// ✅ Correct typing for the page function props
interface PageProps {
  params: {
    id: string;
  };
}

// Fetch data for the specific resource ID
async function getResource(id: string): Promise<Resource | null> {
  const res = await fetch(`http://localhost:5000/dashboard/resources/${id}`, {
    cache: "no-store", // avoid caching during SSR
  });

  if (res.ok) return res.json();
  return null;
}

// ✅ Correctly typed component
export default async function ResourcePage({ params }: PageProps) {
  const resource = await getResource(params.id);

  if (!resource) {
    return <div className="p-6">Invalid resource ID</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">{resource.title}</h1>
      <p className="text-sm text-gray-600 mb-2">
        Uploaded by {resource.uploadedBy} on {resource.uploadedAt}
      </p>
      <p className="mb-4 text-gray-800 dark:text-gray-200">{resource.description}</p>

      <div className="mb-6">
        <iframe
          src={resource.downloadUrl}
          className="w-full min-h-100 h-screen border rounded"
          title="File Preview"
        />
      </div>

      <div>
        <a
          href={resource.downloadUrl}
          download
          target="_blank"
          className="inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          Download File
        </a>
      </div>
    </div>
  );
}
