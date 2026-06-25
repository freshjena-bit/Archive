"use client";

import { supabase } from "@/lib/supabase-browser";

export default function Rating({
  fileId,
}: {
  fileId: string;
}) {

  async function rate(
    value: number
  ) {

    const {
      data: userData,
    } = await supabase.auth.getUser();

    const user =
      userData.user;

    if (!user) return;

    await supabase
      .from("ratings")
      .insert({
        file_id: fileId,
        user_id: user.id,
        rating: value,
      });

    alert("Rated");
  }

  return (
    <div className="flex gap-2">

      {[1,2,3,4,5].map((n)=>(
        <button
          key={n}
          onClick={() =>
            rate(n)
          }
        >
          ⭐
        </button>
      ))}

    </div>
  );
}
