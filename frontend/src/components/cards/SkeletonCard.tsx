import { Skeleton } from "../ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3 w-full">
      <Skeleton className="h-[125px] w-full rounded-xl bg-gray-300" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full bg-gray-300" />
        <Skeleton className="h-4 w-full bg-gray-300" />
      </div>
    </div>
  );
}
