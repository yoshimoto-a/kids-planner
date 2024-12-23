"use client";
import { useChildHomeworks } from "./_hooks/useChildHomeworks";
import { useParams } from "next/navigation";
import dayjs from "dayjs";
export default function ChildHomework() {
  const { id } = useParams();
  const { data, error } = useChildHomeworks({ childId: id as string });
  if (!data) return <div className="text-center pt-20">読込み中...</div>;
  if (error) return <div className="text-center pt-20">エラー発生</div>;
  return (
    <div className="max-w-[480px] mx-auto pt-[72px]">
      <h2 className="text-2xl py-5">{data.child.name}ちゃん</h2>
      <div className="flex items-start justify-between flex-wrap gap-5">
        {data.homeworks.map(homework => (
          <div key={homework.id} className="p-8  border rounded-md">
            <div className="pt-3 flex flex-col gap-1">
              <div>{homework.title}</div>
              <div>
                <span>詳細:</span>
                {homework.description}
              </div>
              <div>
                <span>提出日:</span>
                {dayjs(homework.dueDate).format("M月D日")}
              </div>
            </div>
            <div className="pt-3 flex flex-col items-center gap-2">
              <div>シール</div>
              <div className="rounded-full border w-32 h-32"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
