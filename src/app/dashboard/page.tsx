"use client";
import { Contents } from "./_components/Contents";
import { Toaster } from "react-hot-toast";
export default function Dashboard() {
  return (
    <div className="max-w-[480px] mx-auto pt-[72px]">
      <Toaster position="top-center" />
      <h2 className="text-4xl pt-5">管理画面</h2>
      <Contents />
    </div>
  );
}
