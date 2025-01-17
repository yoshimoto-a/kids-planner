import "react-loading-skeleton/dist/skeleton.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
export const SkeletonItem: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 pt-[72px] p-2 max-w-[480px] mx-auto">
      <div className="flex justify-between items-center">
        <Skeleton width={80} height={40} borderRadius={8} />
        <Skeleton width={100} height={40} borderRadius={8} />
      </div>
      <div className="grid grid-cols-2 gap-5">
        <SkeletonTheme width="100%" height={230} borderRadius={8}>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </SkeletonTheme>
      </div>
    </div>
  );
};
