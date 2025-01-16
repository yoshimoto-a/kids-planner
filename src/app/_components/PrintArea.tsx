import { RefObject } from "react";
import { useChildHomeworks } from "../(member)/children/[id]/_hooks/useChildHomeworks";

interface Props {
  contentRef: RefObject<HTMLDivElement | null>;
  childId: string;
}
export const PrintArea: React.FC<Props> = ({ contentRef, childId }) => {
  const { data, error } = useChildHomeworks({ childId });
  if (!data) return;
  if (error) return;

  return (
    <div className="print-only hidden" ref={contentRef}>
      <div className="p-10">
        <h2 className="text-xl mb-5">{data.child.name}の宿題一覧</h2>
        <div className="grid grid-cols-2 gap-4">
          {data.homeworks.map(homework => (
            <div
              key={homework.id}
              className="border p-4 rounded-md flex justify-between items-center"
            >
              <div className="">
                <div className="font-bold">{homework.title}</div>
                <div className="text-sm">{homework.description}</div>
              </div>
              <div className="">
                <div className="w-[50px] h-[50px] border rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
