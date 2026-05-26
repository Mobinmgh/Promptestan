export type PromptAccess = "free" | "pro";
export type PromptDifficulty = "beginner" | "intermediate" | "advanced";

export type PromptVariable = {
  key: string;
  labelFa: string;
  example: string;
};

export type Prompt = {
  id?: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  categorySlug?: string;
  tags: string[];
  access: PromptAccess;
  difficulty: PromptDifficulty;
  models: string[];
  coverImage: string;
  imageAlt: string;
  promptText: string | null;
  promptPreview?: string | null;
  negativePrompt?: string | null;
  variables: PromptVariable[];
  usageGuide: string[];
  bestFor: string;
};

export type Category = {
  id?: string;
  name: string;
  slug: string;
  description: string;
  count: number;
};
