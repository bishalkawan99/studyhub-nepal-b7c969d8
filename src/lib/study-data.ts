export type Subject = {
  slug: string;
  name: string;
  icon: string;
  blurb: string;
  chapters: string[];
};

const chapterSets: Record<string, string[]> = {
  nepali: ["गद्य खण्ड – परिचय", "कविता खण्ड", "निबन्ध लेखन", "व्याकरण", "पत्र लेखन", "समालोचना"],
  english: [
    "Short Stories",
    "Poems",
    "Essays",
    "One Act Plays",
    "Grammar & Usage",
    "Writing Skills",
  ],
  mathematics: [
    "Sets and Real Numbers",
    "Functions",
    "Curve Sketching",
    "Sequence and Series",
    "Matrices and Determinants",
    "Complex Numbers",
    "Limits and Continuity",
    "Derivatives",
    "Antiderivatives",
    "Vectors",
    "Statistics and Probability",
  ],
  physics: [
    "Physical Quantities",
    "Kinematics",
    "Dynamics",
    "Work, Energy and Power",
    "Circular Motion",
    "Heat and Thermodynamics",
    "Geometrical Optics",
    "Electrostatics",
    "Current Electricity",
    "Modern Physics",
  ],
  chemistry: [
    "General and Physical Chemistry",
    "Atomic Structure",
    "Periodic Table",
    "Chemical Bonding",
    "Stoichiometry",
    "States of Matter",
    "Inorganic Chemistry",
    "Organic Chemistry",
    "Applied Chemistry",
  ],
  biology: [
    "Introduction to Biology",
    "Cell Biology",
    "Biomolecules",
    "Genetics",
    "Biodiversity",
    "Plant Anatomy",
    "Animal Tissues",
    "Ecology",
  ],
  computer: [
    "Computer Fundamentals",
    "Number System",
    "Computer Software",
    "Operating System",
    "Word Processing",
    "Database Management",
    "Programming in C",
    "Web Technology",
  ],
  accountancy: [
    "Accounting for Companies",
    "Financial Statements",
    "Cash Flow Statement",
    "Cost Accounting",
    "Ratio Analysis",
    "Government Accounting",
  ],
  economics: [
    "Introduction to Economics",
    "Demand and Supply",
    "Theory of Production",
    "Market Structures",
    "National Income",
    "Nepalese Economy",
  ],
  business: [
    "Introduction to Business",
    "Business Environment",
    "Forms of Business",
    "Business Planning",
    "Marketing Management",
    "Human Resource Management",
  ],
};

export const subjects: Subject[] = [
  { slug: "nepali", name: "Nepali", icon: "📖", blurb: "गद्य, कविता, व्याकरण र निबन्ध" },
  { slug: "english", name: "English", icon: "✍️", blurb: "Stories, poems and writing skills" },
  {
    slug: "mathematics",
    name: "Compulsory Mathematics",
    icon: "📐",
    blurb: "Calculus, algebra and vectors",
  },
  { slug: "physics", name: "Physics", icon: "🧲", blurb: "Mechanics, heat, optics and more" },
  { slug: "chemistry", name: "Chemistry", icon: "⚗️", blurb: "Physical, organic and inorganic" },
  { slug: "biology", name: "Biology", icon: "🧬", blurb: "Botany, zoology and genetics" },
  { slug: "computer", name: "Computer Science", icon: "💻", blurb: "Programming, DBMS and web" },
  { slug: "accountancy", name: "Accountancy", icon: "🧾", blurb: "Company and cost accounting" },
  { slug: "economics", name: "Economics", icon: "📈", blurb: "Micro, macro and Nepalese economy" },
  { slug: "business", name: "Business Studies", icon: "🏢", blurb: "Management and marketing" },
].map((s) => ({ ...s, chapters: chapterSets[s.slug] }));

export const classes = ["11", "12"] as const;
export type ClassId = (typeof classes)[number];

export function getSubject(slug: string) {
  return subjects.find((s) => s.slug === slug);
}

export type Resource = {
  title: string;
  subject: string;
  classId: string;
  meta: string;
};

