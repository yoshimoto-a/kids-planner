"use client";
import { Contents } from "./_components/Contents";
import { Toaster } from "react-hot-toast";
export default function Dashboard() {
  return (
    <div className="max-w-[480px] mx-auto pt-[72px] p-2">
      <Toaster position="top-center" />
      <Contents />
    </div>
  );
}
