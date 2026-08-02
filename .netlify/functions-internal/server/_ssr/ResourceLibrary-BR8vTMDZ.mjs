import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, i as require_react, t as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { B as Eye, I as FileText, V as Download } from "../_libs/lucide-react.mjs";
import { t as supabase } from "./client-D3rX22rO.mjs";
import { c as subjects, n as buildResources, r as classes } from "./study-data-BfOlECnh.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as SearchBar } from "./SearchBar-B90v3azH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ResourceLibrary-BR8vTMDZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ResourceLibrary({ title, subtitle, kind }) {
	const [activeClass, setActiveClass] = (0, import_react.useState)("11");
	const [activeSubject, setActiveSubject] = (0, import_react.useState)("all");
	const all = (0, import_react.useMemo)(() => buildResources(kind), [kind]);
	const uploaded = useQuery({
		queryKey: [
			"materials",
			kind,
			activeClass
		],
		queryFn: async () => {
			const { data, error } = await supabase.from("materials").select("id,title,description,chapter,subject_slug,file_path").eq("resource_type", kind).eq("class_level", activeClass).eq("is_published", true).order("created_at", { ascending: false });
			if (error) throw error;
			return data;
		}
	});
	const openFile = async (path) => {
		if (!path) {
			toast.info("This material has no file attached yet.");
			return;
		}
		const { data, error } = await supabase.storage.from("study-materials").createSignedUrl(path, 600);
		if (error || !data) {
			toast.error("Sign in to open this PDF.");
			return;
		}
		window.open(data.signedUrl, "_blank", "noopener");
	};
	const uploadedList = (uploaded.data ?? []).filter((m) => activeSubject === "all" || subjects.find((s) => s.slug === m.subject_slug)?.name === activeSubject);
	const filtered = all.filter((r) => r.classId === activeClass && (activeSubject === "all" || r.subject === activeSubject));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "hero-surface",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-7xl px-4 pb-8 pt-14 lg:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "max-w-3xl font-display text-4xl font-extrabold sm:text-5xl",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-2xl text-muted-foreground",
					children: subtitle
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-7",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchBar, {})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-7xl px-4 lg:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						classes.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setActiveClass(c),
							className: `rounded-full px-4 py-2 text-sm font-semibold transition-colors ${activeClass === c ? "brand-gradient text-primary-foreground" : "border border-border bg-card text-muted-foreground hover:text-foreground"}`,
							children: ["Class ", c]
						}, c)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mx-1 hidden h-6 w-px bg-border sm:block" }),
						["all", ...subjects.map((s) => s.name)].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setActiveSubject(s),
							className: `rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${activeSubject === s ? "bg-primary/10 text-primary" : "border border-border bg-card text-muted-foreground hover:text-foreground"}`,
							children: s === "all" ? "All subjects" : s
						}, s))
					]
				}),
				uploadedList.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-bold",
						children: "Latest uploads"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
						children: uploadedList.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "lift rounded-2xl border border-primary/30 bg-card p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-5 w-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-4 text-sm font-bold",
									children: m.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-xs text-muted-foreground",
									children: [subjects.find((s) => s.slug === m.subject_slug)?.name ?? m.subject_slug, m.chapter ? ` · ${m.chapter}` : ""]
								}),
								m.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 line-clamp-3 text-sm text-muted-foreground",
									children: m.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => void openFile(m.file_path),
									className: "mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl brand-gradient px-3 py-2 text-xs font-semibold text-primary-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" }), " Open PDF"]
								})
							]
						}, m.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
					children: filtered.map((r) => {
						const slug = subjects.find((s) => s.name === r.subject).slug;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "lift rounded-2xl border border-border bg-card p-6 animate-fade-up",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-5 w-5" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "truncate text-sm font-bold",
											children: r.subject
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs text-muted-foreground",
											children: [
												"Class ",
												r.classId,
												" · ",
												kind
											]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 text-sm text-muted-foreground",
									children: r.meta
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-5 flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/subject/$classId/$slug",
										params: {
											classId: r.classId,
											slug
										},
										className: "inline-flex flex-1 items-center justify-center gap-2 rounded-xl brand-gradient px-3 py-2 text-xs font-semibold text-primary-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" }), " View"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: "inline-flex items-center justify-center gap-2 rounded-xl border border-border px-3 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-primary",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" }), " PDF"]
									})]
								})
							]
						}, r.title);
					})
				})
			]
		})]
	});
}
//#endregion
export { ResourceLibrary as t };
