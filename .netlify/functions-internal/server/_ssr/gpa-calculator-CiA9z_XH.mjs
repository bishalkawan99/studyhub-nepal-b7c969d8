import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, i as require_react, t as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { D as LoaderCircle, V as Download, X as Calculator, g as RotateCcw, m as Share2, v as Printer } from "../_libs/lucide-react.mjs";
import { t as supabase } from "./client-D3rX22rO.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as faqs } from "./gpa-calculator-DT_P8kXr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/gpa-calculator-CiA9z_XH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function gradeFromPercentage(percentage, boundaries) {
	const ordered = [...boundaries].filter((b) => b.min_percentage !== null).sort((a, b) => (b.min_percentage ?? 0) - (a.min_percentage ?? 0));
	return ordered.find((b) => percentage >= (b.min_percentage ?? 0)) ?? ordered[ordered.length - 1] ?? null;
}
function gradeFromGpa(gpa, boundaries) {
	const ordered = [...boundaries].sort((a, b) => b.min_gpa - a.min_gpa);
	return ordered.find((b) => gpa >= b.min_gpa) ?? ordered[ordered.length - 1] ?? null;
}
function ngBoundary(boundaries) {
	return boundaries.find((b) => b.grade.toUpperCase() === "NG");
}
function parseMark(value) {
	if (value.trim() === "") return null;
	const n = Number(value);
	return Number.isFinite(n) ? n : null;
}
function evaluateSubjectByMarks(subject, entry, boundaries, theoryPassingPercentage, practicalPassingPercentage) {
	const errors = [];
	const theoryRaw = parseMark(entry.theory);
	const practicalRaw = parseMark(entry.practical);
	if (theoryRaw === null) errors.push("Enter theory marks");
	if (practicalRaw === null && subject.practical_full_marks > 0) errors.push(`Enter ${subject.practical_label.toLowerCase()} marks`);
	if (theoryRaw !== null && theoryRaw < 0) errors.push("Theory marks cannot be negative");
	if (practicalRaw !== null && practicalRaw < 0) errors.push("Practical/internal marks cannot be negative");
	if (theoryRaw !== null && theoryRaw > subject.theory_full_marks) errors.push(`Theory marks cannot exceed ${subject.theory_full_marks}`);
	if (practicalRaw !== null && practicalRaw > subject.practical_full_marks) errors.push(`${subject.practical_label} marks cannot exceed ${subject.practical_full_marks}`);
	const theoryObtained = Math.max(0, Math.min(theoryRaw ?? 0, subject.theory_full_marks));
	const practicalObtained = Math.max(0, Math.min(practicalRaw ?? 0, subject.practical_full_marks));
	const fullMarks = subject.theory_full_marks + subject.practical_full_marks;
	const totalObtained = theoryObtained + practicalObtained;
	const percentage = fullMarks > 0 ? totalObtained / fullMarks * 100 : 0;
	const theoryPassMarks = subject.theory_full_marks * (theoryPassingPercentage / 100);
	const practicalPassMarks = subject.practical_full_marks * (practicalPassingPercentage / 100);
	const theoryPassed = theoryRaw !== null && theoryObtained >= theoryPassMarks;
	const practicalPassed = subject.practical_full_marks === 0 || practicalObtained >= practicalPassMarks;
	const ng = ngBoundary(boundaries);
	const matched = gradeFromPercentage(percentage, boundaries);
	const failed = !theoryPassed || !practicalPassed || errors.length > 0;
	return {
		subject,
		theoryObtained,
		practicalObtained,
		totalObtained,
		fullMarks,
		percentage,
		theoryPassMarks,
		theoryPassed,
		practicalPassed,
		grade: failed ? ng?.grade ?? "NG" : matched?.grade ?? "NG",
		gradePoint: failed ? ng?.grade_point ?? 0 : matched?.grade_point ?? 0,
		passed: !failed,
		errors
	};
}
function evaluateSubjectByGrade(subject, entry, boundaries) {
	const errors = [];
	const boundary = boundaries.find((b) => b.grade === entry.grade);
	if (!boundary) errors.push("Select a grade");
	const isNg = (boundary?.grade ?? "NG").toUpperCase() === "NG";
	return {
		subject,
		theoryObtained: 0,
		practicalObtained: 0,
		totalObtained: 0,
		fullMarks: subject.theory_full_marks + subject.practical_full_marks,
		percentage: boundary?.min_percentage ?? 0,
		theoryPassMarks: subject.theory_full_marks * .35,
		theoryPassed: !isNg,
		practicalPassed: !isNg,
		grade: boundary?.grade ?? "NG",
		gradePoint: boundary?.grade_point ?? 0,
		passed: !isNg && errors.length === 0,
		errors
	};
}
function summarise(results, boundaries) {
	const totalSubjects = results.length;
	const gpa = totalSubjects ? results.reduce((sum, r) => sum + r.gradePoint, 0) / totalSubjects : 0;
	const totalFull = results.reduce((sum, r) => sum + r.fullMarks, 0);
	const totalObtained = results.reduce((sum, r) => sum + r.totalObtained, 0);
	const ngSubjects = results.filter((r) => !r.passed).length;
	const roundedGpa = Math.round(gpa * 100) / 100;
	return {
		gpa: roundedGpa,
		overallGrade: gradeFromGpa(roundedGpa, boundaries)?.grade ?? "NG",
		overallPercentage: totalFull > 0 ? Math.round(totalObtained / totalFull * 1e4) / 100 : 0,
		totalSubjects,
		passedSubjects: totalSubjects - ngSubjects,
		ngSubjects,
		finalResult: ngSubjects === 0 && totalSubjects > 0 ? "Passed" : "Not Graded"
	};
}
var fieldClass = "w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring";
function GpaCalculatorPage() {
	const [classSlug, setClassSlug] = (0, import_react.useState)("class-12");
	const [facultySlug, setFacultySlug] = (0, import_react.useState)("science");
	const [method, setMethod] = (0, import_react.useState)("marks");
	const [entries, setEntries] = (0, import_react.useState)({});
	const config = useQuery({
		queryKey: ["gpa-config"],
		queryFn: async () => {
			const [classes, faculties, subjects, grades, settings] = await Promise.all([
				supabase.from("gpa_classes").select("id,slug,name,sort_order").eq("is_active", true).order("sort_order"),
				supabase.from("gpa_faculties").select("id,class_id,slug,name,sort_order").eq("is_active", true).order("sort_order"),
				supabase.from("gpa_subjects").select("id,faculty_id,name,theory_full_marks,practical_full_marks,practical_label,is_optional,sort_order").eq("is_active", true).order("sort_order"),
				supabase.from("gpa_grade_boundaries").select("grade,min_gpa,max_gpa,grade_point,min_percentage,sort_order").order("sort_order"),
				supabase.from("gpa_settings").select("key,value")
			]);
			const err = classes.error ?? faculties.error ?? subjects.error ?? grades.error ?? settings.error;
			if (err) throw err;
			return {
				classes: classes.data ?? [],
				faculties: faculties.data ?? [],
				subjects: subjects.data ?? [],
				boundaries: grades.data ?? [],
				settings: Object.fromEntries((settings.data ?? []).map((s) => [s.key, Number(s.value)]))
			};
		},
		staleTime: 3e5
	});
	const activeClass = config.data?.classes.find((c) => c.slug === classSlug);
	const facultiesForClass = (0, import_react.useMemo)(() => (config.data?.faculties ?? []).filter((f) => f.class_id === activeClass?.id), [config.data, activeClass?.id]);
	const activeFaculty = facultiesForClass.find((f) => f.slug === facultySlug) ?? facultiesForClass[0];
	const subjectList = (0, import_react.useMemo)(() => (config.data?.subjects ?? []).filter((s) => s.faculty_id === activeFaculty?.id).map((s) => ({
		...s,
		theory_full_marks: Number(s.theory_full_marks),
		practical_full_marks: Number(s.practical_full_marks)
	})), [config.data, activeFaculty?.id]);
	(0, import_react.useEffect)(() => {
		setEntries((prev) => {
			const next = {};
			for (const s of subjectList) next[s.id] = prev[s.id] ?? {
				theory: "",
				practical: "",
				grade: "A",
				included: true
			};
			return next;
		});
	}, [subjectList]);
	const boundaries = config.data?.boundaries ?? [];
	const theoryPct = config.data?.settings["theory_passing_percentage"] ?? 35;
	const practicalPct = config.data?.settings["practical_passing_percentage"] ?? 40;
	const results = subjectList.filter((s) => entries[s.id]?.included).map((s) => {
		const entry = entries[s.id];
		return method === "marks" ? evaluateSubjectByMarks(s, entry, boundaries, theoryPct, practicalPct) : evaluateSubjectByGrade(s, entry, boundaries);
	});
	const complete = results.length > 0 && results.every((r) => r.errors.length === 0);
	const summary = summarise(results.filter((r) => r.errors.length === 0), boundaries);
	function update(id, patch) {
		setEntries((prev) => ({
			...prev,
			[id]: {
				...prev[id],
				...patch
			}
		}));
	}
	function reset() {
		setEntries((prev) => Object.fromEntries(Object.entries(prev).map(([id, e]) => [id, {
			...e,
			theory: "",
			practical: "",
			grade: "A"
		}])));
		toast.success("Calculator reset");
	}
	async function share() {
		const text = `My NEB ${activeClass?.name ?? ""} ${activeFaculty?.name ?? ""} GPA is ${summary.gpa.toFixed(2)} (${summary.overallGrade}) — calculated on StudyHub Nepal.`;
		try {
			if (typeof navigator !== "undefined" && navigator.share) {
				await navigator.share({
					title: "My NEB GPA",
					text,
					url: window.location.href
				});
				return;
			}
			await navigator.clipboard.writeText(`${text} ${window.location.href}`);
			toast.success("Result copied to clipboard");
		} catch {
			toast.error("Could not share the result");
		}
	}
	if (config.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex max-w-7xl items-center justify-center px-4 py-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
			className: "h-6 w-6 animate-spin text-primary",
			"aria-hidden": "true"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "ml-3 text-sm text-muted-foreground",
			children: "Loading NEB grading rules…"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-7xl px-4 py-10 lg:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				"aria-label": "Breadcrumb",
				className: "text-xs text-muted-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
					className: "flex flex-wrap items-center gap-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/",
							className: "hover:text-primary",
							children: "Home"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							"aria-hidden": "true",
							children: "/"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							"aria-current": "page",
							className: "text-foreground",
							children: "GPA Calculator"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "font-display text-3xl font-extrabold sm:text-4xl",
					children: ["NEB ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "brand-gradient-text",
						children: "GPA Calculator"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 max-w-3xl text-sm text-muted-foreground",
					children: [
						"Calculate your Class 11 or Class 12 GPA instantly with the latest NEB grading system. Choose your faculty, enter theory and practical marks, and the calculator applies the",
						" ",
						theoryPct,
						"% theory passing rule automatically."
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				"aria-labelledby": "setup",
				className: "mt-8 glass rounded-3xl border border-border p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "setup",
					className: "font-display text-lg font-bold",
					children: "1. Choose your class and faculty"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid gap-4 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "gpa-class",
							className: "text-xs font-semibold",
							children: "Class"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							id: "gpa-class",
							value: classSlug,
							onChange: (e) => setClassSlug(e.target.value),
							className: `mt-1 ${fieldClass}`,
							children: (config.data?.classes ?? []).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: c.slug,
								children: c.name
							}, c.id))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "gpa-faculty",
							className: "text-xs font-semibold",
							children: "Faculty"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							id: "gpa-faculty",
							value: activeFaculty?.slug ?? "",
							onChange: (e) => setFacultySlug(e.target.value),
							className: `mt-1 ${fieldClass}`,
							children: facultiesForClass.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: f.slug,
								children: f.name
							}, f.id))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-semibold",
							children: "Calculation method"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 flex gap-2",
							role: "group",
							"aria-label": "Calculation method",
							children: ["marks", "grades"].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setMethod(m),
								"aria-pressed": method === m,
								className: `flex-1 rounded-xl border px-3 py-2 text-sm font-semibold transition ${method === m ? "brand-gradient border-transparent text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground"}`,
								children: m === "marks" ? "Using marks" : "Using grades"
							}, m))
						})] })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				"aria-labelledby": "inputs",
				className: "mt-6 rounded-3xl border border-border bg-card p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "inputs",
						className: "font-display text-lg font-bold",
						children: "2. Enter your results"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: "Optional subjects can be switched off. Marks update your GPA live."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 grid gap-3",
						children: subjectList.map((s) => {
							const entry = entries[s.id];
							if (!entry) return null;
							const result = results.find((r) => r.subject.id === s.id);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-3 rounded-2xl border border-border p-4 transition-colors sm:grid-cols-[minmax(0,1.4fr)_repeat(2,minmax(0,1fr))_auto] sm:items-end",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											id: `include-${s.id}`,
											type: "checkbox",
											checked: entry.included,
											onChange: (e) => update(s.id, { included: e.target.checked }),
											className: "h-4 w-4 rounded border-border accent-primary"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											htmlFor: `include-${s.id}`,
											className: "text-sm font-semibold",
											children: [s.name, s.is_optional ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "ml-1 text-xs text-muted-foreground",
												children: "(optional)"
											}) : null]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-xs text-muted-foreground",
										children: [
											"Theory ",
											s.theory_full_marks,
											" · ",
											s.practical_label,
											" ",
											s.practical_full_marks,
											" · pass theory ≥ ",
											(s.theory_full_marks * (theoryPct / 100)).toFixed(2)
										]
									})] }),
									method === "marks" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										htmlFor: `theory-${s.id}`,
										className: "text-xs font-semibold",
										children: [
											"Theory (max ",
											s.theory_full_marks,
											")"
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: `theory-${s.id}`,
										type: "number",
										inputMode: "decimal",
										min: 0,
										max: s.theory_full_marks,
										step: "0.25",
										disabled: !entry.included,
										value: entry.theory,
										onChange: (e) => update(s.id, { theory: e.target.value }),
										className: `mt-1 ${fieldClass}`
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										htmlFor: `practical-${s.id}`,
										className: "text-xs font-semibold",
										children: [
											s.practical_label,
											" (max ",
											s.practical_full_marks,
											")"
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: `practical-${s.id}`,
										type: "number",
										inputMode: "decimal",
										min: 0,
										max: s.practical_full_marks,
										step: "0.25",
										disabled: !entry.included,
										value: entry.practical,
										onChange: (e) => update(s.id, { practical: e.target.value }),
										className: `mt-1 ${fieldClass}`
									})] })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "sm:col-span-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											htmlFor: `grade-${s.id}`,
											className: "text-xs font-semibold",
											children: "Grade"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
											id: `grade-${s.id}`,
											value: entry.grade,
											disabled: !entry.included,
											onChange: (e) => update(s.id, { grade: e.target.value }),
											className: `mt-1 ${fieldClass}`,
											children: boundaries.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
												value: b.grade,
												children: [
													b.grade,
													" (",
													Number(b.grade_point).toFixed(2),
													")"
												]
											}, b.grade))
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-right",
										children: entry.included && result ? result.errors.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground",
											children: result.errors[0]
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `inline-flex min-w-14 justify-center rounded-full px-3 py-1 text-xs font-bold ${result.passed ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"}`,
											children: result.grade
										}) : null
									})
								]
							}, s.id);
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				"aria-labelledby": "results",
				className: "mt-6 rounded-3xl border border-border bg-card p-6",
				id: "gpa-result",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							id: "results",
							className: "font-display text-lg font-bold",
							children: "3. Your result"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2 print:hidden",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => window.print(),
									className: "inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-4 text-sm font-semibold hover:text-primary",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, {
										className: "h-4 w-4",
										"aria-hidden": "true"
									}), " Print"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => window.print(),
									className: "inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-4 text-sm font-semibold hover:text-primary",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
										className: "h-4 w-4",
										"aria-hidden": "true"
									}), " Download PDF"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => void share(),
									className: "inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-4 text-sm font-semibold hover:text-primary",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, {
										className: "h-4 w-4",
										"aria-hidden": "true"
									}), " Share"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: reset,
									className: "inline-flex min-h-11 items-center gap-2 rounded-full brand-gradient px-4 text-sm font-semibold text-primary-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {
										className: "h-4 w-4",
										"aria-hidden": "true"
									}), " Reset"]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full min-w-[900px] border-collapse text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("caption", {
									className: "sr-only",
									children: "Subject-wise NEB result and grade points"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "text-left text-xs uppercase text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											scope: "col",
											className: "px-3 py-2",
											children: "Subject"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											scope: "col",
											className: "px-3 py-2",
											children: "Theory FM"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											scope: "col",
											className: "px-3 py-2",
											children: "Theory obt."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											scope: "col",
											className: "px-3 py-2",
											children: "Prac./Int. FM"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											scope: "col",
											className: "px-3 py-2",
											children: "Prac./Int. obt."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											scope: "col",
											className: "px-3 py-2",
											children: "Total"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											scope: "col",
											className: "px-3 py-2",
											children: "%"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											scope: "col",
											className: "px-3 py-2",
											children: "Theory pass"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											scope: "col",
											className: "px-3 py-2",
											children: "Theory status"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											scope: "col",
											className: "px-3 py-2",
											children: "Grade"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											scope: "col",
											className: "px-3 py-2",
											children: "GP"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											scope: "col",
											className: "px-3 py-2",
											children: "Result"
										})
									]
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: results.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									colSpan: 12,
									className: "px-3 py-6 text-center text-muted-foreground",
									children: "Enter your marks above to see the result table."
								}) }) : results.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: `border-t border-border ${!r.passed && r.errors.length === 0 ? "bg-destructive/5" : ""}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-3 py-2 font-semibold",
											children: r.subject.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-3 py-2",
											children: r.subject.theory_full_marks
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-3 py-2",
											children: method === "marks" ? r.theoryObtained : "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-3 py-2",
											children: r.subject.practical_full_marks
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-3 py-2",
											children: method === "marks" ? r.practicalObtained : "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-3 py-2",
											children: method === "marks" ? r.totalObtained : "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "px-3 py-2",
											children: [r.percentage.toFixed(2), "%"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-3 py-2",
											children: r.theoryPassMarks.toFixed(2)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-3 py-2",
											children: method === "marks" ? r.theoryPassed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-primary",
												children: "Met"
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-semibold text-destructive",
												children: [
													"Below ",
													theoryPct,
													"%"
												]
											}) : "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-3 py-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `inline-flex rounded-full px-2 py-0.5 text-xs font-bold ${r.passed ? "bg-primary/10 text-primary" : "bg-destructive text-destructive-foreground"}`,
												children: r.grade
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-3 py-2",
											children: r.gradePoint.toFixed(2)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-3 py-2",
											children: r.errors.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Incomplete"
											}) : r.passed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-primary",
												children: "Passed"
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold text-destructive",
												children: "NG — theory requirement not met"
											})
										})
									]
								}, r.subject.id)) })
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"aria-live": "polite",
						className: "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
						children: [
							{
								label: "Final GPA",
								value: complete ? summary.gpa.toFixed(2) : "—"
							},
							{
								label: "Overall grade",
								value: complete ? summary.overallGrade : "—"
							},
							{
								label: "Overall percentage",
								value: complete ? `${summary.overallPercentage.toFixed(2)}%` : "—"
							},
							{
								label: "Final result",
								value: complete ? summary.finalResult : "—"
							},
							{
								label: "Total subjects",
								value: String(summary.totalSubjects)
							},
							{
								label: "Passed subjects",
								value: String(summary.passedSubjects)
							},
							{
								label: "NG subjects",
								value: String(summary.ngSubjects)
							},
							{
								label: "Class & faculty",
								value: `${activeClass?.name ?? ""} · ${activeFaculty?.name ?? ""}`
							}
						].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass rounded-2xl border border-border p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: c.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-display text-xl font-extrabold",
								children: c.value
							})]
						}, c.label))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				"aria-labelledby": "grading",
				className: "mt-6 rounded-3xl border border-border bg-card p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "grading",
					className: "font-display text-lg font-bold",
					children: "Latest NEB grading system"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 grid gap-2 sm:grid-cols-3",
					children: boundaries.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between rounded-xl border border-border px-4 py-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold",
							children: b.grade
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted-foreground",
							children: [
								Number(b.min_gpa).toFixed(2),
								" – ",
								Number(b.max_gpa).toFixed(2)
							]
						})]
					}, b.grade))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				"aria-labelledby": "faq",
				className: "mt-6 rounded-3xl border border-border bg-card p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					id: "faq",
					className: "font-display text-lg font-bold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calculator, {
						className: "mr-2 inline h-4 w-4 text-primary",
						"aria-hidden": "true"
					}), "GPA calculator FAQ"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
					className: "mt-4 grid gap-4",
					children: faqs.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-sm font-semibold",
						children: f.question
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1 text-sm text-muted-foreground",
						children: f.answer
					})] }, f.question))
				})]
			})
		]
	});
}
//#endregion
export { GpaCalculatorPage as component };
