"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-browser";

export default function FavoriteButton({
  fileId,
}: {
  fileId: string;
}) {

  const [count, setCount] =
    useState(0);

  async function load() {

    const { count } =
      await supabase
        .from("favorites")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("file_id", fileId);

    setCount(count || 0);
  }

  useEffect(() => {
    load();
  }, []);

  async function favorite() {

    const {
      data: userData,
    } = await supabase.auth.getUser();

    const user =
      userData.user;

    if (!user) return;

    await supabase
      .from("favorites")
      .insert({
        file_id: fileId,
        user_id: user.id,
      });

    load();
  }

  return (
    <button
      onClick={favorite}
      className="border px-4 py-2 rounded-lg"
    >
      ❤️ {count}
    </button>
  );
}
