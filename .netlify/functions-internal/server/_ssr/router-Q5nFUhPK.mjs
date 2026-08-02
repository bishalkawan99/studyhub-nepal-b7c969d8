import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, i as require_react, n as QueryClientProvider, r as useQueryClient } from "../_libs/react+tanstack__react-query.mjs";
import { E as LogOut, S as Menu, T as Mail, i as X, j as Instagram, k as LayoutDashboard, r as Youtube, tt as ArrowUp, u as Sun, x as Moon, z as Facebook } from "../_libs/lucide-react.mjs";
import { t as supabase } from "./client-D3rX22rO.mjs";
import { t as useAuth } from "./useAuth-D3TSxQ35.mjs";
import { c as subjects } from "./study-data-BfOlECnh.mjs";
import { _ as useNavigate, c as HeadContent, d as Outlet, f as lazyRouteComponent, h as Link, j as redirect, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { t as logo_default } from "./logo-BxC54cq3.mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
import { t as faqs } from "./gpa-calculator-DT_P8kXr.mjs";
import { t as Route$20 } from "./subject._classId._slug-IbbqKntf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-Q5nFUhPK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-CzmmJhGR.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	window.__lovableReportRuntimeError?.({
		message,
		stack: error instanceof Error ? error.stack : void 0,
		filename: window.location.pathname
	});
}
function ThemeToggle() {
	const [dark, setDark] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const stored = localStorage.getItem("studyhub-theme");
		const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
		const isDark = stored ? stored === "dark" : prefers;
		setDark(isDark);
		document.documentElement.classList.toggle("dark", isDark);
	}, []);
	function toggle() {
		const next = !dark;
		setDark(next);
		document.documentElement.classList.toggle("dark", next);
		localStorage.setItem("studyhub-theme", next ? "dark" : "light");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: toggle,
		"aria-label": "Toggle dark mode",
		className: "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-muted",
		children: dark ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "h-4 w-4" })
	});
}
var links = [
	{
		to: "/",
		label: "Home"
	},
	{
		to: "/notes",
		label: "Notes"
	},
	{
		to: "/exercise-answers",
		label: "Exercise Answers"
	},
	{
		to: "/question-bank",
		label: "Question Bank"
	},
	{
		to: "/mcqs",
		label: "MCQs"
	},
	{
		to: "/gpa-calculator",
		label: "GPA Calculator"
	},
	{
		to: "/model-questions",
		label: "Model Questions"
	},
	{
		to: "/past-papers",
		label: "Past Papers"
	},
	{
		to: "/blog",
		label: "Blog"
	},
	{
		to: "/about",
		label: "About"
	},
	{
		to: "/contact",
		label: "Contact"
	}
];
function Navbar() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const ref = (0, import_react.useRef)(null);
	const { user } = useAuth();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	async function signOut() {
		await queryClient.cancelQueries();
		queryClient.clear();
		await supabase.auth.signOut();
		toast.success("Signed out");
		navigate({
			to: "/auth",
			replace: true
		});
	}
	(0, import_react.useEffect)(() => {
		function onScroll() {
			setScrolled(window.scrollY > 8);
		}
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		ref,
		className: `sticky top-0 z-50 w-full transition-all ${scrolled ? "glass shadow-soft" : "border-b border-transparent bg-transparent"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: "mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 lg:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "flex min-w-0 shrink-0 items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: logo_default,
					alt: "StudyHub Nepal logo",
					width: 40,
					height: 40,
					className: "h-9 w-9 shrink-0"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "truncate whitespace-nowrap font-display text-lg font-extrabold",
					children: ["StudyHub ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "brand-gradient-text",
						children: "Nepal"
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "hidden items-center gap-1 xl:flex",
						children: links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: l.to,
							activeOptions: { exact: l.to === "/" },
							activeProps: { className: "text-primary" },
							className: "rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
							children: l.label
						}) }, l.to))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}),
					user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden items-center gap-2 sm:flex",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/dashboard",
							className: "inline-flex items-center gap-2 rounded-full brand-gradient px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-105",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutDashboard, { className: "h-4 w-4" }), " Dashboard"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => void signOut(),
							"aria-label": "Sign out",
							className: "inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" })
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/auth",
						className: "hidden rounded-full brand-gradient px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-105 sm:inline-flex",
						children: "Login"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "Toggle menu",
						onClick: () => setOpen((v) => !v),
						className: "inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card xl:hidden",
						children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-4 w-4" })
					})
				]
			})]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "glass border-t border-border xl:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mx-auto grid max-w-7xl gap-1 px-4 py-3",
				children: [[...links, ...user ? [{
					to: "/dashboard",
					label: "My dashboard"
				}] : [{
					to: "/auth",
					label: "Login"
				}]].map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: l.to,
					onClick: () => setOpen(false),
					className: "block rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
					children: l.label
				}) }, l.to)), user && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => {
						setOpen(false);
						signOut();
					},
					className: "block w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-muted-foreground hover:bg-muted",
					children: "Sign out"
				}) })]
			})
		})]
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "mt-24 border-t border-border bg-card/50",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: logo_default,
							alt: "StudyHub Nepal logo",
							loading: "lazy",
							width: 36,
							height: 36,
							className: "h-9 w-9"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-display text-lg font-extrabold",
							children: ["StudyHub ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "brand-gradient-text",
								children: "Nepal"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted-foreground",
						children: "Free notes, solutions and practice for Class 11 and Class 12 students across Nepal."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex gap-2",
						children: [
							Facebook,
							Instagram,
							Youtube,
							Mail
						].map((Icon, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#",
							"aria-label": "Social link",
							className: "inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
						}, i))
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-bold",
					children: "Quick Links"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-2 text-sm text-muted-foreground",
					children: [
						{
							to: "/notes",
							label: "Notes"
						},
						{
							to: "/mcqs",
							label: "MCQ Practice"
						},
						{
							to: "/past-papers",
							label: "Past Papers"
						},
						{
							to: "/blog",
							label: "Blog"
						},
						{
							to: "/contact",
							label: "Contact"
						}
					].map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: l.to,
						className: "transition-colors hover:text-primary",
						children: l.label
					}) }, l.to))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-bold",
					children: "Popular Subjects"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-2 text-sm text-muted-foreground",
					children: subjects.slice(0, 5).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/subject/$classId/$slug",
						params: {
							classId: "12",
							slug: s.slug
						},
						className: "transition-colors hover:text-primary",
						children: s.name
					}) }, s.slug))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-bold",
					children: "Legal"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-3 space-y-2 text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/privacy",
							className: "transition-colors hover:text-primary",
							children: "Privacy Policy"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/terms",
							className: "transition-colors hover:text-primary",
							children: "Terms of Use"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/about",
							className: "transition-colors hover:text-primary",
							children: "About Us"
						}) })
					]
				})] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-t border-border py-5 text-center text-xs text-muted-foreground",
			children: [
				"© ",
				(/* @__PURE__ */ new Date()).getFullYear(),
				" StudyHub Nepal. Made with care for Nepali students."
			]
		})]
	});
}
function ScrollProgress() {
	const [progress, setProgress] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		function onScroll() {
			const h = document.documentElement;
			const max = h.scrollHeight - h.clientHeight;
			setProgress(max > 0 ? h.scrollTop / max * 100 : 0);
		}
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-full brand-gradient transition-[width] duration-150",
			style: { width: `${progress}%` }
		})
	});
}
function BackToTop() {
	const [show, setShow] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		function onScroll() {
			setShow(window.scrollY > 500);
		}
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	if (!show) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-label": "Back to top",
		onClick: () => window.scrollTo({
			top: 0,
			behavior: "smooth"
		}),
		className: "fixed bottom-6 right-6 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full brand-gradient text-primary-foreground shadow-soft animate-fade-in",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "h-5 w-5" })
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$19 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "StudyHub Nepal — Class 11 & 12 Notes, MCQs & Past Papers" },
			{
				name: "description",
				content: "Free NEB Class 11 and Class 12 notes, exercise solutions, MCQ practice, model questions and past papers for Nepali students."
			},
			{
				name: "author",
				content: "StudyHub Nepal"
			},
			{
				property: "og:title",
				content: "StudyHub Nepal — Study Smarter, Score Higher"
			},
			{
				property: "og:description",
				content: "Notes, solutions, MCQs and past papers for Class 11 & 12 students in Nepal."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Manrope:wght@400;500;600;700&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.png",
				type: "image/png"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$19.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollProgress, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackToTop, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {})
		]
	});
}
var $$splitComponentImporter$16 = () => import("./routes-B3LORJYj.mjs");
var Route$18 = createFileRoute("/")({
	head: () => ({
		meta: [
			{ title: "StudyHub Nepal — Class 11 & 12 Notes, MCQs & Past Papers" },
			{
				name: "description",
				content: "Study smarter, score higher. NEB Class 11 & 12 notes, exercise solutions, MCQ practice, model questions and past papers in one place."
			},
			{
				property: "og:title",
				content: "StudyHub Nepal — Study Smarter, Score Higher"
			},
			{
				property: "og:description",
				content: "Everything Class 11 & 12 students in Nepal need: notes, solutions, MCQs and past papers."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:url",
				content: "/"
			},
			{
				property: "og:site_name",
				content: "StudyHub Nepal"
			},
			{
				name: "twitter:card",
				content: "summary"
			}
		],
		links: [{
			rel: "canonical",
			href: "/"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./route-Di7iQBCH.mjs");
var Route$17 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async ({ location }) => {
		const { data, error } = await supabase.auth.getUser();
		if (error || !data.user) throw redirect({
			to: "/auth",
			search: { redirect: location.href }
		});
		return { user: data.user };
	},
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./about-DS8sgBi8.mjs");
var Route$16 = createFileRoute("/about")({
	head: () => ({
		meta: [
			{ title: "About StudyHub Nepal — Free NEB Study Resources" },
			{
				name: "description",
				content: "StudyHub Nepal gives Class 11 and 12 students across Nepal free, well-organised study material."
			},
			{
				property: "og:title",
				content: "About StudyHub Nepal"
			},
			{
				property: "og:description",
				content: "Our mission: quality study resources for every Nepali student."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:url",
				content: "/about"
			},
			{
				property: "og:site_name",
				content: "StudyHub Nepal"
			},
			{
				name: "twitter:card",
				content: "summary"
			}
		],
		links: [{
			rel: "canonical",
			href: "/about"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./auth-CVwfd7WI.mjs");
var searchSchema = objectType({ redirect: stringType().optional() });
var Route$15 = createFileRoute("/auth")({
	validateSearch: searchSchema,
	head: () => ({
		meta: [
			{ title: "Sign in or create an account — StudyHub Nepal" },
			{
				name: "description",
				content: "Sign in to StudyHub Nepal to bookmark chapters, save MCQ results and track your NEB study progress."
			},
			{
				property: "og:title",
				content: "Sign in — StudyHub Nepal"
			},
			{
				property: "og:description",
				content: "Free student accounts for Class 11 and 12 notes, MCQs and past papers."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:url",
				content: "/auth"
			},
			{
				property: "og:site_name",
				content: "StudyHub Nepal"
			},
			{
				name: "twitter:card",
				content: "summary"
			}
		],
		links: [{
			rel: "canonical",
			href: "/auth"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./blog-ChSk-XG_.mjs");
var Route$14 = createFileRoute("/blog")({
	head: () => ({
		meta: [
			{ title: "Study Blog — Tips, Exams & Careers | StudyHub Nepal" },
			{
				name: "description",
				content: "Study tips, exam preparation plans, career guidance, scholarships and admission news for Nepali students."
			},
			{
				property: "og:title",
				content: "Study Blog — StudyHub Nepal"
			},
			{
				property: "og:description",
				content: "Articles on study tips, exams, careers and scholarships in Nepal."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:url",
				content: "/blog"
			},
			{
				property: "og:site_name",
				content: "StudyHub Nepal"
			},
			{
				name: "twitter:card",
				content: "summary"
			}
		],
		links: [{
			rel: "canonical",
			href: "/blog"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./contact-CGz06Jj7.mjs");
var Route$13 = createFileRoute("/contact")({
	head: () => ({
		meta: [
			{ title: "Contact StudyHub Nepal — Ask, Suggest, Report" },
			{
				name: "description",
				content: "Get in touch with StudyHub Nepal for study material requests, corrections or partnerships."
			},
			{
				property: "og:title",
				content: "Contact StudyHub Nepal"
			},
			{
				property: "og:description",
				content: "Questions, suggestions or corrections? Send us a message."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:url",
				content: "/contact"
			},
			{
				property: "og:site_name",
				content: "StudyHub Nepal"
			},
			{
				name: "twitter:card",
				content: "summary"
			}
		],
		links: [{
			rel: "canonical",
			href: "/contact"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./exercise-answers-QuRIJvhM.mjs");
var Route$12 = createFileRoute("/exercise-answers")({
	head: () => ({
		meta: [
			{ title: "Exercise Answers & Solutions — StudyHub Nepal" },
			{
				name: "description",
				content: "Step-by-step textbook exercise answers with explanations for Class 11 and 12 subjects."
			},
			{
				property: "og:title",
				content: "Exercise Answers & Solutions — StudyHub Nepal"
			},
			{
				property: "og:description",
				content: "Every textbook exercise solved with clear explanations."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:url",
				content: "/exercise-answers"
			},
			{
				property: "og:site_name",
				content: "StudyHub Nepal"
			},
			{
				name: "twitter:card",
				content: "summary"
			}
		],
		links: [{
			rel: "canonical",
			href: "/exercise-answers"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
/**
* Shared SEO helpers so every route ships a unique title, description,
* canonical URL, Open Graph + Twitter Card metadata and structured data.
* Paths stay relative — crawlers resolve them against the live host.
*/
var SITE_NAME = "StudyHub Nepal";
function seoMeta({ path, title, description, type = "website", image }) {
	const meta = [
		{ title },
		{
			name: "description",
			content: description
		},
		{
			property: "og:title",
			content: title
		},
		{
			property: "og:description",
			content: description
		},
		{
			property: "og:type",
			content: type
		},
		{
			property: "og:url",
			content: path
		},
		{
			property: "og:site_name",
			content: SITE_NAME
		},
		{
			name: "twitter:card",
			content: image ? "summary_large_image" : "summary"
		},
		{
			name: "twitter:title",
			content: title
		},
		{
			name: "twitter:description",
			content: description
		}
	];
	if (image) {
		meta.push({
			property: "og:image",
			content: image
		});
		meta.push({
			name: "twitter:image",
			content: image
		});
	}
	return meta;
}
function canonical(path) {
	return [{
		rel: "canonical",
		href: path
	}];
}
function jsonLd(data) {
	return {
		type: "application/ld+json",
		children: JSON.stringify(data)
	};
}
function breadcrumbSchema(items) {
	return jsonLd({
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: item.name,
			item: item.path
		}))
	});
}
function faqSchema(faqs) {
	return jsonLd({
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: faqs.map((f) => ({
			"@type": "Question",
			name: f.question,
			acceptedAnswer: {
				"@type": "Answer",
				text: f.answer
			}
		}))
	});
}
var $$splitComponentImporter$9 = () => import("./gpa-calculator-CiA9z_XH.mjs");
var TITLE = "NEB GPA Calculator for Class 11 & Class 12 | Science & Management | StudyHub Nepal";
var DESCRIPTION = "Calculate your Class 11 and Class 12 NEB GPA instantly using Nepal's grading system. Supports Science and Management faculties with theory and practical marks.";
var Route$11 = createFileRoute("/gpa-calculator")({
	head: () => ({
		meta: [...seoMeta({
			path: "/gpa-calculator",
			title: TITLE,
			description: DESCRIPTION
		}), {
			name: "keywords",
			content: "NEB GPA Calculator, Class 11 GPA Calculator Nepal, Class 12 GPA Calculator Nepal, Science GPA Calculator Nepal, Management GPA Calculator Nepal, Nepal GPA Calculator, StudyHub Nepal GPA Calculator"
		}],
		links: canonical("/gpa-calculator"),
		scripts: [faqSchema(faqs), breadcrumbSchema([
			{
				name: "Home",
				path: "/"
			},
			{
				name: "Tools",
				path: "/gpa-calculator"
			},
			{
				name: "NEB GPA Calculator",
				path: "/gpa-calculator"
			}
		])]
	}),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var Route$10 = createFileRoute("/login")({ beforeLoad: () => {
	throw redirect({ to: "/auth" });
} });
var $$splitComponentImporter$8 = () => import("./mcqs-BtzRYluD.mjs");
var Route$9 = createFileRoute("/mcqs")({
	head: () => ({
		meta: [
			{ title: "MCQ Practice with Timer — StudyHub Nepal" },
			{
				name: "description",
				content: "Timed MCQ practice for NEB Class 11 and 12 with instant results, explanations and leaderboard."
			},
			{
				property: "og:title",
				content: "MCQ Practice with Timer — StudyHub Nepal"
			},
			{
				property: "og:description",
				content: "Attempt quizzes, see your score instantly and review answers."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:url",
				content: "/mcqs"
			},
			{
				property: "og:site_name",
				content: "StudyHub Nepal"
			},
			{
				name: "twitter:card",
				content: "summary"
			}
		],
		links: [{
			rel: "canonical",
			href: "/mcqs"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./model-questions-D8O7_rME.mjs");
var Route$8 = createFileRoute("/model-questions")({
	head: () => ({
		meta: [
			{ title: "Model Questions — StudyHub Nepal" },
			{
				name: "description",
				content: "NEB-pattern model question sets for Class 11 and Class 12 with answer keys."
			},
			{
				property: "og:title",
				content: "Model Questions — StudyHub Nepal"
			},
			{
				property: "og:description",
				content: "Practise with model sets that match the real NEB paper."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:url",
				content: "/model-questions"
			},
			{
				property: "og:site_name",
				content: "StudyHub Nepal"
			},
			{
				name: "twitter:card",
				content: "summary"
			}
		],
		links: [{
			rel: "canonical",
			href: "/model-questions"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./notes-B8tRdtUC.mjs");
var Route$7 = createFileRoute("/notes")({
	head: () => ({
		meta: [
			{ title: "Class 11 & 12 Notes — StudyHub Nepal" },
			{
				name: "description",
				content: "Download NEB Class 11 and Class 12 chapter notes for every subject, free of cost."
			},
			{
				property: "og:title",
				content: "Class 11 & 12 Notes — StudyHub Nepal"
			},
			{
				property: "og:description",
				content: "Syllabus-aligned chapter notes for all NEB subjects."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:url",
				content: "/notes"
			},
			{
				property: "og:site_name",
				content: "StudyHub Nepal"
			},
			{
				name: "twitter:card",
				content: "summary"
			}
		],
		links: [{
			rel: "canonical",
			href: "/notes"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./past-papers-CtX-IadB.mjs");
var Route$6 = createFileRoute("/past-papers")({
	head: () => ({
		meta: [
			{ title: "Past Papers by Year — StudyHub Nepal" },
			{
				name: "description",
				content: "Year-wise NEB board past question papers for Class 11 and Class 12, free to download."
			},
			{
				property: "og:title",
				content: "Past Papers by Year — StudyHub Nepal"
			},
			{
				property: "og:description",
				content: "Board question papers organised by class, subject and year."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:url",
				content: "/past-papers"
			},
			{
				property: "og:site_name",
				content: "StudyHub Nepal"
			},
			{
				name: "twitter:card",
				content: "summary"
			}
		],
		links: [{
			rel: "canonical",
			href: "/past-papers"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./privacy-BxDXFFVv.mjs");
var Route$5 = createFileRoute("/privacy")({
	head: () => ({
		meta: [
			{ title: "Privacy Policy — StudyHub Nepal" },
			{
				name: "description",
				content: "How StudyHub Nepal collects, uses and protects student data."
			},
			{
				property: "og:title",
				content: "Privacy Policy — StudyHub Nepal"
			},
			{
				property: "og:description",
				content: "Our approach to student data and privacy."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:url",
				content: "/privacy"
			},
			{
				property: "og:site_name",
				content: "StudyHub Nepal"
			},
			{
				name: "twitter:card",
				content: "summary"
			}
		],
		links: [{
			rel: "canonical",
			href: "/privacy"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./question-bank-B4aYpU8S.mjs");
var Route$4 = createFileRoute("/question-bank")({
	head: () => ({
		meta: [
			{ title: "Question Bank — StudyHub Nepal" },
			{
				name: "description",
				content: "Important questions collected chapter-wise for NEB Class 11 and Class 12 exams."
			},
			{
				property: "og:title",
				content: "Question Bank — StudyHub Nepal"
			},
			{
				property: "og:description",
				content: "Chapter-wise important questions for board exam revision."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:url",
				content: "/question-bank"
			},
			{
				property: "og:site_name",
				content: "StudyHub Nepal"
			},
			{
				name: "twitter:card",
				content: "summary"
			}
		],
		links: [{
			rel: "canonical",
			href: "/question-bank"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var BASE_URL = "";
var paths = [
	"/",
	"/notes",
	"/exercise-answers",
	"/question-bank",
	"/mcqs",
	"/model-questions",
	"/past-papers",
	"/gpa-calculator",
	"/blog",
	"/about",
	"/contact",
	"/privacy",
	"/terms"
];
var subjectSlugs = [
	"nepali",
	"english",
	"mathematics",
	"physics",
	"chemistry",
	"biology",
	"computer-science",
	"accountancy",
	"economics",
	"business-studies"
];
var Route$3 = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: () => {
	const xml = [
		`<?xml version="1.0" encoding="UTF-8"?>`,
		`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
		...[...paths.map((path) => ({
			path,
			priority: path === "/" ? "1.0" : "0.8"
		})), ...["11", "12"].flatMap((classId) => subjectSlugs.map((slug) => ({
			path: `/subject/${classId}/${slug}`,
			priority: "0.6"
		})))].map((e) => [
			`  <url>`,
			`    <loc>${BASE_URL}${e.path}</loc>`,
			`    <changefreq>weekly</changefreq>`,
			`    <priority>${e.priority}</priority>`,
			`  </url>`
		].join("\n")),
		`</urlset>`
	].join("\n");
	return new Response(xml, { headers: {
		"Content-Type": "application/xml",
		"Cache-Control": "public, max-age=3600"
	} });
} } } });
var $$splitComponentImporter$2 = () => import("./terms-BTkRUFmI.mjs");
var Route$2 = createFileRoute("/terms")({
	head: () => ({
		meta: [
			{ title: "Terms of Use — StudyHub Nepal" },
			{
				name: "description",
				content: "Terms and conditions for using StudyHub Nepal study resources."
			},
			{
				property: "og:title",
				content: "Terms of Use — StudyHub Nepal"
			},
			{
				property: "og:description",
				content: "The rules for using our free study resources."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:url",
				content: "/terms"
			},
			{
				property: "og:site_name",
				content: "StudyHub Nepal"
			},
			{
				name: "twitter:card",
				content: "summary"
			}
		],
		links: [{
			rel: "canonical",
			href: "/terms"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./admin-D2C-S5Gl.mjs");
var Route$1 = createFileRoute("/_authenticated/admin")({
	head: () => ({ meta: [
		{ title: "Admin dashboard — StudyHub Nepal" },
		{
			name: "description",
			content: "Manage notes, PDFs, MCQs, blog posts and messages."
		},
		{
			property: "og:title",
			content: "Admin dashboard — StudyHub Nepal"
		},
		{
			property: "og:description",
			content: "Content management for StudyHub Nepal."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./dashboard-CkT9Pi3h.mjs");
var Route = createFileRoute("/_authenticated/dashboard")({
	head: () => ({ meta: [
		{ title: "My dashboard — StudyHub Nepal" },
		{
			name: "description",
			content: "Your saved chapters, MCQ scores and study profile on StudyHub Nepal."
		},
		{
			property: "og:title",
			content: "My dashboard — StudyHub Nepal"
		},
		{
			property: "og:description",
			content: "Bookmarks, quiz history and profile settings."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$18.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$19
});
var AuthenticatedRouteRoute = Route$17.update({
	id: "/_authenticated",
	getParentRoute: () => Route$19
});
var AboutRoute = Route$16.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$19
});
var AuthRoute = Route$15.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$19
});
var BlogRoute = Route$14.update({
	id: "/blog",
	path: "/blog",
	getParentRoute: () => Route$19
});
var ContactRoute = Route$13.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$19
});
var ExerciseAnswersRoute = Route$12.update({
	id: "/exercise-answers",
	path: "/exercise-answers",
	getParentRoute: () => Route$19
});
var GpaCalculatorRoute = Route$11.update({
	id: "/gpa-calculator",
	path: "/gpa-calculator",
	getParentRoute: () => Route$19
});
var LoginRoute = Route$10.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$19
});
var McqsRoute = Route$9.update({
	id: "/mcqs",
	path: "/mcqs",
	getParentRoute: () => Route$19
});
var ModelQuestionsRoute = Route$8.update({
	id: "/model-questions",
	path: "/model-questions",
	getParentRoute: () => Route$19
});
var NotesRoute = Route$7.update({
	id: "/notes",
	path: "/notes",
	getParentRoute: () => Route$19
});
var PastPapersRoute = Route$6.update({
	id: "/past-papers",
	path: "/past-papers",
	getParentRoute: () => Route$19
});
var PrivacyRoute = Route$5.update({
	id: "/privacy",
	path: "/privacy",
	getParentRoute: () => Route$19
});
var QuestionBankRoute = Route$4.update({
	id: "/question-bank",
	path: "/question-bank",
	getParentRoute: () => Route$19
});
var SitemapDotxmlRoute = Route$3.update({
	id: "/sitemap.xml",
	path: "/sitemap.xml",
	getParentRoute: () => Route$19
});
var TermsRoute = Route$2.update({
	id: "/terms",
	path: "/terms",
	getParentRoute: () => Route$19
});
var AuthenticatedAdminRoute = Route$1.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedDashboardRoute = Route.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => AuthenticatedRouteRoute
});
var SubjectClassIdSlugRoute = Route$20.update({
	id: "/subject/$classId/$slug",
	path: "/subject/$classId/$slug",
	getParentRoute: () => Route$19
});
var AuthenticatedRouteRouteChildren = {
	AuthenticatedAdminRoute,
	AuthenticatedDashboardRoute
};
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren),
	AboutRoute,
	AuthRoute,
	BlogRoute,
	ContactRoute,
	ExerciseAnswersRoute,
	GpaCalculatorRoute,
	LoginRoute,
	McqsRoute,
	ModelQuestionsRoute,
	NotesRoute,
	PastPapersRoute,
	PrivacyRoute,
	QuestionBankRoute,
	SitemapDotxmlRoute,
	TermsRoute,
	SubjectClassIdSlugRoute
};
var routeTree = Route$19._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
