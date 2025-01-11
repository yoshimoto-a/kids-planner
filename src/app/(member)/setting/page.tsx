"use client";
import { ChildrenSection } from "./_components/ChildrenSection";
import { LongVacationSection } from "./_components/LongVacationSection/Index";
import { Toaster } from "react-hot-toast";
export default function Setting() {
  return (
    <div className="pt-[100px] px-2 flex flex-col gap-7 max-w-[480px] mx-auto">
      <Toaster />
      <section>
        <h2 className="text-lg">子ども情報設定</h2>
        <ChildrenSection />
      </section>
      <section>
        <h2 className="text-lg">長期休暇設定</h2>
        <LongVacationSection />
      </section>
    </div>
  );
}
