import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/**
 * Public: returns a short-lived signed URL for a published material's file.
 * Visitors need no account; only published rows are ever resolved.
 */
export const getMaterialFileUrl = createServerFn({ method: "POST" })
  .inputValidator((data) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("materials")
      .select("file_path,is_published")
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw error;
    if (!row || !row.is_published || !row.file_path) return { url: null as string | null };

    const signed = await supabaseAdmin.storage
      .from("study-materials")
      .createSignedUrl(row.file_path, 60 * 10);
    if (signed.error) throw signed.error;

    await supabaseAdmin
      .from("materials")
      .update({ download_count: undefined })
      .eq("id", data.id)
      .select("id")
      .maybeSingle();

    return { url: signed.data?.signedUrl ?? null };
  });
