import { supabaseServer } from "@/lib/supabase-server";
import Link from "next/link";
import MarkdownPreview from "@/components/MarkdownPreview";
import Comments from "@/components/Comments";
import FavoriteButton from "@/components/FavoriteButton";
import Rating from "@/components/Rating";

export default async function FileDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: file } =
    await supabaseServer
       .from("files")
       .select(`
       *,
       profiles (
       username
       )
       `)
       .eq("id", id)
       .single();

  if (!file) {
    return (
      <div className="p-6">
        Repository tidak ditemukan
      </div>
    );
  }

  return (
    <main className="max-w-5xl mx-auto p-6">

      <h1 className="text-4xl font-bold">
        {file.title}
      </h1>

      <p className="text-gray-500 mt-3">
        {file.description}
      </p>

	{
	file.screenshot_url &&
	(
	<div className="mt-10">

	  <h2 className="text-2xl font-bold mb-3">
	    Screenshot
	  </h2>

	  <img
	    src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/repository-files/${file.screenshot_url}`}
	    alt="preview"
	    className="rounded-xl border"
	  />

	</div>
	)
	}

	  <MarkdownPreview
	    content={
	      file.readme || ""
	    }
	  />

      <div className="flex gap-3 mt-5">

        <span className="border px-3 py-1 rounded-full">
          {file.category}
        </span>

        <span className="border px-3 py-1 rounded-full">
          {file.downloads} Downloads
        </span>

      </div>

      <div className="mt-8">

        <div className="flex gap-3">

	  <Link
	    href={`/download/${file.id}`}
	    className="border px-5 py-3 rounded-lg"
	  >
	    Download
	  </Link>

	  <FavoriteButton
	    fileId={file.id}
	  />

	  <Rating
	    fileId={file.id}
	  />
	
	</div>

      </div>
	<Comments
	  fileId={file.id}
	/>

    </main>
  );
		  }
