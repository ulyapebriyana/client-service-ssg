import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="container py-6">
      <div className="grid gap-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Skeleton className="h-40 w-full rounded-xl" />
          <Skeleton className="h-40 w-full rounded-xl" />
          <Skeleton className="h-40 w-full rounded-xl" />
          <Skeleton className="h-40 w-full rounded-xl" />
        </div>
        <div className="flex flex-col gap-4 md:flex-row">
          <Skeleton className="h-80 w-full rounded-xl md:h-96" />
          <Skeleton className="h-60 w-full rounded-xl md:h-96" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
