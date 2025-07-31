// File: app/dashboard/resources/[id]/page.tsx

import { notFound } from "next/navigation";

import React from "react";

interface Resource {
  id:string;
  filename: string;
  title: string;
  uploadedBy: string;
  uploadedAt: string;
  description: string;
  downloadUrl: string;
}

// Mock API or replace with your actual API endpoint
/*export async function generateStaticParams(){
  const res = await fetch("http://localhost:5000/dashboard/resources/"+id);
  const resources: Resource[] = await res.json();

  return resources.map((res) =>({id:res.id,}))
}*/

async function getResource(id:string): Promise<Resource | null>{
  const res = await fetch("http://localhost:5000/dashboard/resources/"+id);
  if(res.ok) return res.json();
  return null;
}

export default async function ResourcePage({params}:{params:{id:string}} ){

  const resource = await getResource(params.id);
  if(!resource) return <div className='p-6'> Invalid resource ID</div>;

  /*const router = useRouter();
  const expire = localStorage.getItem("expire");
  if(!expire || Date.now() > Number(expire)){
      localStorage.clear();
      router.push("/login");
  }*/
  if(!resource)return <div className="p-6">Resource not found</div>

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">{resource.title}</h1>
      <p className="text-sm text-gray-600 mb-2">
        Uploaded by {resource.uploadedBy} on {resource.uploadedAt}
      </p>
      <p className="mb-4 text-gray-800 dark:text-gray-200">{resource.description}</p>

      <div className="mb-6 ">
        <iframe
          src={resource.downloadUrl}
          className="w-full min-h-100 h-screen border rounded"
          title="File Preview"
        />
      </div>
      <div>
      <a
        href={resource.downloadUrl} download
        target="_blank"
        className="inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
      >
        Download File
      </a></div>
    </div>
  );
}
