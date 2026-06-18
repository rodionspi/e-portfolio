// Non-translatable structured data shared across all locales.
export const profile = {
  name: "Rodion Spiridonov",
  email: "rodionspiridonov14@gmail.com",
  phone: "+41 76 410 04 55",
  github: "https://github.com/rodionspi",
  githubUser: "rodionspi",
  linkedin: "https://www.linkedin.com/in/rodion-spiridonov-95563b224",
  telegram: "https://t.me/tutrero",
  telegramHandle: "@tutrero",
  stackoverflow: "https://stackoverflow.com/users/20834893/rodion-spiridonov",
  cv: "/cv/Rodion-Spiridonov-CV.pdf",
  image: "/my-photo.jpeg",
} as const

export const educationYears = [
  "2024 – Present",
  "2023 – 2024",
  "2022 – 2023",
  "2018 – 2022",
  "2014 – 2018",
] as const

export const skillGroups = {
  expert: ["JavaScript", "TypeScript", "React", "Node.js", "HTML", "CSS"],
  advanced: ["Python", "SQL", "Git", "Docker", "MongoDB", "PostgreSQL"],
  intermediate: ["PHP", "Flask", "Django", "Linux", "Nginx", "REST APIs"],
} as const

export const languageLevels = [
  { key: "russian", level: 100, label: "C2" },
  { key: "ukrainian", level: 100, label: "C2" },
  { key: "german", level: 82, label: "B2/C1" },
  { key: "french", level: 60, label: "B1" },
  { key: "english", level: 82, label: "B2" },
] as const

export const projectsMeta = [
  {
    id: "fitness",
    github: "https://github.com/rodionspi/fit_muscle",
    website: "https://training-helper.vercel.app",
    tech: ["React", "TypeScript", "Node.js", "Database"],
  },
  {
    id: "telegram",
    github: "https://github.com/rodionspi/post_generator",
    website: "https://t.me/tgc_post_generator_bot",
    tech: ["Python", "Telegram Bot API", "Groq LLM"],
  },
  {
    id: "platteries",
    github: null,
    website: "https://platteries.com",
    tech: ["React", "Dashboard", "UI/UX"],
  },
  {
    id: "lusd",
    github: "https://github.com/rodionspi/LUSD",
    website: "https://lusd.vercel.app",
    tech: ["TypeScript", "Tailwind CSS", "Figma"],
  },
  {
    id: "Trattoria ",
    github: "https://github.com/rodionspi/trattoria-osvaldo",
    website: "https://trattoria-osvaldo.vercel.app/en",
    tech: ["TypeScript", "Tailwind CSS", "Figma"],
  },
] as const
