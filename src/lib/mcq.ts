import { subjects, type Subject } from "@/lib/study-data";

export const faculties = ["Science", "Management", "Common"] as const;
export type Faculty = (typeof faculties)[number];

export const difficulties = ["easy", "medium", "hard"] as const;
export type Difficulty = (typeof difficulties)[number];

const facultyBySubject: Record<string, Faculty> = {
  nepali: "Common",
  english: "Common",
  mathematics: "Science",
  physics: "Science",
  chemistry: "Science",
  biology: "Science",
  computer: "Science",
  accountancy: "Management",
  economics: "Management",
  business: "Management",
};

export function facultyOf(slug: string): Faculty {
  return facultyBySubject[slug] ?? "Common";
}

export function subjectsByFaculty(faculty: Faculty): Subject[] {
  return subjects.filter((s) => facultyOf(s.slug) === faculty);
}

/** "class-11" -> "11"; returns null for anything else. */
export function parseClassSlug(slug: string): "11" | "12" | null {
  if (slug === "class-11") return "11";
  if (slug === "class-12") return "12";
  return null;
}

export function classSlug(classId: string) {
  return `class-${classId}`;
}

/** "chapter-3" -> 2 (zero based index); null when invalid. */
export function parseChapterSlug(slug: string, total: number): number | null {
  const match = /^chapter-(\d+)$/.exec(slug);
  if (!match) return null;
  const index = Number(match[1]) - 1;
  if (index < 0 || index >= total) return null;
  return index;
}

export function chapterSlug(index: number) {
  return `chapter-${index + 1}`;
}

export type McqRow = {
  id: string;
  question: string;
  options: string[];
  correct_index: number;
  explanation: string | null;
  chapter: string | null;
  difficulty: string;
};

export function normalizeOptions(value: unknown): string[] {
  if (Array.isArray(value)) return value.map((v) => String(v));
  return [];
}

export function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export const difficultyLabel: Record<string, string> = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};
