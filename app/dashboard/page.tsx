"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-browser";
import UserRepositoryCard from "@/components/UserRepositoryCard";

export default function DashboardPage() {
  const [files, setFiles] = useState<any[]>([]);

  async function loadFiles() {
    const { data: userData } =
      await supabase.auth.getUser();

    const user = userData.user;

    if (!user) return;

    const { data } = await supabase
      .from("files")
      .select("*")
      .eq("uploader_id", user.id)
      .order("created_at", {
        ascending: false,
      });

    setFiles(data || []);
  }

  useEffect(() => {
    loadFiles();
  }, []);

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        My Uploads
      </h1>

      <div className="space-y-4">
        {files.map((file) => (
          <UserRepositoryCard
            key={file.id}
            file={file}
            reload={loadFiles}
          />
        ))}
      </div>
    </main>
  );
}
