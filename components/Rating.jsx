"use client";

import { useState } from "react";

export default function Rating({
  fileId,
}) {
  const [rating, setRating] = useState(0);

  async function submitRating(value) {
    setRating(value);

    await fetch("/api/rating", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fileId,
        rating: value,
      }),
    });
  }

  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => submitRating(star)}
          className="text-2xl"
        >
          {star <= rating ? "★" : "☆"}
        </button>
      ))}
    </div>
  );
}
