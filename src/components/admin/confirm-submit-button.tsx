"use client";

export function ConfirmSubmitButton({
  children,
  className,
  message = "مطمئنی می‌خوای حذف کنی؟",
}: {
  children: React.ReactNode;
  className?: string;
  message?: string;
}) {
  return (
    <button
      type="submit"
      onClick={(event) => {
        if (!window.confirm(message)) {
          event.preventDefault();
        }
      }}
      className={className}
    >
      {children}
    </button>
  );
}
