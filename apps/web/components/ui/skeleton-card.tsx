export function SkeletonCard() {
  return (
    <div className="animate-pulse overflow-hidden rounded-lg border border-gray-200 bg-white">
      {/* Image skeleton */}
      <div className="h-48 animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%]" />

      {/* Content skeleton */}
      <div className="space-y-4 p-4">
        {/* Title */}
        <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200" />

        {/* Description lines */}
        <div className="space-y-2">
          <div className="h-4 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />
        </div>

        {/* Rating */}
        <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />

        {/* Price */}
        <div className="h-6 w-1/3 animate-pulse rounded bg-gray-300" />

        {/* Button */}
        <div className="mt-4 h-10 animate-pulse rounded bg-gray-300" />
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
