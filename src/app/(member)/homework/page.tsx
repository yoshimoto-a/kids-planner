"use client";
import { HomeworkIndex } from "./_components/HomeworkIndex";
export default function Homework() {
  return (
    <div className="py-[70px] px-2 flex flex-col gap-7 max-w-[480px] mx-auto">
      <div className="text-lg">宿題一覧</div>
      <HomeworkIndex />
    </div>
  );
}
