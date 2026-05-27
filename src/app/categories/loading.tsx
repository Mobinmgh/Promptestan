import { SkeletonGrid } from "@/components/ui/skeletons";

export default function CategoriesLoading() {
  return (
    <section className="container-page py-10 md:py-14">
      <div className="mx-auto mb-9 h-24 max-w-3xl animate-pulse rounded-2xl bg-surface" />
      <SkeletonGrid count={6} />
    </section>
  );
}
