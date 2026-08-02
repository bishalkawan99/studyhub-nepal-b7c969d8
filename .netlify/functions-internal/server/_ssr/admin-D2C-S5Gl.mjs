import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, i as require_react, r as useQueryClient, t as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { D as LoaderCircle, I as FileText, K as CircleX, M as Inbox, O as ListChecks, R as FileImage, U as CloudUpload, Y as ChartColumn, a as Users, b as Newspaper, c as Trash2, nt as ArrowRight, p as ShieldAlert, q as CircleCheck, rt as ArrowLeft } from "../_libs/lucide-react.mjs";
import { t as supabase } from "./client-D3rX22rO.mjs";
import { t as useAuth } from "./useAuth-D3TSxQ35.mjs";
import { c as subjects, r as classes } from "./study-data-BfOlECnh.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-D2C-S5Gl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var RESOURCE_TYPES = [
	"Notes",
	"Exercise Answers",
	"Question Bank",
	"Model Questions",
	"Past Papers"
];
var ACCEPTED = {
	"application/pdf": "PDF",
	"image/png": "PNG",
	"image/jpeg": "JPG",
	"image/webp": "WebP"
};
var MAX_BYTES = 20971520;
function humanSize(bytes) {
	return bytes > 1048576 ? `${(bytes / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}
function safeName(name) {
	return name.replace(/[^\w.-]+/g, "-").toLowerCase();
}
/** Uploads to Storage with real progress via XHR (supabase-js has no progress events). */
function uploadWithProgress(path, file, token, onProgress) {
	return new Promise((resolve, reject) => {
		const base = {
			"BASE_URL": "/",
			"DEV": false,
			"MODE": "production",
			"PROD": true,
			"SSR": true,
			"TSS_DEV_SERVER": "false",
			"TSS_DEV_SSR_STYLES_BASEPATH": "/",
			"TSS_DEV_SSR_STYLES_ENABLED": "true",
			"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
			"TSS_INLINE_CSS_ENABLED": "false",
			"TSS_ROUTER_BASEPATH": "",
			"TSS_SERVER_FN_BASE": "/_serverFn/",
			"VITE_SUPABASE_PROJECT_ID": "nnsnbwhkaqlncpubzrdi",
			"VITE_SUPABASE_PUBLISHABLE_KEY": "sb_publishable_ErHr6OUGKONMjvdo1ZL95g_yuT-Peai",
			"VITE_SUPABASE_URL": "https://nnsnbwhkaqlncpubzrdi.supabase.co"
		}["VITE_SUPABASE_URL"];
		const xhr = new XMLHttpRequest();
		xhr.open("POST", `${base}/storage/v1/object/study-materials/${encodeURI(path)}`);
		xhr.setRequestHeader("Authorization", `Bearer ${token}`);
		xhr.setRequestHeader("x-upsert", "true");
		xhr.upload.onprogress = (e) => {
			if (e.lengthComputable) onProgress(Math.round(e.loaded / e.total * 100));
		};
		xhr.onload = () => xhr.status >= 200 && xhr.status < 300 ? resolve() : reject(/* @__PURE__ */ new Error(`Upload failed (${xhr.status})`));
		xhr.onerror = () => reject(/* @__PURE__ */ new Error("Network error while uploading"));
		const body = new FormData();
		body.append("", file, safeName(file.name));
		xhr.send(body);
	});
}
function UploadWizard({ onComplete }) {
	const [step, setStep] = (0, import_react.useState)(0);
	const [classLevel, setClassLevel] = (0, import_react.useState)("11");
	const [subjectSlug, setSubjectSlug] = (0, import_react.useState)(subjects[0].slug);
	const [chapter, setChapter] = (0, import_react.useState)("");
	const [resourceType, setResourceType] = (0, import_react.useState)(RESOURCE_TYPES[0]);
	const [description, setDescription] = (0, import_react.useState)("");
	const [year, setYear] = (0, import_react.useState)("");
	const [queue, setQueue] = (0, import_react.useState)([]);
	const [running, setRunning] = (0, import_react.useState)(false);
	const inputRef = (0, import_react.useRef)(null);
	const [dragging, setDragging] = (0, import_react.useState)(false);
	const subject = subjects.find((s) => s.slug === subjectSlug);
	const chapterOptions = subject.chapters ?? [];
	const totalProgress = (0, import_react.useMemo)(() => {
		if (!queue.length) return 0;
		return Math.round(queue.reduce((sum, q) => sum + q.progress, 0) / queue.length);
	}, [queue]);
	const addFiles = (files) => {
		if (!files?.length) return;
		const next = [];
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
				status: "queued"
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
			setQueue((q) => q.map((x) => x.key === item.key ? {
				...x,
				status: "uploading",
				progress: 1
			} : x));
			const path = `${classLevel}/${subjectSlug}/${resourceType.toLowerCase().replace(/\s+/g, "-")}/${Date.now()}-${safeName(item.file.name)}`;
			try {
				await uploadWithProgress(path, item.file, token, (pct) => setQueue((q) => q.map((x) => x.key === item.key ? {
					...x,
					progress: pct
				} : x)));
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
					created_by: userId
				});
				if (error) throw error;
				setQueue((q) => q.map((x) => x.key === item.key ? {
					...x,
					status: "done",
					progress: 100
				} : x));
			} catch (error) {
				const message = error instanceof Error ? error.message : "Upload failed";
				setQueue((q) => q.map((x) => x.key === item.key ? {
					...x,
					status: "error",
					error: message
				} : x));
			}
		}
		setRunning(false);
		onComplete?.();
		queue.length;
		toast.success("Upload finished — published resources are live");
	};
	const doneCount = queue.filter((q) => q.status === "done").length;
	const errorCount = queue.filter((q) => q.status === "error").length;
	const field = "mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-2xl border border-border bg-card p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-bold",
						children: "Upload wizard"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "PDFs and images, validated and auto-published to the right class, subject and chapter."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "flex shrink-0 items-center gap-2 text-xs font-semibold",
					children: [
						"Destination",
						"Files",
						"Publish"
					].map((label, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: `rounded-full px-3 py-1.5 ${i === step ? "brand-gradient text-primary-foreground" : i < step ? "bg-primary/10 text-primary" : "border border-border text-muted-foreground"}`,
						children: [
							i + 1,
							". ",
							label
						]
					}, label))
				})]
			}),
			step === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-3 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-xs font-semibold",
						children: ["Class", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: classLevel,
							onChange: (e) => setClassLevel(e.target.value),
							className: field,
							children: classes.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: c,
								children: ["Class ", c]
							}, c))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-xs font-semibold",
						children: ["Resource type", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: resourceType,
							onChange: (e) => setResourceType(e.target.value),
							className: field,
							children: RESOURCE_TYPES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: t,
								children: t
							}, t))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-xs font-semibold",
						children: ["Subject", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: subjectSlug,
							onChange: (e) => {
								setSubjectSlug(e.target.value);
								setChapter("");
							},
							className: field,
							children: subjects.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: s.slug,
								children: s.name
							}, s.slug))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-xs font-semibold",
						children: ["Chapter", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: chapter,
							onChange: (e) => setChapter(e.target.value),
							className: field,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Whole subject (no chapter)"
							}), chapterOptions.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: c,
								children: c
							}, c))]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-xs font-semibold",
						children: ["Year (for past papers)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: year,
							onChange: (e) => setYear(e.target.value),
							maxLength: 9,
							className: field
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-xs font-semibold",
						children: ["Shared description", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: description,
							onChange: (e) => setDescription(e.target.value),
							maxLength: 300,
							className: field
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "sm:col-span-2 flex justify-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setStep(1),
							className: "inline-flex items-center gap-2 rounded-full brand-gradient px-5 py-2.5 text-sm font-semibold text-primary-foreground",
							children: ["Choose files ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
						})
					})
				]
			}),
			step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: [
							"Publishing to",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-semibold text-foreground",
								children: [
									"Class ",
									classLevel,
									" · ",
									subject.name,
									" · ",
									resourceType
								]
							}),
							chapter ? ` · ${chapter}` : ""
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						onDragOver: (e) => {
							e.preventDefault();
							setDragging(true);
						},
						onDragLeave: () => setDragging(false),
						onDrop: (e) => {
							e.preventDefault();
							setDragging(false);
							addFiles(e.dataTransfer.files);
						},
						onClick: () => inputRef.current?.click(),
						className: `mt-4 grid cursor-pointer place-items-center rounded-2xl border-2 border-dashed p-10 text-center transition-colors ${dragging ? "border-primary bg-primary/5" : "border-border"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, { className: "h-8 w-8 text-primary" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm font-semibold",
								children: "Drop files here or click to browse"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: "PDF, PNG, JPG or WebP · up to 20 MB each"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: inputRef,
								type: "file",
								multiple: true,
								accept: ".pdf,.png,.jpg,.jpeg,.webp",
								className: "hidden",
								onChange: (e) => {
									addFiles(e.target.files);
									e.target.value = "";
								}
							})
						]
					}),
					queue.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-2",
						children: queue.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-3 rounded-xl border border-border px-4 py-3",
							children: [
								q.file.type === "application/pdf" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-5 w-5 shrink-0 text-primary" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileImage, { className: "h-5 w-5 shrink-0 text-primary" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: q.title,
										onChange: (e) => setQueue((list) => list.map((x) => x.key === q.key ? {
											...x,
											title: e.target.value
										} : x)),
										className: "w-full rounded-lg border border-transparent bg-transparent px-1 py-0.5 text-sm font-semibold outline-none focus:border-border"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "truncate px-1 text-xs text-muted-foreground",
										children: [
											ACCEPTED[q.file.type],
											" · ",
											humanSize(q.file.size)
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setQueue((list) => list.filter((x) => x.key !== q.key)),
									className: "shrink-0 text-muted-foreground transition-colors hover:text-destructive",
									"aria-label": `Remove ${q.file.name}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
								})
							]
						}, q.key))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex flex-wrap justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setStep(0),
							className: "inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Back"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							disabled: !queue.length,
							onClick: () => void startUpload(),
							className: "inline-flex items-center gap-2 rounded-full brand-gradient px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-50",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, { className: "h-4 w-4" }),
								" Upload & publish ",
								queue.length || ""
							]
						})]
					})
				]
			}),
			step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between text-xs font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: running ? "Uploading…" : "Finished" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [totalProgress, "%"] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 h-2 w-full overflow-hidden rounded-full bg-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full brand-gradient transition-all",
							style: { width: `${totalProgress}%` }
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-2",
						children: queue.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-xl border border-border px-4 py-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [
										q.status === "done" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 shrink-0 text-primary" }) : q.status === "error" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-4 w-4 shrink-0 text-destructive" }) : q.status === "uploading" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 shrink-0 animate-spin text-primary" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, { className: "h-4 w-4 shrink-0 text-muted-foreground" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "min-w-0 flex-1 truncate text-sm font-medium",
											children: q.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "shrink-0 text-xs text-muted-foreground",
											children: [q.progress, "%"]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `h-full transition-all ${q.status === "error" ? "bg-destructive" : "brand-gradient"}`,
										style: { width: `${q.progress}%` }
									})
								}),
								q.error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-xs text-destructive",
									children: q.error
								})
							]
						}, q.key))
					}),
					!running && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex flex-wrap items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								doneCount,
								" published",
								errorCount ? ` · ${errorCount} failed` : ""
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [errorCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => void startUpload(),
								className: "rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-muted-foreground",
								children: "Retry failed"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									setQueue([]);
									setStep(0);
								},
								className: "rounded-full brand-gradient px-5 py-2.5 text-sm font-semibold text-primary-foreground",
								children: "Upload more"
							})]
						})]
					})
				]
			})
		]
	});
}
var tabs = [
	{
		id: "overview",
		label: "Overview",
		icon: ChartColumn
	},
	{
		id: "materials",
		label: "Materials",
		icon: FileText
	},
	{
		id: "mcqs",
		label: "MCQs",
		icon: ListChecks
	},
	{
		id: "blog",
		label: "Blog",
		icon: Newspaper
	},
	{
		id: "messages",
		label: "Messages",
		icon: Inbox
	}
];
function AdminPage() {
	const { isAdmin, loading } = useAuth();
	const [tab, setTab] = (0, import_react.useState)("overview");
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-screen place-items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-6 w-6 animate-spin text-primary" })
	});
	if (!isAdmin) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "hero-surface grid min-h-[70vh] place-items-center px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md rounded-3xl border border-border bg-card p-8 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "mx-auto h-8 w-8 text-destructive" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 font-display text-xl font-extrabold",
					children: "Admins only"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "This area manages site content. Ask an existing admin to grant you the admin role."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/dashboard",
					className: "mt-6 inline-flex rounded-full brand-gradient px-5 py-2.5 text-sm font-semibold text-primary-foreground",
					children: "Back to my dashboard"
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "hero-surface min-h-screen",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-7xl px-4 pb-16 pt-14 lg:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-extrabold",
					children: "Admin dashboard"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Upload PDFs, publish MCQs and blog posts, and read student messages."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-7 flex flex-wrap gap-2",
					children: tabs.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setTab(t.id),
						className: `inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${tab === t.id ? "brand-gradient text-primary-foreground" : "border border-border bg-card text-muted-foreground hover:text-foreground"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(t.icon, { className: "h-4 w-4" }),
							" ",
							t.label
						]
					}, t.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8",
					children: [
						tab === "overview" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overview, {}),
						tab === "materials" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Materials, {}),
						tab === "mcqs" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mcqs, {}),
						tab === "blog" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Blog, {}),
						tab === "messages" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Messages, {})
					]
				})
			]
		})
	});
}
function useCount(table) {
	return useQuery({
		queryKey: ["count", table],
		queryFn: async () => {
			const { count, error } = await supabase.from(table).select("id", {
				count: "exact",
				head: true
			});
			if (error) throw error;
			return count ?? 0;
		}
	});
}
function Overview() {
	const materials = useCount("materials");
	const mcqs = useCount("mcq_questions");
	const posts = useCount("blog_posts");
	const students = useCount("profiles");
	const views = useCount("page_views");
	const messages = useCount("contact_messages");
	const popular = useQuery({
		queryKey: ["popular-materials"],
		queryFn: async () => {
			const { data, error } = await supabase.from("materials").select("id,title,download_count,view_count").order("download_count", { ascending: false }).limit(5);
			if (error) throw error;
			return data;
		}
	});
	const stats = [
		{
			label: "Materials",
			value: materials.data ?? 0,
			icon: FileText
		},
		{
			label: "MCQ questions",
			value: mcqs.data ?? 0,
			icon: ListChecks
		},
		{
			label: "Blog posts",
			value: posts.data ?? 0,
			icon: Newspaper
		},
		{
			label: "Registered students",
			value: students.data ?? 0,
			icon: Users
		},
		{
			label: "Page views",
			value: views.data ?? 0,
			icon: ChartColumn
		},
		{
			label: "Messages",
			value: messages.data ?? 0,
			icon: Inbox
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
			children: stats.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "lift rounded-2xl border border-border bg-card p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "h-5 w-5 text-primary" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 font-display text-3xl font-extrabold",
						children: s.value
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: s.label
					})
				]
			}, s.label))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rounded-2xl border border-border bg-card p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg font-bold",
				children: "Most downloaded"
			}), popular.data?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 space-y-2",
				children: popular.data.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "min-w-0 truncate",
						children: m.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "shrink-0 text-xs text-muted-foreground",
						children: [
							m.download_count,
							" downloads · ",
							m.view_count,
							" views"
						]
					})]
				}, m.id))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-muted-foreground",
				children: "No materials uploaded yet."
			})]
		})]
	});
}
var fieldClass = "mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary";
function Materials() {
	const queryClient = useQueryClient();
	const list = useQuery({
		queryKey: ["admin-materials"],
		queryFn: async () => {
			const { data, error } = await supabase.from("materials").select("id,title,class_level,subject_slug,resource_type,chapter,file_path,is_published,created_at").order("created_at", { ascending: false }).limit(50);
			if (error) throw error;
			return data;
		}
	});
	const remove = async (id, path) => {
		if (path) await supabase.storage.from("study-materials").remove([path]);
		const { error } = await supabase.from("materials").delete().eq("id", id);
		if (error) {
			toast.error(error.message);
			return;
		}
		toast.success("Deleted");
		list.refetch();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UploadWizard, { onComplete: () => {
			queryClient.invalidateQueries({ queryKey: ["admin-materials"] });
			queryClient.invalidateQueries({ queryKey: ["count", "materials"] });
			queryClient.invalidateQueries({ queryKey: ["materials"] });
		} }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rounded-2xl border border-border bg-card p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg font-bold",
				children: "Published materials"
			}), list.data?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 space-y-2",
				children: list.data.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center justify-between gap-3 rounded-xl border border-border px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-sm font-semibold",
							children: m.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "truncate text-xs text-muted-foreground",
							children: [
								"Class ",
								m.class_level,
								" · ",
								m.subject_slug,
								" · ",
								m.resource_type,
								m.chapter ? ` · ${m.chapter}` : ""
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => remove(m.id, m.file_path),
						className: "shrink-0 text-muted-foreground transition-colors hover:text-destructive",
						"aria-label": `Delete ${m.title}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
					})]
				}, m.id))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-muted-foreground",
				children: "Nothing uploaded yet."
			})]
		})]
	});
}
function Mcqs() {
	const queryClient = useQueryClient();
	const [classLevel, setClassLevel] = (0, import_react.useState)("11");
	const [subjectSlug, setSubjectSlug] = (0, import_react.useState)(subjects[0].slug);
	const [question, setQuestion] = (0, import_react.useState)("");
	const [options, setOptions] = (0, import_react.useState)([
		"",
		"",
		"",
		""
	]);
	const [correct, setCorrect] = (0, import_react.useState)(0);
	const [explanation, setExplanation] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const list = useQuery({
		queryKey: ["admin-mcqs"],
		queryFn: async () => {
			const { data, error } = await supabase.from("mcq_questions").select("id,question,class_level,subject_slug").order("created_at", { ascending: false }).limit(50);
			if (error) throw error;
			return data;
		}
	});
	const save = async (e) => {
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
				explanation: explanation.trim() || null
			});
			if (error) throw error;
			toast.success("Question added");
			setQuestion("");
			setOptions([
				"",
				"",
				"",
				""
			]);
			setExplanation("");
			queryClient.invalidateQueries({ queryKey: ["admin-mcqs"] });
			queryClient.invalidateQueries({ queryKey: ["count", "mcq_questions"] });
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Could not save");
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-[380px_minmax(0,1fr)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: save,
			className: "rounded-2xl border border-border bg-card p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg font-bold",
				children: "Add MCQ"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-xs font-semibold",
							children: ["Class", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: classLevel,
								onChange: (e) => setClassLevel(e.target.value),
								className: fieldClass,
								children: classes.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: c,
									children: ["Class ", c]
								}, c))
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-xs font-semibold",
							children: ["Subject", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: subjectSlug,
								onChange: (e) => setSubjectSlug(e.target.value),
								className: fieldClass,
								children: subjects.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: s.slug,
									children: s.name
								}, s.slug))
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-xs font-semibold",
						children: ["Question", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: question,
							onChange: (e) => setQuestion(e.target.value),
							rows: 3,
							className: fieldClass
						})]
					}),
					options.map((o, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-xs font-semibold",
						children: [
							"Option ",
							i + 1,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: o,
									onChange: (e) => setOptions(options.map((v, idx) => idx === i ? e.target.value : v)),
									className: fieldClass
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setCorrect(i),
									className: `mt-1 shrink-0 rounded-full px-3 py-2 text-xs font-semibold ${correct === i ? "brand-gradient text-primary-foreground" : "border border-border text-muted-foreground"}`,
									children: "Correct"
								})]
							})
						]
					}, i)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-xs font-semibold",
						children: ["Explanation", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: explanation,
							onChange: (e) => setExplanation(e.target.value),
							rows: 2,
							className: fieldClass
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						disabled: busy,
						className: "inline-flex items-center justify-center gap-2 rounded-full brand-gradient px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-60",
						children: [busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), " Save question"]
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rounded-2xl border border-border bg-card p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg font-bold",
				children: "Question bank"
			}), list.data?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 space-y-2",
				children: list.data.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center justify-between gap-3 rounded-xl border border-border px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-sm font-medium",
							children: q.question
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								"Class ",
								q.class_level,
								" · ",
								q.subject_slug
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: async () => {
							await supabase.from("mcq_questions").delete().eq("id", q.id);
							list.refetch();
						},
						className: "shrink-0 text-muted-foreground transition-colors hover:text-destructive",
						"aria-label": "Delete question",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
					})]
				}, q.id))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-muted-foreground",
				children: "No questions added yet."
			})]
		})]
	});
}
function Blog() {
	const queryClient = useQueryClient();
	const [title, setTitle] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("Study Tips");
	const [excerpt, setExcerpt] = (0, import_react.useState)("");
	const [content, setContent] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const list = useQuery({
		queryKey: ["admin-posts"],
		queryFn: async () => {
			const { data, error } = await supabase.from("blog_posts").select("id,title,slug,is_published,category,created_at").order("created_at", { ascending: false });
			if (error) throw error;
			return data;
		}
	});
	const save = async (e) => {
		e.preventDefault();
		if (!title.trim()) {
			toast.error("Add a title");
			return;
		}
		setBusy(true);
		try {
			const slug = title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
			const { error } = await supabase.from("blog_posts").insert({
				title: title.trim(),
				slug,
				category,
				excerpt: excerpt.trim() || null,
				content: content.trim() || null,
				is_published: true,
				published_at: (/* @__PURE__ */ new Date()).toISOString()
			});
			if (error) throw error;
			toast.success("Post published");
			setTitle("");
			setExcerpt("");
			setContent("");
			queryClient.invalidateQueries({ queryKey: ["admin-posts"] });
			queryClient.invalidateQueries({ queryKey: ["count", "blog_posts"] });
			queryClient.invalidateQueries({ queryKey: ["public-posts"] });
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Could not publish");
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-[380px_minmax(0,1fr)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: save,
			className: "rounded-2xl border border-border bg-card p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg font-bold",
				children: "New blog post"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-xs font-semibold",
						children: ["Title", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: title,
							onChange: (e) => setTitle(e.target.value),
							maxLength: 140,
							className: fieldClass
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-xs font-semibold",
						children: ["Category", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: category,
							onChange: (e) => setCategory(e.target.value),
							className: fieldClass
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-xs font-semibold",
						children: ["Excerpt", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: excerpt,
							onChange: (e) => setExcerpt(e.target.value),
							rows: 2,
							className: fieldClass
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-xs font-semibold",
						children: ["Content", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: content,
							onChange: (e) => setContent(e.target.value),
							rows: 6,
							className: fieldClass
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						disabled: busy,
						className: "inline-flex items-center justify-center gap-2 rounded-full brand-gradient px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-60",
						children: [busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), " Publish post"]
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rounded-2xl border border-border bg-card p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg font-bold",
				children: "Posts"
			}), list.data?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 space-y-2",
				children: list.data.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center justify-between gap-3 rounded-xl border border-border px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-sm font-semibold",
							children: p.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								p.category,
								" · ",
								p.is_published ? "Published" : "Draft"
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: async () => {
							await supabase.from("blog_posts").delete().eq("id", p.id);
							list.refetch();
						},
						className: "shrink-0 text-muted-foreground transition-colors hover:text-destructive",
						"aria-label": "Delete post",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
					})]
				}, p.id))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-muted-foreground",
				children: "No posts yet."
			})]
		})]
	});
}
function Messages() {
	const list = useQuery({
		queryKey: ["admin-messages"],
		queryFn: async () => {
			const { data, error } = await supabase.from("contact_messages").select("id,name,email,subject,message,is_read,created_at").order("created_at", { ascending: false });
			if (error) throw error;
			return data;
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-2xl border border-border bg-card p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-lg font-bold",
			children: "Student messages"
		}), list.data?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-4 space-y-3",
			children: list.data.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "rounded-xl border border-border p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm font-semibold",
							children: [
								m.name,
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-normal text-muted-foreground",
									children: ["· ", m.email]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted-foreground",
							children: new Date(m.created_at).toLocaleDateString()
						})]
					}),
					m.subject && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs font-medium text-primary",
						children: m.subject
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 whitespace-pre-line text-sm text-muted-foreground",
						children: m.message
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: async () => {
							await supabase.from("contact_messages").delete().eq("id", m.id);
							list.refetch();
						},
						className: "mt-3 text-xs text-muted-foreground hover:text-destructive",
						children: "Delete"
					})
				]
			}, m.id))
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 text-sm text-muted-foreground",
			children: "No messages yet."
		})]
	});
}
//#endregion
export { AdminPage as component };
