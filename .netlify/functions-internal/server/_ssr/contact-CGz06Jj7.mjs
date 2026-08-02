import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, i as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { T as Mail, j as Instagram, r as Youtube, w as MapPin, z as Facebook } from "../_libs/lucide-react.mjs";
import { t as supabase } from "./client-D3rX22rO.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-CGz06Jj7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var schema = objectType({
	name: stringType().trim().min(1, "Name is required").max(100),
	email: stringType().trim().email("Enter a valid email").max(255),
	message: stringType().trim().min(5, "Message is too short").max(1e3)
});
var faqs = [
	{
		q: "Is StudyHub Nepal free?",
		a: "Yes. Every note, solution and past paper is free to read and download."
	},
	{
		q: "Which board do you cover?",
		a: "NEB Class 11 and Class 12, science and management streams."
	},
	{
		q: "Can I request a chapter?",
		a: "Absolutely — send the subject and chapter through this form."
	},
	{
		q: "Do I need an account?",
		a: "Only to bookmark, track progress and continue reading across devices."
	}
];
function Contact() {
	const [errors, setErrors] = (0, import_react.useState)({});
	async function onSubmit(e) {
		e.preventDefault();
		const formEl = e.currentTarget;
		const form = new FormData(formEl);
		const parsed = schema.safeParse(Object.fromEntries(form));
		if (!parsed.success) {
			const next = {};
			parsed.error.issues.forEach((i) => next[String(i.path[0])] = i.message);
			setErrors(next);
			return;
		}
		setErrors({});
		const { error } = await supabase.from("contact_messages").insert({
			name: parsed.data.name,
			email: parsed.data.email,
			subject: "subject" in parsed.data ? parsed.data.subject ?? null : null,
			message: parsed.data.message
		});
		if (error) {
			toast.error("Could not send your message. Please try again.");
			return;
		}
		formEl.reset();
		toast.success("Message sent! We usually reply within a day.");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "hero-surface",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-7xl px-4 pt-14 lg:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl font-extrabold sm:text-5xl",
					children: "Contact us"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-2xl text-muted-foreground",
					children: "Missing a chapter? Spotted a mistake? Want to contribute notes? We would love to hear from you."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit,
					className: "rounded-3xl border border-border bg-card p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "name",
									className: "text-xs font-semibold",
									children: "Name"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "name",
									name: "name",
									maxLength: 100,
									className: "mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
								}),
								errors.name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-destructive",
									children: errors.name
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "email",
									className: "text-xs font-semibold",
									children: "Email"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "email",
									name: "email",
									type: "email",
									maxLength: 255,
									className: "mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
								}),
								errors.email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-destructive",
									children: errors.email
								})
							] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "message",
									className: "text-xs font-semibold",
									children: "Message"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									id: "message",
									name: "message",
									rows: 6,
									maxLength: 1e3,
									className: "mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
								}),
								errors.message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-destructive",
									children: errors.message
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "mt-5 rounded-full brand-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-105",
							children: "Send message"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl border border-border bg-card p-6 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4 text-primary" }), " hello@studyhubnepal.com"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 flex items-center gap-2 text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4 text-primary" }), " Kathmandu, Nepal"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 flex gap-2",
								children: [
									Facebook,
									Instagram,
									Youtube
								].map((Icon, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#",
									"aria-label": "Social link",
									className: "inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
								}, i))
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-hidden rounded-3xl border border-border",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
							title: "StudyHub Nepal location",
							src: "https://www.openstreetmap.org/export/embed.html?bbox=85.28%2C27.68%2C85.36%2C27.74&layer=mapnik",
							className: "h-56 w-full",
							loading: "lazy"
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-3xl px-4 pb-16 lg:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-extrabold",
					children: "FAQ"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 space-y-3",
					children: faqs.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
						className: "rounded-2xl border border-border bg-card p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
							className: "cursor-pointer text-sm font-semibold",
							children: f.q
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: f.a
						})]
					}, f.q))
				})]
			})
		]
	});
}
//#endregion
export { Contact as component };
