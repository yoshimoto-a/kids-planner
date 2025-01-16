import { useChildren } from "../../../_hooks/useChildren";
import { AddChild } from "./AddChild";
import { EditChild } from "./EditChild";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export const ChildrenSection: React.FC = () => {
  const { data, error } = useChildren();

  if (error)
    return <div className="pt-[60px] text-center">エラー発生しました</div>;

  return (
    <>
      <AddChild />
      <div className="flex flex-col gap-3 pt-2">
        {data ? (
          data.children.map(child => <EditChild key={child.id} child={child} />)
        ) : (
          <>
            <Skeleton width="100%" height={40} />
            <Skeleton width="100%" height={40} />
          </>
        )}
      </div>
    </>
  );
};
