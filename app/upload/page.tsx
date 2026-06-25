"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase-browser";

export default function UploadPage() {
  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [category, setCategory] =
    useState("WhatsApp");

  const [screenshot, setScreenshot] =
    useState<File | null>(null);

  const [file, setFile] =
    useState<File | null>(null);

  const [readme, setReadme] =
    useState("");

  async function upload() {
    if (!file) {
      alert("Pilih file");
      return;
    }

    const {
      data: userData,
    } = await supabase.auth.getUser();

    const user =
      userData.user;

    if (!user) {
      alert("Login dulu");
      return;
    }

    const filename =
      `${Date.now()}-${file.name}`;

    const { data, error } =
      await supabase.storage
        .from("repository-files")
        .upload(
          `pending/${filename}`,
          file
        );

	let screenshotPath = "";

	if (screenshot) {
	  const screenshotName =
	    `${Date.now()}-${screenshot.name}`;

	  const { data: screenshotData } =
	    await supabase.storage
	      .from("repository-files")
	      .upload(
	        `screenshots/${screenshotName}`,
	        screenshot
	      );

	  screenshotPath =
	    screenshotData?.path || "";
	}

    if (error) {
      alert(error.message);
      return;
    }

    await supabase
      .from("files")
      .insert({
        title,
        description,
        category,
        file_url:
          data.path,
        readme,
        file_size:
          file.size,
        uploader_id:
          user.id,
        status:
          "pending",
      });

    alert(
      "Upload berhasil, menunggu approval admin"
    );

    location.reload();
  }

  return (
    <main className="max-w-2xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Upload Repository
      </h1>

      <input
        className="border p-3 w-full mb-3"
        placeholder="Title"
        onChange={(e) =>
          setTitle(
            e.target.value
          )
        }
      />

      <textarea
        className="border p-3 w-full mb-3"
        placeholder="Description"
        onChange={(e) =>
          setDescription(
            e.target.value
          )
        }
      />

      <select
        className="border p-3 w-full mb-3"
        value={category}
        onChange={(e) =>
          setCategory(
            e.target.value
          )
        }
      >
        <option>
          WhatsApp
        </option>

        <option>
          Discord
        </option>

        <option>
          Telegram
        </option>

        <option>
          API
        </option>

        <option>
          Tools
        </option>
      </select>

      <textarea
        className="border p-3 w-full mb-3 h-48"
        placeholder="README.md"
        onChange={(e) =>
          setReadme(
            e.target.value
          )
        }
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          setScreenshot(
            e.target.files?.[0] || null
          )
        }
      />

      <input
        type="file"
        className="mb-4"
        onChange={(e) =>
          setFile(
            e.target.files?.[0] ||
              null
          )
        }
      />

      <button
        onClick={upload}
        className="border px-6 py-3 rounded-lg"
      >
        Upload
      </button>

    </main>
  );
}
