import { createServerFn } from "@tanstack/react-start";

export const setupAdmin = createServerFn({ method: "POST" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data: list, error: listError } = await supabaseAdmin.auth.admin.listUsers();
  if (listError) throw listError;
  const users = list.users.filter((u) => (u.email ?? "").toLowerCase() === "bishalkawan99@gmail.com");
  const out: unknown[] = [];
  for (const u of users) {
    const { error } = await supabaseAdmin.auth.admin.updateUserById(u.id, {
      email_confirm: true,
      password: process.env["ADMIN_BOOTSTRAP_PASSWORD"]!,
    });
    out.push({ id: u.id, error: error?.message ?? null });
    await supabaseAdmin.from("user_roles").insert({ user_id: u.id, role: "admin" });
  }
  return { count: users.length, out };
});
