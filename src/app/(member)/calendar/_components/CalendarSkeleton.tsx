import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export const CalendarSkeleton: React.FC = () => {
  return (
    <>
      <div className="flex justify-between items-center mb-4 px-2">
        <Skeleton width={30} height={30} borderRadius="50%" />
        <Skeleton width={120} height={20} />
        <div className="flex gap-2">
          <SkeletonTheme width={30} height={30} borderRadius="50%">
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </SkeletonTheme>
        </div>
      </div>
      <div className="w-full">
        <Skeleton width="100%" height={200} />
      </div>
    </>
  );
};
