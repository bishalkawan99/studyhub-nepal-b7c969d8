import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, i as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { D as LoaderCircle } from "../_libs/lucide-react.mjs";
import { t as supabase } from "./client-D3rX22rO.mjs";
import { _ as useNavigate, h as Link, v as useSearch } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as logo_default } from "./logo-BxC54cq3.mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-CVwfd7WI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var credentials = objectType({
	email: stringType().trim().email("Enter a valid email address").max(255),
	password: stringType().min(6, "Password must be at least 6 characters").max(72),
	fullName: stringType().trim().max(80).optional()
});
function AuthPage() {
	const navigate = useNavigate();
	const search = useSearch({ from: "/auth" });
	const [mode, setMode] = (0, import_react.useState)("signin");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [fullName, setFullName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const destination = search.redirect?.startsWith("/") ? search.redirect : "/dashboard";
	const getRedirectTo = () => {
		if (typeof window === "undefined") return;
		return `${window.location.origin}/auth?redirect=${encodeURIComponent(destination)}`;
	};
	(0, import_react.useEffect)(() => {
		let active = true;
		const restoreSession = async () => {
			const { data: sessionData } = await supabase.auth.getSession();
			if (!active) return;
			if (sessionData.session?.user) navigate({
				to: destination,
				replace: true
			});
		};
		restoreSession();
		const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
			if (active && session?.user) navigate({
				to: destination,
				replace: true
			});
		});
		return () => {
			active = false;
			authListener.subscription.unsubscribe();
		};
	}, [destination, navigate]);
	const submit = async (e) => {
		e.preventDefault();
		const parsed = credentials.safeParse({
			email,
			password,
			fullName
		});
		if (!parsed.success) {
			toast.error(parsed.error.issues[0].message);
			return;
		}
		setBusy(true);
		try {
			if (mode === "signup") {
				const redirectTo = getRedirectTo();
				const { error } = await supabase.auth.signUp({
					email: parsed.data.email,
					password: parsed.data.password,
					options: {
						emailRedirectTo: redirectTo,
						data: { full_name: parsed.data.fullName || null }
					}
				});
				if (error) throw error;
				toast.success("Account created — check your email to confirm, then sign in.");
				setMode("signin");
			} else {
				const { error } = await supabase.auth.signInWithPassword({
					email: parsed.data.email,
					password: parsed.data.password
				});
				if (error) throw error;
				toast.success("Welcome back!");
				navigate({ to: destination });
			}
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Something went wrong");
		} finally {
			setBusy(false);
		}
	};
	const google = async () => {
		setBusy(true);
		try {
			sessionStorage.setItem("studyhub:next", destination);
			const redirectTo = getRedirectTo();
			const { data, error } = await supabase.auth.signInWithOAuth({
				provider: "google",
				options: { redirectTo: redirectTo ?? void 0 }
			});
			if (error) throw error;
			if (data?.url) {
				window.location.assign(data.url);
				return;
			}
			toast.error("Google sign-in failed. Please try again.");
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Google sign-in failed. Please try again.");
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "hero-surface grid min-h-[80vh] place-items-center px-4 py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass w-full max-w-md rounded-3xl p-8 shadow-soft animate-fade-up",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: logo_default,
					alt: "StudyHub Nepal logo",
					width: 48,
					height: 48,
					className: "h-12 w-12"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 font-display text-2xl font-extrabold",
					children: mode === "signin" ? "Welcome back" : "Create your free account"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Bookmark chapters, save MCQ scores and pick up where you left off."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: google,
					disabled: busy,
					className: "mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold transition-colors hover:border-primary disabled:opacity-60",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
						viewBox: "0 0 24 24",
						className: "h-4 w-4",
						"aria-hidden": "true",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								fill: "#4285F4",
								d: "M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.4a5.5 5.5 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.6-5.2 3.6-8.8Z"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								fill: "#34A853",
								d: "M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3a7.2 7.2 0 0 1-10.7-3.8H1.3v3.1A12 12 0 0 0 12 24Z"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								fill: "#FBBC05",
								d: "M5.3 14.3a7.2 7.2 0 0 1 0-4.6V6.6H1.3a12 12 0 0 0 0 10.8l4-3.1Z"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								fill: "#EA4335",
								d: "M12 4.8c1.8 0 3.4.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.3 6.6l4 3.1A7.2 7.2 0 0 1 12 4.8Z"
							})
						]
					}), "Continue with Google"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "my-5 flex items-center gap-3 text-xs text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" }),
						" or use email",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "space-y-4",
					onSubmit: submit,
					children: [
						mode === "signup" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "fullName",
							className: "text-xs font-semibold",
							children: "Full name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "fullName",
							value: fullName,
							onChange: (e) => setFullName(e.target.value),
							maxLength: 80,
							className: "mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "email",
							className: "text-xs font-semibold",
							children: "Email"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "email",
							type: "email",
							required: true,
							value: email,
							onChange: (e) => setEmail(e.target.value),
							className: "mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "password",
							className: "text-xs font-semibold",
							children: "Password"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "password",
							type: "password",
							required: true,
							value: password,
							onChange: (e) => setPassword(e.target.value),
							className: "mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							disabled: busy,
							className: "flex w-full items-center justify-center gap-2 rounded-full brand-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft disabled:opacity-60",
							children: [busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), mode === "signin" ? "Sign in" : "Create account"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-5 text-center text-xs text-muted-foreground",
					children: [mode === "signin" ? "New to StudyHub Nepal? " : "Already have an account? ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setMode(mode === "signin" ? "signup" : "signin"),
						className: "font-semibold text-primary hover:underline",
						children: mode === "signin" ? "Create a free account" : "Sign in instead"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-center text-xs text-muted-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "hover:text-primary",
						children: "Back to home"
					})
				})
			]
		})
	});
}
//#endregion
export { AuthPage as component };
