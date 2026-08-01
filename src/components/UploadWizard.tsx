import { useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileImage,
  FileText,
  Loader2,
  Trash2,
  UploadCloud,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { classes, subjects } from "@/lib/study-data";

const RESOURCE_TYPES = [
  "Notes",
  "Exercise Answers",
  "Question Bank",
  "Model Questions",
  "Past Papers",
] as const;

const ACCEPTED = {
  "application/pdf": "PDF",
  "image/png": "PNG",
  "image/jpeg": "JPG",
  "image/webp": "WebP",
} as const;

const MAX_BYTES = 20 * 1024 * 1024;

type Queued = {
  key: string;
  file: File;
  title: string;
  progress: number;
  status: "queued" | "uploading" | "done" | "error";
  error?: string;
};

function humanSize(bytes: number) {
  return bytes > 1024 * 1024
    ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function safeName(name: string) {
  return name.replace(/[^\w.-]+/g, "-").toLowerCase();
}

/** Uploads to Storage with real progress via XHR (supabase-js has no progress events). */
function uploadWithProgress(
  path: string,
  file: File,
  token: string,
  onProgress: (pct: number) => void,
) {
  return new Promise<void>((resolve, reject) => {
    const base = import.meta.env["VITE_SUPABASE_URL"];
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${base}/storage/v1/object/study-materials/${encodeURI(path)}`);
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    xhr.setRequestHeader("x-upsert", "true");
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100));
    };
    xhr.onload = () =>
      xhr.status >= 200 && xhr.status < 300
        ? resolve()
        : reject(new Error(`Upload failed (${xhr.status})`));
    xhr.onerror = () => reject(new Error("Network error while uploading"));
    const body = new FormData();
    body.append("", file, safeName(file.name));
    xhr.send(body);
  });
}

export function UploadWizard({ onComplete }: { onComplete?: () => void }) {
  const [step, setStep] = useState(0);
  const [classLevel, setClassLevel] = useState<string>("11");
  const [subjectSlug, setSubjectSlug] = useState(subjects[0].slug);
  const [chapter, setChapter] = useState("");
  const [resourceType, setResourceType] = useState<string>(RESOURCE_TYPES[0]);
  const [description, setDescription] = useState("");
  const [year, setYear] = useState("");
  const [queue, setQueue] = useState<Queued[]>([]);
  const [running, setRunning] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const subject = subjects.find((s) => s.slug === subjectSlug)!;
  const chapterOptions = subject.chapters ?? [];

  const totalProgress = useMemo(() => {
    if (!queue.length) return 0;
    return Math.round(queue.reduce((sum, q) => sum + q.progress, 0) / queue.length);
  }, [queue]);

  const addFiles = (files: FileList | null) => {
    if (!files?.length) return;
    const next: Queued[] = [];
    Array.from(files).forEach((file) => {
      if (!(file.type in ACCEPTED)) {
        toast.error(`${file.name}: only PDF, PNG, JPG or WebP files are allowed`);
        return;
      }
      if (file.size > MAX_BYTES) {
        toast.error(`${file.name}: larger than 20 MB`);
        return;
      }
      next.push({
        key: `${file.name}-${file.size}-${Math.random().toString(36).slice(2)}`,
        file,
        title: file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " "),
        progress: 0,
        status: "queued",
      });
    });
    if (next.length) setQueue((q) => [...q, ...next]);
  };

  const startUpload = async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    const token = sessionData.session?.access_token;
    const userId = sessionData.session?.user.id;
    if (!token || !userId) {
      toast.error("Your session expired — sign in again.");
      return;
    }
    setRunning(true);
    setStep(2);

    for (const item of queue) {
      if (item.status === "done") continue;
      setQueue((q) => q.map((x) => (x.key === item.key ? { ...x, status: "uploading", progress: 1 } : x)));
      const path = `${classLevel}/${subjectSlug}/${resourceType.toLowerCase().replace(/\s+/g, "-")}/${Date.now()}-${safeName(item.file.name)}`;
      try {
        await uploadWithProgress(path, item.file, token, (pct) =>
          setQueue((q) => q.map((x) => (x.key === item.key ? { ...x, progress: pct } : x))),
        );
        const { error } = await supabase.from("materials").insert({
          class_level: classLevel,
          subject_slug: subjectSlug,
          chapter: chapter.trim() || null,
          resource_type: resourceType,
          title: item.title.trim() || item.file.name,
          description: description.trim() || null,
          year: year.trim() || null,
          file_path: path,
          file_size: item.file.size,
          is_published: true,
          created_by: userId,
        });
        if (error) throw error;
        setQueue((q) => q.map((x) => (x.key === item.key ? { ...x, status: "done", progress: 100 } : x)));
      } catch (error) {
        const message = error instanceof Error ? error.message : "Upload failed";
        setQueue((q) => q.map((x) => (x.key === item.key ? { ...x, status: "error", error: message } : x)));
      }
    }

    setRunning(false);
    onComplete?.();
    const failed = queue.length;
    void failed;
    toast.success("Upload finished — published resources are live");
  };

  const doneCount = queue.filter((q) => q.status === "done").length;
  const errorCount = queue.filter((q) => q.status === "error").length;

  const field =
    "mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary";

  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
        <div className="min-w-0">
          <h2 className="font-display text-lg font-bold">Upload wizard</h2>
          <p className="text-xs text-muted-foreground">
            PDFs and images, validated and auto-published to the right class, subject and chapter.
          </p>
        </div>
        <ol className="flex shrink-0 items-center gap-2 text-xs font-semibold">
          {["Destination", "Files", "Publish"].map((label, i) => (
            <li
              key={label}
              className={`rounded-full px-3 py-1.5 ${
                i === step
                  ? "brand-gradient text-primary-foreground"
                  : i < step
                    ? "bg-primary/10 text-primary"
                    : "border border-border text-muted-foreground"
              }`}
            >
              {i + 1}. {label}
            </li>
          ))}
        </ol>
      </header>

      {step === 0 && (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <label className="text-xs font-semibold">
            Class
            <select value={classLevel} onChange={(e) => setClassLevel(e.target.value)} className={field}>
              {classes.map((c) => (
                <option key={c} value={c}>
                  Class {c}
                </option>
              ))}
            </select>
          </label>
          <label className="text-xs font-semibold">
            Resource type
            <select value={resourceType} onChange={(e) => setResourceType(e.target.value)} className={field}>
              {RESOURCE_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
          <label className="text-xs font-semibold">
            Subject
            <select
              value={subjectSlug}
              onChange={(e) => {
                setSubjectSlug(e.target.value);
                setChapter("");
              }}
              className={field}
            >
              {subjects.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.name}
                </option>
              ))}
            </select>
          </label>
          <label className="text-xs font-semibold">
            Chapter
            <select value={chapter} onChange={(e) => setChapter(e.target.value)} className={field}>
              <option value="">Whole subject (no chapter)</option>
              {chapterOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <label className="text-xs font-semibold">
            Year (for past papers)
            <input value={year} onChange={(e) => setYear(e.target.value)} maxLength={9} className={field} />
          </label>
          <label className="text-xs font-semibold">
            Shared description
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={300}
              className={field}
            />
          </label>
          <div className="sm:col-span-2 flex justify-end">
            <button
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-2 rounded-full brand-gradient px-5 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              Choose files <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="mt-6">
          <p className="text-xs text-muted-foreground">
            Publishing to <span className="font-semibold text-foreground">Class {classLevel} · {subject.name} · {resourceType}</span>
            {chapter ? ` · ${chapter}` : ""}
          </p>

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              addFiles(e.dataTransfer.files);
            }}
            onClick={() => inputRef.current?.click()}
            className={`mt-4 grid cursor-pointer place-items-center rounded-2xl border-2 border-dashed p-10 text-center transition-colors ${
              dragging ? "border-primary bg-primary/5" : "border-border"
            }`}
          >
            <UploadCloud className="h-8 w-8 text-primary" />
            <p className="mt-3 text-sm font-semibold">Drop files here or click to browse</p>
            <p className="mt-1 text-xs text-muted-foreground">
              PDF, PNG, JPG or WebP · up to 20 MB each
            </p>
            <input
              ref={inputRef}
              type="file"
              multiple
              accept=".pdf,.png,.jpg,.jpeg,.webp"
              className="hidden"
              onChange={(e) => {
                addFiles(e.target.files);
                e.target.value = "";
              }}
            />
          </div>

          {queue.length > 0 && (
            <ul className="mt-4 space-y-2">
              {queue.map((q) => (
                <li key={q.key} className="flex items-center gap-3 rounded-xl border border-border px-4 py-3">
                  {q.file.type === "application/pdf" ? (
                    <FileText className="h-5 w-5 shrink-0 text-primary" />
                  ) : (
                    <FileImage className="h-5 w-5 shrink-0 text-primary" />
                  )}
                  <div className="min-w-0 flex-1">
                    <input
                      value={q.title}
                      onChange={(e) =>
                        setQueue((list) =>
                          list.map((x) => (x.key === q.key ? { ...x, title: e.target.value } : x)),
                        )
                      }
                      className="w-full rounded-lg border border-transparent bg-transparent px-1 py-0.5 text-sm font-semibold outline-none focus:border-border"
                    />
                    <p className="truncate px-1 text-xs text-muted-foreground">
                      {ACCEPTED[q.file.type as keyof typeof ACCEPTED]} · {humanSize(q.file.size)}
                    </p>
                  </div>
                  <button
                    onClick={() => setQueue((list) => list.filter((x) => x.key !== q.key))}
                    className="shrink-0 text-muted-foreground transition-colors hover:text-destructive"
                    aria-label={`Remove ${q.file.name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-5 flex flex-wrap justify-between gap-2">
            <button
              onClick={() => setStep(0)}
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-muted-foreground"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <button
              disabled={!queue.length}
              onClick={() => void startUpload()}
              className="inline-flex items-center gap-2 rounded-full brand-gradient px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-50"
            >
              <UploadCloud className="h-4 w-4" /> Upload &amp; publish {queue.length || ""}
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="mt-6">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span>{running ? "Uploading…" : "Finished"}</span>
            <span>{totalProgress}%</span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full brand-gradient transition-all" style={{ width: `${totalProgress}%` }} />
          </div>

          <ul className="mt-4 space-y-2">
            {queue.map((q) => (
              <li key={q.key} className="rounded-xl border border-border px-4 py-3">
                <div className="flex items-center gap-3">
                  {q.status === "done" ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                  ) : q.status === "error" ? (
                    <XCircle className="h-4 w-4 shrink-0 text-destructive" />
                  ) : q.status === "uploading" ? (
                    <Loader2 className="h-4 w-4 shrink-0 animate-spin text-primary" />
                  ) : (
                    <UploadCloud className="h-4 w-4 shrink-0 text-muted-foreground" />
                  )}
                  <p className="min-w-0 flex-1 truncate text-sm font-medium">{q.title}</p>
                  <span className="shrink-0 text-xs text-muted-foreground">{q.progress}%</span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className={`h-full transition-all ${q.status === "error" ? "bg-destructive" : "brand-gradient"}`}
                    style={{ width: `${q.progress}%` }}
                  />
                </div>
                {q.error && <p className="mt-2 text-xs text-destructive">{q.error}</p>}
              </li>
            ))}
          </ul>

          {!running && (
            <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs text-muted-foreground">
                {doneCount} published{errorCount ? ` · ${errorCount} failed` : ""}
              </p>
              <div className="flex gap-2">
                {errorCount > 0 && (
                  <button
                    onClick={() => void startUpload()}
                    className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-muted-foreground"
                  >
                    Retry failed
                  </button>
                )}
                <button
                  onClick={() => {
                    setQueue([]);
                    setStep(0);
                  }}
                  className="rounded-full brand-gradient px-5 py-2.5 text-sm font-semibold text-primary-foreground"
                >
                  Upload more
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
