export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header skeleton */}
      <div className="border-border bg-bg border-b">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="bg-surface h-8 w-32 animate-pulse rounded-md" />
        </div>
      </div>

      {/* Hero skeleton */}
      <div className="bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="space-y-4">
            <div className="bg-bg h-12 w-2/3 animate-pulse rounded-lg" />
            <div className="bg-bg h-6 w-full animate-pulse rounded-lg" />
            <div className="bg-bg h-6 w-5/6 animate-pulse rounded-lg" />
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="mx-auto max-w-7xl flex-1 px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border-border bg-bg space-y-4 rounded-lg border p-4">
              <div className="bg-surface aspect-video animate-pulse rounded-md" />
              <div className="bg-surface h-4 w-3/4 animate-pulse rounded" />
              <div className="bg-surface h-4 w-1/2 animate-pulse rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
