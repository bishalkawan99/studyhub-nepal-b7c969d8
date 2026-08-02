/**
 * NEB GPA calculation. All rules (passing percentage, grade boundaries,
 * subjects and mark distributions) come from the database, so nothing here
 * is hardcoded except the arithmetic itself.
 */

export type GradeBoundary = {
  grade: string;
  min_gpa: number;
  max_gpa: number;
  grade_point: number;
  min_percentage: number | null;
  sort_order: number;
};

export type GpaSubject = {
  id: string;
  name: string;
  theory_full_marks: number;
  practical_full_marks: number;
  practical_label: string;
  is_optional: boolean;
  sort_order: number;
};

export type SubjectEntry = {
  theory: string;
  practical: string;
  grade: string;
  included: boolean;
};

export type SubjectResult = {
  subject: GpaSubject;
  theoryObtained: number;
  practicalObtained: number;
  totalObtained: number;
  fullMarks: number;
  percentage: number;
  theoryPassMarks: number;
  theoryPassed: boolean;
  practicalPassed: boolean;
  grade: string;
  gradePoint: number;
  passed: boolean;
  errors: string[];
};

export type GpaSummary = {
  gpa: number;
  overallGrade: string;
  overallPercentage: number;
  totalSubjects: number;
  passedSubjects: number;
  ngSubjects: number;
  finalResult: "Passed" | "Not Graded";
};

export function gradeFromPercentage(
  percentage: number,
  boundaries: GradeBoundary[],
): GradeBoundary | null {
  const ordered = [...boundaries]
    .filter((b) => b.min_percentage !== null)
    .sort((a, b) => (b.min_percentage ?? 0) - (a.min_percentage ?? 0));
  return (
    ordered.find((b) => percentage >= (b.min_percentage ?? 0)) ??
    ordered[ordered.length - 1] ??
    null
  );
}

export function gradeFromGpa(gpa: number, boundaries: GradeBoundary[]): GradeBoundary | null {
  const ordered = [...boundaries].sort((a, b) => b.min_gpa - a.min_gpa);
  return ordered.find((b) => gpa >= b.min_gpa) ?? ordered[ordered.length - 1] ?? null;
}

export function ngBoundary(boundaries: GradeBoundary[]): GradeBoundary | undefined {
  return boundaries.find((b) => b.grade.toUpperCase() === "NG");
}

function parseMark(value: string): number | null {
  if (value.trim() === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

export function evaluateSubjectByMarks(
  subject: GpaSubject,
  entry: SubjectEntry,
  boundaries: GradeBoundary[],
  theoryPassingPercentage: number,
  practicalPassingPercentage: number,
): SubjectResult {
  const errors: string[] = [];
  const theoryRaw = parseMark(entry.theory);
  const practicalRaw = parseMark(entry.practical);

  if (theoryRaw === null) errors.push("Enter theory marks");
  if (practicalRaw === null && subject.practical_full_marks > 0) {
    errors.push(`Enter ${subject.practical_label.toLowerCase()} marks`);
  }
  if (theoryRaw !== null && theoryRaw < 0) errors.push("Theory marks cannot be negative");
  if (practicalRaw !== null && practicalRaw < 0)
    errors.push("Practical/internal marks cannot be negative");
  if (theoryRaw !== null && theoryRaw > subject.theory_full_marks) {
    errors.push(`Theory marks cannot exceed ${subject.theory_full_marks}`);
  }
  if (practicalRaw !== null && practicalRaw > subject.practical_full_marks) {
    errors.push(`${subject.practical_label} marks cannot exceed ${subject.practical_full_marks}`);
  }

  const theoryObtained = Math.max(0, Math.min(theoryRaw ?? 0, subject.theory_full_marks));
  const practicalObtained = Math.max(0, Math.min(practicalRaw ?? 0, subject.practical_full_marks));
  const fullMarks = subject.theory_full_marks + subject.practical_full_marks;
  const totalObtained = theoryObtained + practicalObtained;
  const percentage = fullMarks > 0 ? (totalObtained / fullMarks) * 100 : 0;

  const theoryPassMarks = subject.theory_full_marks * (theoryPassingPercentage / 100);
  const practicalPassMarks = subject.practical_full_marks * (practicalPassingPercentage / 100);
  const theoryPassed = theoryRaw !== null && theoryObtained >= theoryPassMarks;
  const practicalPassed =
    subject.practical_full_marks === 0 || practicalObtained >= practicalPassMarks;

  const ng = ngBoundary(boundaries);
  const matched = gradeFromPercentage(percentage, boundaries);
  const failed = !theoryPassed || !practicalPassed || errors.length > 0;

  const grade = failed ? (ng?.grade ?? "NG") : (matched?.grade ?? "NG");
  const gradePoint = failed ? (ng?.grade_point ?? 0) : (matched?.grade_point ?? 0);

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
    grade,
    gradePoint,
    passed: !failed,
    errors,
  };
}

export function evaluateSubjectByGrade(
  subject: GpaSubject,
  entry: SubjectEntry,
  boundaries: GradeBoundary[],
): SubjectResult {
  const errors: string[] = [];
  const boundary = boundaries.find((b) => b.grade === entry.grade);
  if (!boundary) errors.push("Select a grade");
  const isNg = (boundary?.grade ?? "NG").toUpperCase() === "NG";
  const fullMarks = subject.theory_full_marks + subject.practical_full_marks;
  const percentage = boundary?.min_percentage ?? 0;

  return {
    subject,
    theoryObtained: 0,
    practicalObtained: 0,
    totalObtained: 0,
    fullMarks,
    percentage,
    theoryPassMarks: subject.theory_full_marks * 0.35,
    theoryPassed: !isNg,
    practicalPassed: !isNg,
    grade: boundary?.grade ?? "NG",
    gradePoint: boundary?.grade_point ?? 0,
    passed: !isNg && errors.length === 0,
    errors,
  };
}

export function summarise(results: SubjectResult[], boundaries: GradeBoundary[]): GpaSummary {
  const totalSubjects = results.length;
  const gpa = totalSubjects ? results.reduce((sum, r) => sum + r.gradePoint, 0) / totalSubjects : 0;
  const totalFull = results.reduce((sum, r) => sum + r.fullMarks, 0);
  const totalObtained = results.reduce((sum, r) => sum + r.totalObtained, 0);
  const ngSubjects = results.filter((r) => !r.passed).length;
  const roundedGpa = Math.round(gpa * 100) / 100;

  return {
    gpa: roundedGpa,
    overallGrade: gradeFromGpa(roundedGpa, boundaries)?.grade ?? "NG",
    overallPercentage: totalFull > 0 ? Math.round((totalObtained / totalFull) * 10000) / 100 : 0,
    totalSubjects,
    passedSubjects: totalSubjects - ngSubjects,
    ngSubjects,
    finalResult: ngSubjects === 0 && totalSubjects > 0 ? "Passed" : "Not Graded",
  };
}

export const fmt = (n: number, digits = 2) =>
  Number.isFinite(n) ? n.toFixed(digits).replace(/\.00$/, digits === 2 ? ".00" : "") : "—";
