import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — StudyHub Nepal" },
      { name: "description", content: "Sign in to StudyHub Nepal to bookmark notes and track your reading progress." },
      { property: "og:title", content: "Login — StudyHub Nepal" },
      { property: "og:description", content: "Access your bookmarks, downloads and reading history." },
    ],
  }),
  component: Login,
});

function Login() {
  return (
    <main className="hero-surface grid min-h-[70vh] place-items-center px-4 py-16">
      <div className="glass w-full max-w-md rounded-3xl p-8 shadow-soft animate-fade-up">
        <img src={logo} alt="StudyHub Nepal logo" width={48} height={48} className="h-12 w-12" />
        <h1 className="mt-4 font-display text-2xl font-extrabold">Welcome back</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Sign in to save notes, bookmark chapters and continue reading where you left off.
        </p>

        <form
          className="mt-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            toast.info("Accounts go live once the backend is connected.");
          }}
        >
          <div>
            <label htmlFor="email" className="text-xs font-semibold">Email</label>
            <input
              id="email"
              type="email"
              required
              className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-xs font-semibold">Password</label>
            <input
              id="password"
              type="password"
              required
              className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </div>
          <button className="w-full rounded-full brand-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft">
            Sign in
          </button>
        </form>

        <p className="mt-5 text-center text-xs text-muted-foreground">
          New here? Create an account after we switch on accounts, or{" "}
          <Link to="/contact" className="text-primary hover:underline">
            contact us
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
