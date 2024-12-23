"use client";
import { Contents } from "./_components/Contents";
export default function Dashboard() {
  return (
    <div className="max-w-[480px] mx-auto pt-[72px]">
      <h2 className="text-4xl pt-5">管理画面</h2>
      <Contents />
    </div>
  );
}
