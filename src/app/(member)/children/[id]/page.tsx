"use client";
import { Button } from "@/app/_components/Button";
import { useChildHomeworks } from "./_hooks/useChildHomeworks";
import { useParams } from "next/navigation";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { HomeworkItem } from "./_components/HomeworkItem";
import { PrintArea } from "../../../_components/PrintArea";
import { SkeletonItem } from "./_components/SkeletonItem";
export default function ChildHomework() {
  const { id } = useParams();
  const { data, error, mutate } = useChildHomeworks({ childId: id as string });
  const contentRef = useRef<HTMLDivElement | null>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  if (!data) return <SkeletonItem />;
  if (error) return <div className="text-center pt-20">エラー発生</div>;
  return (
    <div className="max-w-[480px] mx-auto py-[72px] p-2">
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
      <PrintArea contentRef={contentRef} childId={id as string} />
    </div>
  );
}
