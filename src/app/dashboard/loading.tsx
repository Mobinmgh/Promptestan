import { SkeletonGrid, SkeletonPanel } from "@/components/ui/skeletons";

export default function DashboardLoading() {
  return (
    <section className="container-page py-10 md:py-14">
      <div className="mb-8">
        <SkeletonPanel />
      </div>
      <SkeletonGrid count={3} />
    </section>
  );
}
