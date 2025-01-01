"use client";
import { Button } from "@/app/_components/Button";
import { useChildHomeworks } from "./_hooks/useChildHomeworks";
import { useParams } from "next/navigation";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { HomeworkItem } from "./_components/HomeworkItem";
export default function ChildHomework() {
  const { id } = useParams();
  const { data, error, mutate } = useChildHomeworks({ childId: id as string });
  const contentRef = useRef<HTMLDivElement | null>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  if (!data) return <div className="text-center pt-20">読込み中...</div>;
  if (error) return <div className="text-center pt-20">エラー発生</div>;
  return (
    <div className="max-w-[480px] mx-auto pt-[72px] p-2">
      <div className="flex justify-between pb-2">
        <h2 className="text-2xl py-5">{data.child.name}</h2>
        <div className="py-4">
          <Button
            type="button"
            variant="bg-gray"
            onClick={() => reactToPrintFn()}
          >
            印刷する
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5">
        {data.homeworks.map(homework => (
          <HomeworkItem homework={homework} mutate={mutate} key={homework.id} />
        ))}
      </div>

      {/* 印刷用の要素 (通常表示では非表示) */}
      <div className="print-only hidden" ref={contentRef}>
        <div className="p-10">
          <h2 className="text-xl mb-5">{data.child.name}の宿題一覧</h2>
          <div className="grid grid-cols-2 gap-4">
            {data.homeworks.map(homework => (
              <div
                key={homework.id}
                className="border p-4 rounded-md flex justify-between items-center"
              >
                <div>
                  <div className="font-bold">{homework.title}</div>
                  <div className="text-sm">{homework.description}</div>
                </div>
                <div className="w-[50px] h-[50px] border rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
