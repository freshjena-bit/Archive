import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const { id } = await params;

  const { data: file } =
    await supabaseServer
      .from("files")
      .select("*")
      .eq("id", id)
      .single();

  if (!file) {
    return NextResponse.json({
      error: "not found",
    });
  }

  await supabaseServer
    .from("files")
    .update({
      downloads:
        (file.downloads || 0) + 1,
    })
    .eq("id", id);

  const {
    data: downloadData,
  } = await supabaseServer
    .storage
    .from("repository-files")
    .createSignedUrl(
      file.file_url,
      60
    );

  return NextResponse.redirect(
    downloadData?.signedUrl || "/"
  );
}
