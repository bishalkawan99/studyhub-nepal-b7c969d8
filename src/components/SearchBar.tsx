import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { searchIndex } from "@/lib/study-data";

export function SearchBar({ placeholder = "Search subject, chapter, notes, MCQs…" }: { placeholder?: string }) {
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (term.length < 2) return [];
    return searchIndex.filter((r) => r.label.toLowerCase().includes(term)).slice(0, 8);
  }, [q]);

  return (
    <div className="relative w-full max-w-2xl">
      <div className="glass flex items-center gap-3 rounded-2xl px-4 py-3 shadow-soft">
        <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeholder}
          aria-label="Search study material"
          className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        <kbd className="hidden shrink-0 rounded-md border border-border px-2 py-1 text-[10px] text-muted-foreground sm:block">
          Instant
        </kbd>
      </div>

      {results.length > 0 && (
        <ul className="absolute z-40 mt-2 w-full overflow-hidden rounded-2xl border border-border bg-popover shadow-soft animate-fade-in">
          {results.map((r, i) => (
            <li key={i}>
              <Link
                to={r.to}
                onClick={() => setQ("")}
                className="flex items-center justify-between gap-3 px-4 py-3 text-sm transition-colors hover:bg-muted"
              >
                <span className="truncate">{r.label}</span>
                <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-[10px] uppercase text-muted-foreground">
                  {r.type}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
