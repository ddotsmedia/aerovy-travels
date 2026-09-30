import { SkeletonGrid } from "@/components/ui/skeleton-card";

export default function ExperiencesLoading() {
  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto max-w-7xl px-4 py-16 md:py-20">
        <div className="mb-8 h-12 w-1/3 animate-pulse rounded bg-gray-200" />
        <SkeletonGrid count={9} />
      </section>
    </main>
  );
}
