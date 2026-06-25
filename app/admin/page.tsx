"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-browser";

export default function AdminPage() {
  const [files, setFiles] =
    useState<any[]>([]);

  async function loadFiles() {
    const { data } =
      await supabase
        .from("files")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

    setFiles(data || []);
  }

  useEffect(() => {
    loadFiles();
  }, []);

  async function approve(id: string) {
    await supabase
      .from("files")
      .update({
        status: "approved",
      })
      .eq("id", id);

    loadFiles();
  }

  async function reject(id: string) {
    await supabase
      .from("files")
      .update({
        status: "rejected",
      })
      .eq("id", id);

    loadFiles();
  }

  async function remove(id: string) {
    if (!confirm("Hapus?"))
      return;

    await supabase
      .from("files")
      .delete()
      .eq("id", id);

    loadFiles();
  }

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Admin Dashboard
      </h1>

	<div className="grid md:grid-cols-3 gap-4 mb-6">

	  <div className="border rounded-xl p-4 bg-white">
	    Total Files: {files.length}
	  </div>

	  <div className="border rounded-xl p-4 bg-white">
	    Pending: {
	      files.filter(
	        f => f.status === "pending"
	      ).length
	    }
	  </div>

	  <div className="border rounded-xl p-4 bg-white">
	    Approved: {
	      files.filter(
	        f => f.status === "approved"
	      ).length
	    }
	  </div>

	</div>

      <div className="space-y-4">
        {files.map((file) => (
          <div
            key={file.id}
            className="border rounded-xl p-5 bg-white"
          >
            <h2 className="font-bold">
              {file.title}
            </h2>

            <p className="text-gray-500 mt-2">
              {file.description}
            </p>

            <div className="flex gap-3 mt-3">
              <span className="border px-3 py-1 rounded-full">
                {file.category}
              </span>

              <span className="border px-3 py-1 rounded-full">
                {file.status}
              </span>
            </div>

            <div className="flex gap-3 mt-5">
              <button
                onClick={() =>
                  approve(file.id)
                }
                className="border px-4 py-2 rounded-lg"
              >
                Approve
              </button>

              <button
                onClick={() =>
                  reject(file.id)
                }
                className="border px-4 py-2 rounded-lg"
              >
                Reject
              </button>

              <button
                onClick={() =>
                  remove(file.id)
                }
                className="border px-4 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
