import { createFileRoute } from "@tanstack/react-router";
import { setupAdmin } from "@/lib/setup-admin.functions";

export const Route = createFileRoute("/api/public/setup-admin")({
  server: { handlers: { GET: async () => Response.json(await setupAdmin()) } },
});
