import Image from "next/image";
import { cn } from "@/lib/utils";

export function BrandLogo({ className, showText = true }: { className?: string; showText?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <Image
        src="/brand/logo-mark.svg"
        alt="لوگوی پرامپتستان"
        width={36}
        height={36}
        className="h-9 w-9 shrink-0 rounded-lg"
        priority
      />
      {showText ? <span className="text-lg font-bold text-text">پرامپتستان</span> : null}
    </span>
  );
}
