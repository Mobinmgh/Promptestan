export const modelOptions = [
  "ChatGPT Image",
  "Midjourney",
  "Gemini",
  "Stable Diffusion",
  "Flux",
  "Leonardo",
  "Firefly",
];

export const difficultyOptions = ["beginner", "intermediate", "advanced"] as const;
export const accessOptions = ["free", "pro"] as const;

export const difficultyLabels: Record<string, string> = {
  beginner: "مبتدی",
  intermediate: "متوسط",
  advanced: "پیشرفته",
};

export const accessLabels: Record<string, string> = {
  free: "رایگان",
  pro: "حرفه‌ای",
};
