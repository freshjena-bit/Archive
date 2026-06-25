"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase-browser";

export default function RegisterPage() {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  async function register() {
    const { error } =
      await supabase.auth.signUp({
        email,
        password,
      });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Register berhasil");
    location.href = "/login";
  }

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Register
      </h1>

      <input
        className="border p-3 w-full mb-3"
        placeholder="Email"
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        type="password"
        className="border p-3 w-full mb-3"
        placeholder="Password"
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button
        onClick={register}
        className="border p-3 w-full"
      >
        Register
      </button>
    </main>
  );
}
