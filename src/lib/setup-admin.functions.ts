import { createServerFn } from "@tanstack/react-start";

/** One-off maintenance helper: confirms + role-grants the admin account. */
export const setupAdmin = createServerFn({ method: "POST" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data: list, error: listError } = await supabaseAdmin.auth.admin.listUsers();
  if (listError) throw listError;
  const user = list.users.find(
    (u) => (u.email ?? "").toLowerCase() === "bishalkawan99@gmail.com",
  );
  if (!user) return { ok: false, reason: "not found" };
  const { error } = await supabaseAdmin.auth.admin.updateUserById(user.id, {
    email_confirm: true,
  });
  if (error) throw error;
  await supabaseAdmin.from("user_roles").insert({ user_id: user.id, role: "admin" });
  return { ok: true, id: user.id };
});
