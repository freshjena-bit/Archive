"use client";

import { supabase } from "@/lib/supabase-browser";

export default function UserRepositoryCard({
  file,
  reload,
}: any) {

  async function deleteFile() {

    const confirmDelete =
      confirm(
        "Hapus repository?"
      );

    if (!confirmDelete)
      return;

    await supabase
      .from("files")
      .delete()
      .eq("id", file.id);

    reload();
  }

  return (
    <div className="border bg-white rounded-xl p-5">

      <h2 className="font-bold text-xl">
        {file.title}
      </h2>

      <p className="text-gray-500 mt-2">
        {file.description}
      </p>

      <div className="flex gap-3 mt-4">

	  <span className="border px-3 py-1 rounded-full">
	    {file.category}
	  </span>

	  {file.status === "approved" && (
	    <span className="bg-green-100 px-3 py-1 rounded-full">
	      Approved
	    </span>
	  )}

	  {file.status === "pending" && (
	    <span className="bg-yellow-100 px-3 py-1 rounded-full">
	      Pending
	    </span>
	  )}

	  {file.status === "rejected" && (
	    <span className="bg-red-100 px-3 py-1 rounded-full">
	      Rejected
	    </span>
	  )}

	</div>

      <div className="flex gap-3 mt-5">

        <a
          href={`/edit/${file.id}`}
          className="border px-4 py-2 rounded-lg"
        >
          Edit
        </a>

        <button
          onClick={deleteFile}
          className="border px-4 py-2 rounded-lg"
        >
          Delete
        </button>

      </div>

    </div>
  );
}
