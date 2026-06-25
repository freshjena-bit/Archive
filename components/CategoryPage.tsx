import FileCard from "./FileCard";
import { supabaseServer } from "@/lib/supabase-server";

export default async function CategoryPage(
  {
    category,
  }: {
    category: string;
  }
) {
  const { data } =
    await supabaseServer
      .from("files")
      .select("*")
      .eq("status", "approved")
      .eq("category", category)
      .order("created_at", {
        ascending: false,
      });

  return (
    <main className="max-w-6xl mx-auto p-4">

      <h1 className="text-4xl font-bold mb-6">
        {category}
      </h1>

      <div className="space-y-4">

        {data?.map((file) => (
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
