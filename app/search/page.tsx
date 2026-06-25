import { supabaseServer }
from "@/lib/supabase-server";

import FileCard
from "@/components/FileCard";

export default async function SearchPage({
  searchParams,
}:{
  searchParams: Promise<{
    q?: string
  }>
}) {

  const params =
    await searchParams;

  const q =
    params.q || "";

  const { data } =
    await supabaseServer
      .from("files")
      .select("*")
      .ilike(
        "title",
        `%${q}%`
      )
      .eq(
        "status",
        "approved"
      );

  return (
    <main className="max-w-6xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Search: {q}
      </h1>

      <div className="space-y-4">

        {data?.map((file)=>(
          <FileCard
            key={file.id}
            id={file.id}
            title={file.title}
            size={`${(
              file.file_size /
              1024 /
              1024
            ).toFixed(2)} MB`}
            category={file.category}
          />
        ))}

      </div>

    </main>
  );
}
