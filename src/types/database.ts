export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string | null;
          full_name: string | null;
          role: "user" | "admin";
          subscription_status: "free" | "pro";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          full_name?: string | null;
          role?: "user" | "admin";
          subscription_status?: "free" | "pro";
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
      };
      categories: {
        Row: {
          id: string;
          name_fa: string;
          name_en: string | null;
          slug: string;
          description: string | null;
          parent_id: string | null;
          sort_order: number;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["categories"]["Row"]> & {
          name_fa: string;
          slug: string;
        };
        Update: Partial<Database["public"]["Tables"]["categories"]["Insert"]>;
      };
      tags: {
        Row: {
          id: string;
          name: string;
          slug: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["tags"]["Insert"]>;
      };
      prompts: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string | null;
          prompt_text: string;
          negative_prompt: string | null;
          variables: Json;
          usage_notes_fa: string | null;
          best_for: string | null;
          model_compatibility: string[];
          difficulty: "beginner" | "intermediate" | "advanced";
          access_level: "free" | "pro";
          category_id: string | null;
          cover_image_url: string | null;
          example_images: string[];
          is_published: boolean;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["prompts"]["Row"]> & {
          title: string;
          slug: string;
          prompt_text: string;
        };
        Update: Partial<Database["public"]["Tables"]["prompts"]["Insert"]>;
      };
      prompt_tags: {
        Row: {
          prompt_id: string;
          tag_id: string;
        };
        Insert: {
          prompt_id: string;
          tag_id: string;
        };
        Update: Partial<Database["public"]["Tables"]["prompt_tags"]["Insert"]>;
      };
      favorites: {
        Row: {
          user_id: string;
          prompt_id: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          prompt_id: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["favorites"]["Insert"]>;
      };
    };
    Views: Record<string, never>;
    Functions: {
      get_public_prompts: {
        Args: Record<string, never>;
        Returns: PublicPromptRow[];
      };
      get_public_prompt_by_slug: {
        Args: { p_slug: string };
        Returns: PublicPromptRow[];
      };
      get_public_categories: {
        Args: Record<string, never>;
        Returns: PublicCategoryRow[];
      };
      get_public_category_by_slug: {
        Args: { p_slug: string };
        Returns: PublicCategoryRow[];
      };
      get_public_prompts_by_category_slug: {
        Args: { p_category_slug: string };
        Returns: PublicPromptRow[];
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type PublicPromptRow = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  prompt_text: string | null;
  prompt_preview: string | null;
  negative_prompt: string | null;
  variables: Json;
  usage_notes_fa: string | null;
  best_for: string | null;
  model_compatibility: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  access_level: "free" | "pro";
  cover_image_url: string | null;
  example_images: string[];
  category_name: string | null;
  category_slug: string | null;
  tags: string[];
};

export type PublicCategoryRow = {
  id: string;
  name_fa: string;
  name_en: string | null;
  slug: string;
  description: string | null;
  prompt_count: number;
};
