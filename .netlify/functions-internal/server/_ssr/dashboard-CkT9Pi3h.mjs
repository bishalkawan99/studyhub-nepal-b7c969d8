import { a as require_jsx_runtime, r as useQueryClient, t as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { E as LogOut, Q as Bookmark, d as Sparkles, f as ShieldCheck, o as UserRound, s as Trophy } from "../_libs/lucide-react.mjs";
import { t as supabase } from "./client-D3rX22rO.mjs";
import { t as useAuth } from "./useAuth-D3TSxQ35.mjs";
import { _ as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-CkT9Pi3h.js
var import_jsx_runtime = require_jsx_runtime();
function Dashboard() {
	const { user, isAdmin } = useAuth();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const bookmarks = useQuery({
		queryKey: ["bookmarks", user?.id],
		enabled: Boolean(user),
		queryFn: async () => {
			const { data, error } = await supabase.from("bookmarks").select("id,label,href,created_at").order("created_at", { ascending: false });
			if (error) throw error;
			return data;
		}
	});
	const attempts = useQuery({
		queryKey: ["quiz_attempts", user?.id],
		enabled: Boolean(user),
		queryFn: async () => {
			const { data, error } = await supabase.from("quiz_attempts").select("id,score,total,class_level,subject_slug,created_at").order("created_at", { ascending: false }).limit(10);
			if (error) throw error;
			return data;
		}
	});
	const best = (attempts.data ?? []).reduce((acc, a) => Math.max(acc, Math.round(a.score / Math.max(a.total, 1) * 100)), 0);
	const signOut = async () => {
		await queryClient.cancelQueries();
		queryClient.clear();
		await supabase.auth.signOut();
		toast.success("Signed out");
		navigate({
			to: "/auth",
			replace: true
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "hero-surface min-h-screen",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-7xl px-4 pb-16 pt-14 lg:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:flex-wrap sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-0 items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { className: "h-6 w-6" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "truncate font-display text-2xl font-extrabold sm:text-3xl",
								children: user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Student"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm text-muted-foreground",
								children: user?.email
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex shrink-0 items-center gap-2",
						children: [isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/admin",
							className: "inline-flex items-center gap-2 rounded-full brand-gradient px-4 py-2 text-xs font-semibold text-primary-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4" }), " Admin"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: signOut,
							className: "inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), " Sign out"]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid gap-4 sm:grid-cols-3",
					children: [
						{
							label: "Saved chapters",
							value: bookmarks.data?.length ?? 0,
							icon: Bookmark
						},
						{
							label: "Quizzes taken",
							value: attempts.data?.length ?? 0,
							icon: Sparkles
						},
						{
							label: "Best score",
							value: `${best}%`,
							icon: Trophy
						}
					].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
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
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 grid gap-6 lg:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-2xl border border-border bg-card p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg font-bold",
							children: "Bookmarked chapters"
						}), bookmarks.data?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 space-y-2",
							children: bookmarks.data.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center justify-between gap-3 rounded-xl border border-border px-4 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: b.href,
									className: "min-w-0 truncate text-sm font-medium hover:text-primary",
									children: b.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: async () => {
										await supabase.from("bookmarks").delete().eq("id", b.id);
										bookmarks.refetch();
									},
									className: "shrink-0 text-xs text-muted-foreground hover:text-destructive",
									children: "Remove"
								})]
							}, b.id))
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm text-muted-foreground",
							children: "Nothing saved yet — open any subject and tap the bookmark icon."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-2xl border border-border bg-card p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg font-bold",
							children: "Recent MCQ attempts"
						}), attempts.data?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 space-y-2",
							children: attempts.data.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "min-w-0 truncate",
									children: a.subject_slug ? `${a.subject_slug} · Class ${a.class_level}` : "Mixed practice"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "shrink-0 font-semibold text-primary",
									children: [
										a.score,
										"/",
										a.total
									]
								})]
							}, a.id))
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 text-sm text-muted-foreground",
							children: [
								"No attempts yet.",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/mcqs",
									className: "text-primary hover:underline",
									children: "Start a practice quiz"
								}),
								"."
							]
						})]
					})]
				})
			]
		})
	});
}
//#endregion
export { Dashboard as component };
