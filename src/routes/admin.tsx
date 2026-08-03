import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BarChart3,
  FileText,
  Inbox,
  ListChecks,
  Loader2,
  Newspaper,
  LogOut,
  ShieldAlert,
  Trash2,
  Upload,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { UploadWizard } from "@/components/UploadWizard";
import { classes, subjects } from "@/lib/study-data";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin dashboard — StudyHub Nepal" },
      { name: "description", content: "Manage notes, PDFs, MCQs, blog posts and messages." },
      { property: "og:title", content: "Admin dashboard — StudyHub Nepal" },
      { property: "og:description", content: "Content management for StudyHub Nepal." },
      { name: "robots", content: "noindex" },
    ],
  }),
  ssr: false,
  component: AdminPage,
});

const resourceTypes = [
  "Notes",
  "Exercise Answers",
  "Question Bank",
  "Model Questions",
  "Past Papers",
] as const;

const tabs = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "materials", label: "Materials", icon: FileText },
  { id: "mcqs", label: "MCQs", icon: ListChecks },
  { id: "blog", label: "Blog", icon: Newspaper },
  { id: "messages", label: "Messages", icon: Inbox },
] as const;

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setBusy(false);
    if (error) {
      toast.error("Invalid administrator credentials");
      return;
    }
    toast.success("Signed in");
  }

  return (
    <main className="hero-surface grid min-h-[80vh] place-items-center px-4 py-16">
      <form
        onSubmit={submit}
        className="glass w-full max-w-sm rounded-3xl p-8 shadow-soft"
        aria-labelledby="admin-login-title"
      >
        <ShieldAlert className="h-7 w-7 text-primary" />
        <h1 id="admin-login-title" className="mt-4 font-display text-xl font-extrabold">
          Administrator sign in
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Restricted area. Site management access only.
        </p>
        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="admin-email" className="text-xs font-semibold">
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label htmlFor="admin-password" className="text-xs font-semibold">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </div>
          <button
            disabled={busy}
            className="flex w-full items-center justify-center gap-2 rounded-full brand-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft disabled:opacity-60"
          >
            {busy && <Loader2 className="h-4 w-4 animate-spin" />} Sign in
          </button>
        </div>
      </form>
    </main>
  );
}

function AdminPage() {
  const { session, isAdmin, loading } = useAdminAuth();
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("overview");
  const queryClient = useQueryClient();

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    toast.success("Signed out");
  }

  if (loading) {
    return (
      <main className="grid min-h-screen place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </main>
    );
  }

  if (!session) return <AdminLogin />;

  if (!isAdmin) {
    return (
      <main className="hero-surface grid min-h-[70vh] place-items-center px-4">
        <div className="max-w-md rounded-3xl border border-border bg-card p-8 text-center">
          <ShieldAlert className="mx-auto h-8 w-8 text-destructive" />
          <h1 className="mt-4 font-display text-xl font-extrabold">Admins only</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            This account does not have site management access.
          </p>
          <button
            onClick={() => void signOut()}
            className="mt-6 inline-flex rounded-full brand-gradient px-5 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            Sign out
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="hero-surface min-h-screen">
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-14 lg:px-8">
        <h1 className="font-display text-3xl font-extrabold">Admin dashboard</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Upload PDFs, publish MCQs and blog posts, and read visitor messages.
        </p>
        <button
          onClick={() => void signOut()}
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-primary"
        >
          <LogOut className="h-4 w-4" /> Sign out
        </button>

        <div className="mt-7 flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                tab === t.id
                  ? "brand-gradient text-primary-foreground"
                  : "border border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              <t.icon className="h-4 w-4" /> {t.label}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {tab === "overview" && <Overview />}
          {tab === "materials" && <Materials />}
          {tab === "mcqs" && <Mcqs />}
          {tab === "blog" && <Blog />}
          {tab === "messages" && <Messages />}
        </div>
      </section>
    </main>
  );
}

function useCount(
  table:
    "materials" | "mcq_questions" | "blog_posts" | "page_views" | "contact_messages",
) {
  return useQuery({
    queryKey: ["count", table],
    queryFn: async () => {
      const { count, error } = await supabase
        .from(table)
        .select("id", { count: "exact", head: true });
      if (error) throw error;
      return count ?? 0;
    },
  });
}

