import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, i as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { C as Maximize2, I as FileText, Q as Bookmark, V as Download, m as Share2, n as ZoomIn, t as ZoomOut, v as Printer } from "../_libs/lucide-react.mjs";
import { t as supabase } from "./client-D3rX22rO.mjs";
import { t as useAuth } from "./useAuth-D3TSxQ35.mjs";
import { c as subjects } from "./study-data-BfOlECnh.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Route } from "./subject._classId._slug-IbbqKntf.mjs";
import { t as SubjectIcon } from "./SubjectIcon-0PhZIpvc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/subject._classId._slug-CHjxlVv-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var tabs = [
	"Notes",
	"Exercise Answers",
	"Important Questions",
	"MCQs",
	"Past Questions",
	"Model Questions"
];
function SubjectPage() {
	const { subject, classId } = Route.useLoaderData();
	const { user } = useAuth();
	const [tab, setTab] = (0, import_react.useState)(tabs[0]);
	const [chapter, setChapter] = (0, import_react.useState)(0);
	const [zoom, setZoom] = (0, import_react.useState)(100);
	const [bookmarked, setBookmarked] = (0, import_react.useState)(false);
	const [progress, setProgress] = (0, import_react.useState)(0);
	const href = `/subject/${classId}/${subject.slug}`;
	const label = `Class ${classId} ${subject.name}`;
	(0, import_react.useEffect)(() => {
		function onScroll() {
			const h = document.documentElement;
			const max = h.scrollHeight - h.clientHeight;
			setProgress(max > 0 ? Math.round(h.scrollTop / max * 100) : 0);
		}
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!user) {
			setBookmarked(false);
			return;
		}
		let active = true;
		supabase.from("bookmarks").select("id").eq("href", href).maybeSingle().then(({ data }) => {
			if (active) setBookmarked(Boolean(data));
		});
		return () => {
			active = false;
		};
	}, [user, href]);
	async function toggleBookmark() {
		if (!user) {
			toast.info("Sign in to save this chapter to your dashboard.");
			return;
		}
		if (bookmarked) {
			const { error } = await supabase.from("bookmarks").delete().eq("href", href);
			if (error) {
				toast.error("Could not remove bookmark");
				return;
			}
			setBookmarked(false);
			toast.success("Bookmark removed");
			return;
		}
		const { error } = await supabase.from("bookmarks").insert({
			user_id: user.id,
			href,
			label
		});
		if (error) {
			toast.error("Could not save bookmark");
			return;
		}
		setBookmarked(true);
		toast.success("Bookmarked for later");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "hero-surface",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-7xl px-4 pt-12 lg:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "text-xs text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "hover:text-primary",
							children: "Home"
						}),
						" ",
						"/",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/notes",
							className: "hover:text-primary",
							children: "Notes"
						}),
						" ",
						"/ Class ",
						classId,
						" / ",
						subject.name
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "mt-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:flex-wrap sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-0 items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubjectIcon, {
								slug: subject.slug,
								className: "h-6 w-6"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "truncate font-display text-2xl font-extrabold sm:text-3xl",
								children: [
									"Class ",
									classId,
									" ",
									subject.name
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted-foreground",
								children: [subject.chapters.length, " chapters · NEB syllabus"]
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex shrink-0 gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => void toggleBookmark(),
							className: `inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border ${bookmarked ? "bg-accent/15 text-accent" : "bg-card text-muted-foreground"}`,
							"aria-label": "Bookmark",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "h-4 w-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								navigator.clipboard?.writeText(window.location.href);
								toast.success("Link copied to clipboard");
							},
							className: "inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground",
							"aria-label": "Share",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "h-4 w-4" })
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Reading progress" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [progress, "%"] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 h-2 overflow-hidden rounded-full bg-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full brand-gradient transition-all",
							style: { width: `${progress}%` }
						})
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "h-max rounded-2xl border border-border bg-card p-4 lg:sticky lg:top-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "px-2 text-sm font-bold",
					children: "Chapters"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-1",
					children: subject.chapters.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setChapter(i),
						className: `w-full rounded-xl px-3 py-2 text-left text-sm transition-colors ${chapter === i ? "bg-primary/10 font-semibold text-primary" : "text-muted-foreground hover:bg-muted"}`,
						children: [
							i + 1,
							". ",
							c
						]
					}) }, c))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: tabs.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setTab(t),
						className: `rounded-full px-4 py-2 text-xs font-semibold transition-colors ${tab === t ? "brand-gradient text-primary-foreground" : "border border-border bg-card text-muted-foreground hover:text-foreground"}`,
						children: t
					}, t))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "mt-6 rounded-3xl border border-border bg-card p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "font-display text-xl font-extrabold",
							children: [
								"Chapter ",
								chapter + 1,
								": ",
								subject.chapters[chapter]
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: [
								tab,
								" for Class ",
								classId,
								" ",
								subject.name,
								". Read online or download the PDF for offline revision."
							]
						}),
						tab === "Exercise Answers" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 space-y-4",
							children: [
								1,
								2,
								3
							].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
								open: n === 1,
								className: "rounded-2xl border border-border p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
									className: "cursor-pointer text-sm font-semibold",
									children: [
										"Q",
										n,
										". Sample exercise question from ",
										subject.chapters[chapter]
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 space-y-3 text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-primary",
											children: "Answer:"
										}), " A complete, exam-ready answer written in the NEB marking style."] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-muted-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold text-accent",
												children: "Explanation:"
											}), " Each step is broken down so you understand the reasoning, not just the result."]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											className: "inline-flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-xs font-semibold text-muted-foreground hover:text-primary",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" }), " Download PDF"]
										})
									]
								})]
							}, n))
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2 rounded-2xl border border-border bg-muted/40 p-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-muted-foreground hover:text-primary",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" }), " Download"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => window.print(),
										className: "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-muted-foreground hover:text-primary",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "h-4 w-4" }), " Print"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-muted-foreground hover:text-primary",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize2, { className: "h-4 w-4" }), " Fullscreen"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "ml-auto flex items-center gap-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => setZoom((z) => Math.max(60, z - 10)),
												className: "rounded-lg p-2 text-muted-foreground hover:text-primary",
												"aria-label": "Zoom out",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomOut, { className: "h-4 w-4" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-xs text-muted-foreground",
												children: [zoom, "%"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => setZoom((z) => Math.min(200, z + 10)),
												className: "rounded-lg p-2 text-muted-foreground hover:text-primary",
												"aria-label": "Zoom in",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomIn, { className: "h-4 w-4" })
											})
										]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 grid min-h-[420px] place-items-center rounded-2xl border border-dashed border-border bg-background p-8 text-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: { transform: `scale(${zoom / 100})` },
									className: "transition-transform",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "mx-auto h-10 w-10 text-primary" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-3 text-sm font-semibold",
											children: [
												subject.name,
												" — ",
												tab,
												" (Chapter ",
												chapter + 1,
												")"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-xs text-muted-foreground",
											children: "The PDF appears here once an admin uploads it."
										})
									]
								})
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 rounded-3xl border border-border bg-card p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "text-sm font-bold",
						children: ["Other subjects in Class ", classId]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex flex-wrap gap-2",
						children: subjects.filter((s) => s.slug !== subject.slug).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/subject/$classId/$slug",
							params: {
								classId,
								slug: s.slug
							},
							className: "rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubjectIcon, {
										slug: s.slug,
										className: "h-3.5 w-3.5"
									}),
									" ",
									s.name
								]
							})
						}, s.slug))
					})]
				})
			] })]
		})]
	});
}
//#endregion
export { SubjectPage as component };
