import {
  Atom,
  BookOpen,
  Briefcase,
  Calculator,
  Dna,
  FlaskConical,
  LineChart,
  Laptop,
  PenLine,
  Receipt,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  nepali: BookOpen,
  english: PenLine,
  mathematics: Calculator,
  physics: Atom,
  chemistry: FlaskConical,
  biology: Dna,
  computer: Laptop,
  accountancy: Receipt,
  economics: LineChart,
  business: Briefcase,
};

export function SubjectIcon({ slug, className = "h-5 w-5" }: { slug: string; className?: string }) {
  const Icon = map[slug] ?? BookOpen;
  return <Icon className={className} />;
}
