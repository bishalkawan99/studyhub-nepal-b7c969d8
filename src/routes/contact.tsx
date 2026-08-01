import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, Youtube } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact StudyHub Nepal — Ask, Suggest, Report" },
      {
        name: "description",
        content: "Get in touch with StudyHub Nepal for study material requests, corrections or partnerships.",
      },
      { property: "og:title", content: "Contact StudyHub Nepal" },
      { property: "og:description", content: "Questions, suggestions or corrections? Send us a message." },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  message: z.string().trim().min(5, "Message is too short").max(1000),
});

const faqs = [
  { q: "Is StudyHub Nepal free?", a: "Yes. Every note, solution and past paper is free to read and download." },
  { q: "Which board do you cover?", a: "NEB Class 11 and Class 12, science and management streams." },
  { q: "Can I request a chapter?", a: "Absolutely — send the subject and chapter through this form." },
  { q: "Do I need an account?", a: "Only to bookmark, track progress and continue reading across devices." },
];

function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    const parsed = schema.safeParse(Object.fromEntries(form));
    if (!parsed.success) {
      const next: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (next[String(i.path[0])] = i.message));
      setErrors(next);
      return;
    }
    setErrors({});
    const { error } = await supabase.from("contact_messages").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      subject: "subject" in parsed.data ? (parsed.data as { subject?: string }).subject ?? null : null,
      message: parsed.data.message,
    });
    if (error) {
      toast.error("Could not send your message. Please try again.");
      return;
    }
    formEl.reset();
    toast.success("Message sent! We usually reply within a day.");
  }


  return (
    <main className="hero-surface">
      <section className="mx-auto max-w-7xl px-4 pt-14 lg:px-8">
        <h1 className="font-display text-4xl font-extrabold sm:text-5xl">Contact us</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Missing a chapter? Spotted a mistake? Want to contribute notes? We would love to hear from you.
        </p>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8">
        <form onSubmit={onSubmit} className="rounded-3xl border border-border bg-card p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="text-xs font-semibold">Name</label>
              <input
                id="name"
                name="name"
                maxLength={100}
                className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
              {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="email" className="text-xs font-semibold">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                maxLength={255}
                className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
              {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="message" className="text-xs font-semibold">Message</label>
            <textarea
              id="message"
              name="message"
              rows={6}
              maxLength={1000}
              className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            />
            {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
          </div>
          <button className="mt-5 rounded-full brand-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-105">
            Send message
          </button>
        </form>

        <aside className="space-y-4">
          <div className="rounded-3xl border border-border bg-card p-6 text-sm">
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" /> hello@studyhubnepal.com
            </p>
            <p className="mt-3 flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" /> Kathmandu, Nepal
            </p>
            <div className="mt-4 flex gap-2">
              {[Facebook, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl border border-border">
            <iframe
              title="StudyHub Nepal location"
              src="https://www.openstreetmap.org/export/embed.html?bbox=85.28%2C27.68%2C85.36%2C27.74&layer=mapnik"
              className="h-56 w-full"
              loading="lazy"
            />
          </div>
        </aside>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-16 lg:px-8">
        <h2 className="font-display text-2xl font-extrabold">FAQ</h2>
        <div className="mt-5 space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="rounded-2xl border border-border bg-card p-4">
              <summary className="cursor-pointer text-sm font-semibold">{f.q}</summary>
              <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