function Overview() {
  const materials = useCount("materials");
  const mcqs = useCount("mcq_questions");
  const posts = useCount("blog_posts");
  const views = useCount("page_views");
  const messages = useCount("contact_messages");

  const popular = useQuery({
    queryKey: ["popular-materials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("materials")
        .select("id,title,download_count,view_count")
        .order("download_count", { ascending: false })
        .limit(5);
      if (error) throw error;
      return data;
    },
  });

  const stats = [
    { label: "Materials", value: materials.data ?? 0, icon: FileText },
    { label: "MCQ questions", value: mcqs.data ?? 0, icon: ListChecks },
    { label: "Blog posts", value: posts.data ?? 0, icon: Newspaper },
    { label: "Page views", value: views.data ?? 0, icon: BarChart3 },
    { label: "Messages", value: messages.data ?? 0, icon: Inbox },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => (
          <article key={s.label} className="lift rounded-2xl border border-border bg-card p-6">
            <s.icon className="h-5 w-5 text-primary" />
            <p className="mt-3 font-display text-3xl font-extrabold">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </article>
        ))}
      </div>

      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="font-display text-lg font-bold">Most downloaded</h2>
        {popular.data?.length ? (
          <ul className="mt-4 space-y-2">
            {popular.data.map((m) => (
              <li
                key={m.id}
                className="flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm"
              >
                <span className="min-w-0 truncate">{m.title}</span>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {m.download_count} downloads · {m.view_count} views
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm text-muted-foreground">No materials uploaded yet.</p>
        )}
      </section>
    </div>
  );
}

const fieldClass =
  "mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary";

function Materials() {
  const queryClient = useQueryClient();

  const list = useQuery({
    queryKey: ["admin-materials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("materials")
        .select(
          "id,title,class_level,subject_slug,resource_type,chapter,file_path,is_published,created_at",
        )
        .order("created_at", { ascending: false })
        .limit(50);
      if (error) throw error;
      return data;
    },
  });

  const remove = async (id: string, path: string | null) => {
    if (path) await supabase.storage.from("study-materials").remove([path]);
    const { error } = await supabase.from("materials").delete().eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Deleted");
    void list.refetch();
  };

  return (
    <div className="grid gap-6">
      <UploadWizard
        onComplete={() => {
          void queryClient.invalidateQueries({ queryKey: ["admin-materials"] });
          void queryClient.invalidateQueries({ queryKey: ["count", "materials"] });
          void queryClient.invalidateQueries({ queryKey: ["materials"] });
        }}
      />

      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="font-display text-lg font-bold">Published materials</h2>
        {list.data?.length ? (
          <ul className="mt-4 space-y-2">
            {list.data.map((m) => (
              <li
                key={m.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-border px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{m.title}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    Class {m.class_level} · {m.subject_slug} · {m.resource_type}
                    {m.chapter ? ` · ${m.chapter}` : ""}
                  </p>
                </div>
                <button
                  onClick={() => remove(m.id, m.file_path)}
                  className="shrink-0 text-muted-foreground transition-colors hover:text-destructive"
                  aria-label={`Delete ${m.title}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm text-muted-foreground">Nothing uploaded yet.</p>
        )}
      </section>
    </div>
  );
}

function Mcqs() {
  const queryClient = useQueryClient();
  const [classLevel, setClassLevel] = useState("11");
  const [subjectSlug, setSubjectSlug] = useState(subjects[0].slug);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correct, setCorrect] = useState(0);
  const [explanation, setExplanation] = useState("");
  const [busy, setBusy] = useState(false);

  const list = useQuery({
    queryKey: ["admin-mcqs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("mcq_questions")
        .select("id,question,class_level,subject_slug")
        .order("created_at", { ascending: false })
        .limit(50);
      if (error) throw error;
      return data;
    },
  });

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || options.some((o) => !o.trim())) {
      toast.error("Fill the question and all four options");
      return;
    }
    setBusy(true);
    try {
      const { error } = await supabase.from("mcq_questions").insert({
        class_level: classLevel,
        subject_slug: subjectSlug,
        question: question.trim(),
        options,
        correct_index: correct,
        explanation: explanation.trim() || null,
      });
      if (error) throw error;
      toast.success("Question added");
      setQuestion("");
      setOptions(["", "", "", ""]);
      setExplanation("");
      void queryClient.invalidateQueries({ queryKey: ["admin-mcqs"] });
      void queryClient.invalidateQueries({ queryKey: ["count", "mcq_questions"] });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[380px_minmax(0,1fr)]">
      <form onSubmit={save} className="rounded-2xl border border-border bg-card p-6">
        <h2 className="font-display text-lg font-bold">Add MCQ</h2>
        <div className="mt-4 grid gap-3">
          <div className="grid grid-cols-2 gap-3">
            <label className="text-xs font-semibold">
              Class
              <select
                value={classLevel}
                onChange={(e) => setClassLevel(e.target.value)}
                className={fieldClass}
              >
                {classes.map((c) => (
                  <option key={c} value={c}>
                    Class {c}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-xs font-semibold">
              Subject
              <select
                value={subjectSlug}
                onChange={(e) => setSubjectSlug(e.target.value)}
                className={fieldClass}
              >
                {subjects.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label className="text-xs font-semibold">
            Question
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={3}
              className={fieldClass}
            />
          </label>
          {options.map((o, i) => (
            <label key={i} className="text-xs font-semibold">
              Option {i + 1}
              <div className="flex items-center gap-2">
                <input
                  value={o}
                  onChange={(e) =>
                    setOptions(options.map((v, idx) => (idx === i ? e.target.value : v)))
                  }
                  className={fieldClass}
                />
                <button
                  type="button"
                  onClick={() => setCorrect(i)}
                  className={`mt-1 shrink-0 rounded-full px-3 py-2 text-xs font-semibold ${
                    correct === i
                      ? "brand-gradient text-primary-foreground"
                      : "border border-border text-muted-foreground"
                  }`}
                >
                  Correct
                </button>
              </div>
            </label>
          ))}
          <label className="text-xs font-semibold">
            Explanation
            <textarea
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              rows={2}
              className={fieldClass}
            />
          </label>
          <button
            disabled={busy}
            className="inline-flex items-center justify-center gap-2 rounded-full brand-gradient px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-60"
          >
            {busy && <Loader2 className="h-4 w-4 animate-spin" />} Save question
          </button>
        </div>
      </form>

      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="font-display text-lg font-bold">Question bank</h2>
        {list.data?.length ? (
          <ul className="mt-4 space-y-2">
            {list.data.map((q) => (
              <li
                key={q.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-border px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{q.question}</p>
                  <p className="text-xs text-muted-foreground">
                    Class {q.class_level} · {q.subject_slug}
                  </p>
                </div>
                <button
                  onClick={async () => {
                    await supabase.from("mcq_questions").delete().eq("id", q.id);
                    void list.refetch();
                  }}
                  className="shrink-0 text-muted-foreground transition-colors hover:text-destructive"
                  aria-label="Delete question"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm text-muted-foreground">No questions added yet.</p>
        )}
      </section>
    </div>
  );
}

function Blog() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Study Tips");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [busy, setBusy] = useState(false);

  const list = useQuery({
    queryKey: ["admin-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id,title,slug,is_published,category,created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Add a title");
      return;
    }
    setBusy(true);
    try {
      const slug = title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      const { error } = await supabase.from("blog_posts").insert({
        title: title.trim(),
        slug,
        category,
        excerpt: excerpt.trim() || null,
        content: content.trim() || null,
        is_published: true,
        published_at: new Date().toISOString(),
      });
      if (error) throw error;
      toast.success("Post published");
      setTitle("");
      setExcerpt("");
      setContent("");
      void queryClient.invalidateQueries({ queryKey: ["admin-posts"] });
      void queryClient.invalidateQueries({ queryKey: ["count", "blog_posts"] });
      void queryClient.invalidateQueries({ queryKey: ["public-posts"] });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not publish");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[380px_minmax(0,1fr)]">
      <form onSubmit={save} className="rounded-2xl border border-border bg-card p-6">
        <h2 className="font-display text-lg font-bold">New blog post</h2>
        <div className="mt-4 grid gap-3">
          <label className="text-xs font-semibold">
            Title
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={140}
              className={fieldClass}
            />
          </label>
          <label className="text-xs font-semibold">
            Category
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={fieldClass}
            />
          </label>
          <label className="text-xs font-semibold">
            Excerpt
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={2}
              className={fieldClass}
            />
          </label>
          <label className="text-xs font-semibold">
            Content
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className={fieldClass}
            />
          </label>
          <button
            disabled={busy}
            className="inline-flex items-center justify-center gap-2 rounded-full brand-gradient px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-60"
          >
            {busy && <Loader2 className="h-4 w-4 animate-spin" />} Publish post
          </button>
        </div>
      </form>

      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="font-display text-lg font-bold">Posts</h2>
        {list.data?.length ? (
          <ul className="mt-4 space-y-2">
            {list.data.map((p) => (
              <li
                key={p.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-border px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{p.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {p.category} · {p.is_published ? "Published" : "Draft"}
                  </p>
                </div>
                <button
                  onClick={async () => {
                    await supabase.from("blog_posts").delete().eq("id", p.id);
                    void list.refetch();
                  }}
                  className="shrink-0 text-muted-foreground transition-colors hover:text-destructive"
                  aria-label="Delete post"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm text-muted-foreground">No posts yet.</p>
        )}
      </section>
    </div>
  );
}

function Messages() {
  const list = useQuery({
    queryKey: ["admin-messages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("id,name,email,subject,message,is_read,created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <h2 className="font-display text-lg font-bold">Student messages</h2>
      {list.data?.length ? (
        <ul className="mt-4 space-y-3">
          {list.data.map((m) => (
            <li key={m.id} className="rounded-xl border border-border p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold">
                  {m.name} <span className="font-normal text-muted-foreground">· {m.email}</span>
                </p>
                <span className="text-xs text-muted-foreground">
                  {new Date(m.created_at).toLocaleDateString()}
                </span>
              </div>
              {m.subject && <p className="mt-1 text-xs font-medium text-primary">{m.subject}</p>}
              <p className="mt-2 whitespace-pre-line text-sm text-muted-foreground">{m.message}</p>
              <button
                onClick={async () => {
                  await supabase.from("contact_messages").delete().eq("id", m.id);
                  void list.refetch();
                }}
                className="mt-3 text-xs text-muted-foreground hover:text-destructive"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm text-muted-foreground">No messages yet.</p>
      )}
    </section>
  );
}
