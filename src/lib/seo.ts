/**
 * Shared SEO helpers so every route ships a unique title, description,
 * canonical URL, Open Graph + Twitter Card metadata and structured data.
 * Paths stay relative — crawlers resolve them against the live host.
 */

export const SITE_NAME = "StudyHub Nepal";

type SeoInput = {
  path: string;
  title: string;
  description: string;
  type?: "website" | "article";
  image?: string;
};

export function seoMeta({ path, title, description, type = "website", image }: SeoInput) {
  const meta: Array<Record<string, string>> = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: path },
    { property: "og:site_name", content: SITE_NAME },
    { name: "twitter:card", content: image ? "summary_large_image" : "summary" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];
  if (image) {
    meta.push({ property: "og:image", content: image });
    meta.push({ name: "twitter:image", content: image });
  }
  return meta;
}

export function canonical(path: string) {
  return [{ rel: "canonical", href: path }];
}

/** Convenience: full `head()` payload for a simple page. */
export function seoHead(input: SeoInput, extraScripts: Array<Record<string, unknown>> = []) {
  return {
    meta: seoMeta(input),
    links: canonical(input.path),
    ...(extraScripts.length ? { scripts: extraScripts } : {}),
  };
}

export function jsonLd(data: unknown) {
  return { type: "application/ld+json", children: JSON.stringify(data) };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return jsonLd({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path,
    })),
  });
}

export function faqSchema(faqs: Array<{ question: string; answer: string }>) {
  return jsonLd({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  });
}

export function educationalOrganizationSchema() {
  return jsonLd({
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: SITE_NAME,
    description:
      "Free NEB Class 11 and Class 12 study resources for students in Nepal: notes, exercise answers, MCQs, model questions, past papers and a GPA calculator.",
    areaServed: "NP",
    address: { "@type": "PostalAddress", addressCountry: "NP" },
  });
}

export function webSiteSchema() {
  return jsonLd({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    inLanguage: "en-NP",
    potentialAction: {
      "@type": "SearchAction",
      target: "/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  });
}
