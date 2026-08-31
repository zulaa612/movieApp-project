import { Skeleton } from "./components/Skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="h-20 flex items-center justify-between px-10">
        <Skeleton className="w-32 h-8" />

        <div className="flex gap-4">
          <Skeleton className="w-40 h-10" />
          <Skeleton className="w-10 h-10 rounded-full" />
        </div>
      </div>

      {/* Hero */}
      <Skeleton className="w-full h-150 rounded-none" />

      {/* Movie section */}
      <div className="px-10 py-10">
        <Skeleton className="w-48 h-7 mb-8" />

        <div className="flex gap-12">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="w-41.25">
              <Skeleton className="w-41.25 h-60" />

              <Skeleton className="mt-3 w-35 h-5" />

              <Skeleton className="mt-2 w-15 h-4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
