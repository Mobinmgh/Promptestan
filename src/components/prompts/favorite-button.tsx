import Link from "next/link";
import { Bookmark } from "lucide-react";
import { savePrompt, unsavePrompt } from "@/app/favorites/actions";

export function FavoriteButton({
  promptId,
  slug,
  isSaved,
  isLoggedIn,
}: {
  promptId?: string;
  slug: string;
  isSaved: boolean;
  isLoggedIn: boolean;
}) {
  if (!promptId) {
    return null;
  }

  if (!isLoggedIn) {
    return (
      <Link
        href="/login"
        className="inline-flex items-center gap-2 rounded-lg border border-border bg-background-soft px-3 py-2 text-xs font-bold text-text-muted transition hover:border-accent/70 hover:text-text"
      >
        <Bookmark size={15} />
        ذخیره
      </Link>
    );
  }

  return (
    <form action={isSaved ? unsavePrompt : savePrompt}>
      <input type="hidden" name="prompt_id" value={promptId} />
      <input type="hidden" name="slug" value={slug} />
      <button
        type="submit"
        className={
          isSaved
            ? "inline-flex items-center gap-2 rounded-lg border border-accent/50 bg-accent/15 px-3 py-2 text-xs font-bold text-indigo-100"
            : "inline-flex items-center gap-2 rounded-lg border border-border bg-background-soft px-3 py-2 text-xs font-bold text-text-muted transition hover:border-accent/70 hover:text-text"
        }
      >
        <Bookmark size={15} />
        {isSaved ? "ذخیره‌شده" : "ذخیره"}
      </button>
    </form>
  );
}
