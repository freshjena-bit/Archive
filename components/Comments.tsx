"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-browser";

export default function Comments({
  fileId,
}: {
  fileId: string;
}) {
  const [comments, setComments] =
    useState<any[]>([]);

  const [content, setContent] =
    useState("");

  async function loadComments() {
    const { data } =
      await supabase
        .from("comments")
        .select("*")
        .eq("file_id", fileId)
        .order("created_at", {
          ascending: false,
        });

    setComments(data || []);
  }

  useEffect(() => {
    loadComments();
  }, []);

  async function sendComment() {
    const {
      data: userData,
    } = await supabase.auth.getUser();

    const user =
      userData.user;

    if (!user) {
      alert("Login dulu");
      return;
    }

    await supabase
      .from("comments")
      .insert({
        file_id: fileId,
        user_id: user.id,
        content,
      });

    setContent("");

    loadComments();
  }

  return (
    <div className="mt-10">

      <h2 className="text-2xl font-bold mb-4">
        Comments
      </h2>

      <textarea
        value={content}
        onChange={(e) =>
          setContent(
            e.target.value
          )
        }
        className="border p-3 w-full"
      />

      <button
        onClick={sendComment}
        className="border px-4 py-2 mt-3"
      >
        Send
      </button>

      <div className="space-y-3 mt-6">

        {comments.map((comment) => (
          <div
            key={comment.id}
            className="border rounded-xl p-4"
          >
            {comment.content}
          </div>
        ))}

      </div>

    </div>
  );
}