export function buildResources(kind: string): Resource[] {
  return classes.flatMap((classId) =>
    subjects.map((s) => ({
      title: `Class ${classId} ${s.name} — ${kind}`,
      subject: s.name,
      classId,
      meta: `${s.chapters.length} chapters · PDF`,
    })),
  );
}

export const searchIndex = classes.flatMap((classId) =>
  subjects.flatMap((s) => [
    {
      label: `Class ${classId} ${s.name} Notes`,
      type: "Notes",
      to: `/class-${classId}/${s.slug}`,
    },
    ...s.chapters.map((c) => ({
      label: `${c} — Class ${classId} ${s.name}`,
      type: "Chapter",
      to: `/class-${classId}/${s.slug}`,
    })),
  ]),
);

export const blogPosts = [
  {
    slug: "study-tips",
    title: "10 Study Techniques That Actually Work for NEB Students",
    category: "Study Tips",
    excerpt:
      "Active recall, spaced repetition and how to build a routine that survives load-shedding.",
    date: "2026-07-12",
  },
  {
    slug: "exam-preparation",
    title: "NEB Board Exam Preparation Plan: Last 60 Days",
    category: "Exam Preparation",
    excerpt:
      "A week-by-week revision plan for Class 12 students across science and management streams.",
    date: "2026-06-28",
  },
  {
    slug: "career-guidance",
    title: "After +2: Choosing the Right Career Path in Nepal",
    category: "Career Guidance",
    excerpt: "Engineering, medicine, CSIT, BBA or abroad — how to decide without the pressure.",
    date: "2026-06-10",
  },
  {
    slug: "university-admission",
    title: "University Admission Guide: IOE, IOM, TU and KU",
    category: "University Admission",
    excerpt: "Entrance dates, syllabus coverage and application checklists in one place.",
    date: "2026-05-22",
  },
  {
    slug: "scholarship",
    title: "Scholarships Every Nepali Student Should Apply For",
    category: "Scholarship",
    excerpt: "Government quotas, university merit awards and international opportunities.",
    date: "2026-05-04",
  },
  {
    slug: "programming",
    title: "Learn Programming Alongside Class 12 Computer Science",
    category: "Programming",
    excerpt: "From C basics to your first web project — a practical roadmap for students.",
    date: "2026-04-18",
  },
];

export const mcqBank = [
  {
    q: "The SI unit of electric charge is:",
    options: ["Coulomb", "Ampere", "Volt", "Ohm"],
    answer: 0,
    why: "Charge is measured in coulombs (C); ampere is the unit of current.",
  },
  {
    q: "Which of the following is a scalar quantity?",
    options: ["Velocity", "Displacement", "Work", "Acceleration"],
    answer: 2,
    why: "Work has magnitude only, so it is a scalar.",
  },
  {
    q: "The derivative of sin x with respect to x is:",
    options: ["-sin x", "cos x", "-cos x", "tan x"],
    answer: 1,
    why: "d/dx (sin x) = cos x.",
  },
  {
    q: "Which gas is most abundant in the Earth's atmosphere?",
    options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Argon"],
    answer: 2,
    why: "Nitrogen makes up about 78% of the atmosphere.",
  },
  {
    q: "In C programming, which keyword is used to define a constant?",
    options: ["static", "const", "final", "fixed"],
    answer: 1,
    why: "`const` marks a value as read-only in C.",
  },
  {
    q: "The powerhouse of the cell is:",
    options: ["Ribosome", "Nucleus", "Mitochondria", "Golgi body"],
    answer: 2,
    why: "Mitochondria produce ATP, the cell's energy currency.",
  },
];

export const leaderboard = [
  { name: "Aayush Shrestha", score: 98, place: "Kathmandu" },
  { name: "Sneha Karki", score: 95, place: "Pokhara" },
  { name: "Bibek Tamang", score: 93, place: "Biratnagar" },
  { name: "Prasamsa Adhikari", score: 91, place: "Butwal" },
  { name: "Nabin Bhandari", score: 88, place: "Dharan" },
];
