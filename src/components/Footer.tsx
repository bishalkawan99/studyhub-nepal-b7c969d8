import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Youtube, Mail } from "lucide-react";
import logo from "@/assets/logo.png";
import { subjects } from "@/lib/study-data";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-card/50">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <img src={logo} alt="StudyHub Nepal logo" loading="lazy" width={36} height={36} className="h-9 w-9" />
            <span className="font-display text-lg font-extrabold">
              StudyHub <span className="brand-gradient-text">Nepal</span>
            </span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Free notes, solutions and practice for Class 11 and Class 12 students across Nepal.
          </p>
          <div className="mt-4 flex gap-2">
            {[Facebook, Instagram, Youtube, Mail].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold">Quick Links</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {[
              { to: "/notes", label: "Notes" },
              { to: "/mcqs", label: "MCQ Practice" },
              { to: "/past-papers", label: "Past Papers" },
              { to: "/blog", label: "Blog" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold">Popular Subjects</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {subjects.slice(0, 5).map((s) => (
              <li key={s.slug}>
                <Link
                  to="/$classSlug/$subjectSlug"
                  params={{ classSlug: "class-12", subjectSlug: s.slug }}
                  className="transition-colors hover:text-primary"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold">Legal</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/privacy" className="transition-colors hover:text-primary">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="transition-colors hover:text-primary">
                Terms of Use
              </Link>
            </li>
            <li>
              <Link to="/about" className="transition-colors hover:text-primary">
                About Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} StudyHub Nepal. Made with care for Nepali students.
      </div>
    </footer>
  );
}
