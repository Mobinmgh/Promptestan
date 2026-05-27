import { SkeletonGrid, SkeletonPanel } from "@/components/ui/skeletons";

export default function AdminLoading() {
  return (
    <section className="container-page py-8 md:py-10">
      <div className="mb-6 h-24 animate-pulse rounded-2xl bg-surface" />
      <SkeletonPanel />
      <div className="mt-6">
        <SkeletonGrid count={6} />
      </div>
    </section>
  );
}
