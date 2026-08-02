import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, i as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { K as CircleX, W as Clock, g as RotateCcw, q as CircleCheck, s as Trophy } from "../_libs/lucide-react.mjs";
import { t as supabase } from "./client-D3rX22rO.mjs";
import { t as useAuth } from "./useAuth-D3TSxQ35.mjs";
import { a as leaderboard, o as mcqBank } from "./study-data-BfOlECnh.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/mcqs-BtzRYluD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DURATION = 180;
function McqPage() {
	const { user } = useAuth();
	const [started, setStarted] = (0, import_react.useState)(false);
	const [finished, setFinished] = (0, import_react.useState)(false);
	const [answers, setAnswers] = (0, import_react.useState)(mcqBank.map(() => null));
	const [time, setTime] = (0, import_react.useState)(DURATION);
	(0, import_react.useEffect)(() => {
		if (!started || finished) return;
		const id = setInterval(() => {
			setTime((t) => {
				if (t <= 1) {
					setFinished(true);
					return 0;
				}
				return t - 1;
			});
		}, 1e3);
		return () => clearInterval(id);
	}, [started, finished]);
	const score = answers.filter((a, i) => a === mcqBank[i].answer).length;
	const answered = answers.filter((a) => a !== null).length;
	(0, import_react.useEffect)(() => {
		if (!finished || !user) return;
		supabase.from("quiz_attempts").insert({
			user_id: user.id,
			score,
			total: mcqBank.length,
			class_level: "11",
			subject_slug: null
		}).then(({ error }) => {
			if (!error) toast.success("Attempt saved to your dashboard");
		});
	}, [finished, user?.id]);
	function reset() {
		setAnswers(mcqBank.map(() => null));
		setTime(DURATION);
		setFinished(false);
		setStarted(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "hero-surface",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-7xl px-4 pt-14 lg:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl font-extrabold sm:text-5xl",
				children: "MCQ Practice"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-2xl text-muted-foreground",
				children: "A mixed set of NEB-style multiple choice questions. Beat the timer, get your score instantly and review every answer with an explanation."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl border border-border bg-card p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm font-bold",
								children: [
									"Mixed Quiz · ",
									mcqBank.length,
									" questions"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: [
									"Answered ",
									answered,
									" of ",
									mcqBank.length
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex shrink-0 items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4" }),
								String(Math.floor(time / 60)).padStart(2, "0"),
								":",
								String(time % 60).padStart(2, "0")
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 h-2 overflow-hidden rounded-full bg-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full brand-gradient transition-all",
							style: { width: `${answered / mcqBank.length * 100}%` }
						})
					}),
					!started ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setStarted(true),
						className: "mt-8 inline-flex rounded-full brand-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-105",
						children: "Start quiz"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-8 space-y-6",
						children: mcqBank.map((item, qi) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-2xl border border-border p-5 animate-fade-up",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm font-semibold",
									children: [
										qi + 1,
										". ",
										item.q
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-3 grid gap-2 sm:grid-cols-2",
									children: item.options.map((opt, oi) => {
										const selected = answers[qi] === oi;
										const correct = finished && oi === item.answer;
										const wrong = finished && selected && oi !== item.answer;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											disabled: finished,
											onClick: () => setAnswers((a) => a.map((v, i) => i === qi ? oi : v)),
											className: `flex items-center gap-2 rounded-xl border px-3 py-2 text-left text-sm transition-colors ${correct ? "border-accent bg-accent/10 text-accent" : wrong ? "border-destructive bg-destructive/10 text-destructive" : selected ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:bg-muted"}`,
											children: [
												finished && correct && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 shrink-0" }),
												wrong && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-4 w-4 shrink-0" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: opt })
											]
										}, oi);
									})
								}),
								finished && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-3 text-xs text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-accent",
											children: "Why:"
										}),
										" ",
										item.why
									]
								})
							]
						}, qi))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 flex flex-wrap gap-3",
						children: !finished ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setFinished(true),
							className: "rounded-full brand-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft",
							children: "Submit answers"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "rounded-full bg-accent/15 px-4 py-2 text-sm font-bold text-accent",
								children: [
									"Score: ",
									score,
									"/",
									mcqBank.length,
									" (",
									Math.round(score / mcqBank.length * 100),
									"%)"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: reset,
								className: "inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 text-sm font-semibold hover:bg-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-4 w-4" }), " Try again"]
							})]
						})
					})] })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "h-max rounded-3xl border border-border bg-card p-6 lg:sticky lg:top-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "flex items-center gap-2 text-sm font-bold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-4 w-4 text-accent" }), " Leaderboard"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 space-y-3",
					children: leaderboard.map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between gap-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex min-w-0 items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold",
								children: i + 1
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block truncate font-medium",
									children: l.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-[11px] text-muted-foreground",
									children: l.place
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "shrink-0 font-semibold text-primary",
							children: [l.score, "%"]
						})]
					}, l.name))
				})]
			})]
		})]
	});
}
//#endregion
export { McqPage as component };
