import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Download, Eye, FileText } from "lucide-react";
import { toast } from "sonner";
import { classes, subjects, buildResources } from "@/lib/study-data";
import { supabase } from "@/integrations/supabase/client";
import { SearchBar } from "./SearchBar";

export function ResourceLibrary({
  title,
  subtitle,
  kind,
}: {
  title: string;
  subtitle: string;
  kind: string;
}) {
  const [activeClass, setActiveClass] = useState<string>("11");
  const [activeSubject, setActiveSubject] = useState<string>("all");
  const all = useMemo(() => buildResources(kind), [kind]);

  const uploaded = useQuery({
    queryKey: ["materials", kind, activeClass],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("materials")
        .select("id,title,description,chapter,subject_slug,file_path")
        .eq("resource_type", kind)
        .eq("class_level", activeClass)
        .eq("is_published", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const openFile = async (path: string | null) => {
    if (!path) {
      toast.info("This material has no file attached yet.");
      return;
    }
    const { data, error } = await supabase.storage.from("study-materials").createSignedUrl(path, 60 * 10);
    if (error || !data) {
      toast.error("Sign in to open this PDF.");
      return;
    }
    window.open(data.signedUrl, "_blank", "noopener");
  };

  const uploadedList = (uploaded.data ?? []).filter(
    (m) => activeSubject === "all" || subjects.find((s) => s.slug === m.subject_slug)?.name === activeSubject,
  );

  const filtered = all.filter(
    (r) => r.classId === activeClass && (activeSubject === "all" || r.subject === activeSubject),
  );


  return (
    <main className="hero-surface">
      <section className="mx-auto max-w-7xl px-4 pb-8 pt-14 lg:px-8">
        <h1 className="max-w-3xl font-display text-4xl font-extrabold sm:text-5xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">{subtitle}</p>
        <div className="mt-7">
          <SearchBar />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-wrap items-center gap-2">
          {classes.map((c) => (
            <button
              key={c}
              onClick={() => setActiveClass(c)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                activeClass === c
                  ? "brand-gradient text-primary-foreground"
                  : "border border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              Class {c}
            </button>
          ))}
          <span className="mx-1 hidden h-6 w-px bg-border sm:block" />
          {["all", ...subjects.map((s) => s.name)].map((s) => (
            <button
              key={s}
              onClick={() => setActiveSubject(s)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                activeSubject === s
                  ? "bg-primary/10 text-primary"
                  : "border border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {s === "all" ? "All subjects" : s}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => {
            const slug = subjects.find((s) => s.name === r.subject)!.slug;
            return (
              <article key={r.title} className="lift rounded-2xl border border-border bg-card p-6 animate-fade-up">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <FileText className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <h2 className="truncate text-sm font-bold">{r.subject}</h2>
                    <p className="text-xs text-muted-foreground">Class {r.classId} · {kind}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">{r.meta}</p>
                <div className="mt-5 flex gap-2">
                  <Link
                    to="/subject/$classId/$slug"
                    params={{ classId: r.classId, slug }}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl brand-gradient px-3 py-2 text-xs font-semibold text-primary-foreground"
                  >
                    <Eye className="h-4 w-4" /> View
                  </Link>
                  <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-3 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-primary">
                    <Download className="h-4 w-4" /> PDF
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
