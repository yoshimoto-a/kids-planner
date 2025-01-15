import { useChildren } from "../../../_hooks/useChildren";
import { AddChild } from "./AddChild";
import { EditChild } from "./EditChild";
export const ChildrenSection: React.FC = () => {
  const { data, error } = useChildren();

  if (!data) return <div className="pt-[60px] text-center">読込み中...</div>;
  if (error)
    return <div className="pt-[60px] text-center">エラー発生しました</div>;

  return (
    <>
      <AddChild />
      <div className="flex flex-col gap-3">
        {data.children.map(child => (
          <EditChild key={child.id} child={child} />
        ))}
      </div>
    </>
  );
};
