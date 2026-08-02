import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { $ as BookOpen, G as ClipboardList, I as FileText, L as FileQuestionMark, O as ListChecks, P as GraduationCap, V as Download, a as Users, d as Sparkles, s as Trophy } from "../_libs/lucide-react.mjs";
import { c as subjects, r as classes, t as blogPosts } from "./study-data-BfOlECnh.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as SearchBar } from "./SearchBar-B90v3azH.mjs";
import { t as SubjectIcon } from "./SubjectIcon-0PhZIpvc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B3LORJYj.js
var import_jsx_runtime = require_jsx_runtime();
var hero_students_default = "/assets/hero-students-DVNIYgJi.png";
var features = [
	{
		icon: FileText,
		title: "Chapter Notes",
		text: "Concise, syllabus-aligned notes with downloadable PDFs."
	},
	{
		icon: ClipboardList,
		title: "Exercise Answers",
		text: "Step-by-step solutions with clear explanations."
	},
	{
		icon: ListChecks,
		title: "MCQ Practice",
		text: "Timed quizzes with instant results and a leaderboard."
	},
	{
		icon: FileQuestionMark,
		title: "Model Questions",
		text: "NEB-pattern model sets to rehearse the real exam."
	},
	{
		icon: BookOpen,
		title: "Past Papers",
		text: "Year-wise board questions organised by subject."
	},
	{
		icon: Download,
		title: "Offline Ready",
		text: "Download once, revise anywhere — even without data."
	}
];
var stats = [
	{
		value: "20+",
		label: "Subjects covered"
	},
	{
		value: "800+",
		label: "Chapter resources"
	},
	{
		value: "5,000+",
		label: "Practice questions"
	},
	{
		value: "100%",
		label: "Free for students"
	}
];
var floating = [
	{
		icon: GraduationCap,
		className: "left-[2%] top-[12%]"
	},
	{
		icon: BookOpen,
		className: "left-[3%] bottom-[14%]"
	},
	{
		icon: Trophy,
		className: "right-[2%] top-[16%]"
	},
	{
		icon: Sparkles,
		className: "right-[3%] bottom-[12%]"
	}
];
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "hero-surface relative overflow-hidden",
			children: [floating.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": true,
				className: `pointer-events-none absolute hidden rounded-2xl border border-border bg-card/70 p-3 text-primary shadow-soft animate-float lg:block ${f.className}`,
				style: { animationDelay: `${i * .8}s` },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, { className: "h-5 w-5" })
			}, i)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 lg:grid-cols-2 lg:px-8 lg:py-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "animate-fade-up",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5" }), " Built for NEB Class 11 & 12"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-5 font-display text-4xl font-extrabold leading-tight sm:text-6xl",
							children: ["Study Smarter, ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "brand-gradient-text",
								children: "Score Higher."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 max-w-xl text-base text-muted-foreground sm:text-lg",
							children: "Access Class 11 & Class 12 Notes, Exercise Solutions, MCQs, Model Questions, and Past Papers—all in one place."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/notes",
								className: "inline-flex items-center gap-2 rounded-full brand-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-105",
								children: "Start Learning"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/notes",
								className: "inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold transition-colors hover:bg-muted",
								children: "Browse Notes"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchBar, {})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative animate-fade-in",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "glass rounded-[2rem] p-4 shadow-soft",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: hero_students_default,
							alt: "Nepali Class 11 and 12 students studying together",
							width: 1024,
							height: 896,
							className: "h-auto w-full"
						})
					})
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-7xl px-4 lg:px-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 rounded-3xl border border-border bg-card p-6 sm:grid-cols-4",
				children: stats.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-3xl font-extrabold brand-gradient-text",
						children: s.value
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: s.label
					})]
				}, s.label))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-7xl px-4 py-20 lg:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl font-extrabold sm:text-4xl",
					children: "Everything in one study hub"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-2xl text-muted-foreground",
					children: "Organised by class, subject and chapter — so you always know what to revise next."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
					children: features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "lift rounded-2xl border border-border bg-card p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, { className: "h-5 w-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-4 text-lg font-bold",
								children: f.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: f.text
							})
						]
					}, f.title))
				})
			]
		}),
		classes.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-7xl px-4 pb-16 lg:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "font-display text-3xl font-extrabold",
					children: ["Class ", c]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: [
						"All ",
						subjects.length,
						" subjects with notes, solutions and question banks."
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/notes",
					className: "text-sm font-semibold text-primary hover:underline",
					children: "View all resources →"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: subjects.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/subject/$classId/$slug",
					params: {
						classId: c,
						slug: s.slug
					},
					className: "lift group rounded-2xl border border-border bg-card p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubjectIcon, { slug: s.slug })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-3 text-base font-bold group-hover:text-primary",
							children: s.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: s.blurb
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 text-xs font-semibold text-primary",
							children: [s.chapters.length, " chapters"]
						})
					]
				}, s.slug))
			})]
		}, c)),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-7xl px-4 pb-20 lg:px-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass grid items-center gap-8 rounded-3xl p-8 lg:grid-cols-[1.2fr_1fr] lg:p-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl font-extrabold",
						children: "Practice MCQs with a live timer"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-muted-foreground",
						children: "Attempt subject-wise multiple choice questions, see your score instantly, review the correct answers with explanations and climb the weekly leaderboard."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/mcqs",
						className: "mt-6 inline-flex items-center gap-2 rounded-full brand-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-105",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListChecks, { className: "h-4 w-4" }), " Start a quiz"]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border bg-card p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-sm font-bold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4 text-accent" }), " Weekly leaderboard"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-3 text-sm",
						children: [
							["Aayush Shrestha", "98%"],
							["Sneha Karki", "95%"],
							["Bibek Tamang", "93%"]
						].map(([n, s], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "inline-flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-bold",
									children: i + 1
								}), n]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-primary",
								children: s
							})]
						}, n))
					})]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-7xl px-4 pb-8 lg:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl font-extrabold",
					children: "From the blog"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/blog",
					className: "text-sm font-semibold text-primary hover:underline",
					children: "All articles →"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
				children: blogPosts.slice(0, 3).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "lift rounded-2xl border border-border bg-card p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full bg-secondary/15 px-3 py-1 text-[11px] font-semibold text-secondary",
							children: p.category
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-4 text-lg font-bold",
							children: p.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: p.excerpt
						})
					]
				}, p.slug))
			})]
		})
	] });
}
//#endregion
export { Home as component };
