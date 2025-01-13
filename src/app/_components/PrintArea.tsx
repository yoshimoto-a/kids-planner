import { RefObject } from "react";
import { useChildHomeworks } from "../(member)/children/[id]/_hooks/useChildHomeworks";

interface Props {
  contentRef?: RefObject<HTMLDivElement | null>;
  childId: string;
  print?: boolean;
}
export const PrintArea: React.FC<Props> = ({
  contentRef,
  childId,
  print = false,
}) => {
  const { data, error } = useChildHomeworks({ childId });
  if (!data) return <div className="text-center pt-20">読込み中...</div>;
  if (error) return <div className="text-center pt-20">エラー発生</div>;

  return (
    <div
      className={`${
        print
          ? "print-only hidden"
          : "z-[9999] bg-white relative w-[630px] h-[891px]"
      }`}
      ref={contentRef}
    >
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
