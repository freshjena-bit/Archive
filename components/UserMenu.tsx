"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-browser";

export default function UserMenu() {
  const [user, setUser] =
    useState<any>(null);

  useEffect(() => {
    supabase.auth
      .getUser()
      .then(({ data }) =>
        setUser(data.user)
      );
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    location.reload();
  }

  if (!user) {
    return (
      <div className="flex gap-4">
        <a href="/login">
          Login
        </a>

        <a href="/register">
          Register
        </a>
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      <span>
        {user.email}
      </span>

      <button
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}
