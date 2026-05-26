export type PromptAccess = "free" | "pro";
export type PromptDifficulty = "beginner" | "intermediate" | "advanced";

export type PromptVariable = {
  key: string;
  labelFa: string;
  example: string;
};

export type Prompt = {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  access: PromptAccess;
  difficulty: PromptDifficulty;
  models: string[];
  coverImage: string;
  imageAlt: string;
  promptText: string;
  negativePrompt?: string;
  variables: PromptVariable[];
  usageGuide: string[];
  bestFor: string;
};
