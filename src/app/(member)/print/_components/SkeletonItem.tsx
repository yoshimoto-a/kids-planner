import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const SkeletonItem: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col gap-4">
      <Skeleton width="80%" height={30} borderRadius={8} />
      <Skeleton width="100%" height={300} borderRadius={8} />
    </div>
  );
};
