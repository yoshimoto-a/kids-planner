import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export const SkeletonItem: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex gap-3">
          <SkeletonTheme width={120} height={40}>
            <Skeleton />
            <Skeleton />
          </SkeletonTheme>
        </div>
        <Skeleton />
      </div>
      <Skeleton width="100%" height={200} />
    </div>
  );
};
