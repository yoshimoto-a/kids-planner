import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";

export const SkeletonItem: React.FC = () => {
  return (
    <>
      <div className="flex justify-between items-center">
        <Skeleton width={60} height={30} borderRadius={8} />
        <Skeleton width={95} height={40} borderRadius={8} />
      </div>
      <Skeleton width="100%" height={300} borderRadius={8} />
    </>
  );
};
