import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { to: "/", label: "Home" },
  { to: "/notes", label: "Notes" },
  { to: "/exercise-answers", label: "Exercise Answers" },
  { to: "/question-bank", label: "Question Bank" },
  { to: "/mcqs", label: "MCQs" },
  { to: "/model-questions", label: "Model Questions" },
  { to: "/past-papers", label: "Past Papers" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      ref={ref}
      className={`sticky top-0 z-50 w-full transition-all ${
        scrolled ? "glass shadow-soft" : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 lg:px-8">
        <Link to="/" className="flex min-w-0 shrink-0 items-center gap-2">
          <img src={logo} alt="StudyHub Nepal logo" width={40} height={40} className="h-9 w-9 shrink-0" />
          <span className="truncate whitespace-nowrap font-display text-lg font-extrabold">
            StudyHub <span className="brand-gradient-text">Nepal</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <ul className="hidden items-center gap-1 xl:flex">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  activeOptions={{ exact: l.to === "/" }}
                  activeProps={{ className: "text-primary" }}
                  className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
          <Link
            to="/login"
            className="hidden rounded-full brand-gradient px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-105 sm:inline-flex"
          >
            Login
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card xl:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="glass border-t border-border xl:hidden">
          <ul className="mx-auto grid max-w-7xl gap-1 px-4 py-3">
            {[...links, { to: "/login", label: "Login" } as const].map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
