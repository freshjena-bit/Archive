"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {

  const [query, setQuery] =
    useState("");

  const router =
    useRouter();

  function search() {

    if (!query.trim())
      return;

    router.push(
      `/search?q=${encodeURIComponent(query)}`
    );
  }

  return (
    <div className="bg-white border rounded-xl p-4 flex items-center gap-2">

      <Search size={18} />

      <input
        type="text"
        placeholder="Search repositories..."
        className="w-full outline-none"
        value={query}
        onChange={(e)=>
          setQuery(e.target.value)
        }
        onKeyDown={(e)=>{
          if(e.key==="Enter"){
            search();
          }
        }}
      />

    </div>
  );
}
