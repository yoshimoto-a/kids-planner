"use client";
import { useDashboard } from "../_hooks/useDashboard";
import { ChildrenSection } from "./ChildrenSection";
import { HomeworkSection } from "./HomeworkSenction";
import { LongVacationSection } from "./LongVacationSection";
export const Contents: React.FC = () => {
  const { data, error, mutate } = useDashboard();
  if (!data) return <div className="text-center pt-20">読込み中...</div>;
  if (error) return <div className="text-center pt-20">データ取得に失敗</div>;
  return (
    <div className="w-full">
      <div className="text-right">ログインユーザー:{data.user.name}</div>
      <ChildrenSection data={data} mutate={mutate} />
      <LongVacationSection></LongVacationSection>
      <HomeworkSection data={data} mutate={mutate} />
    </div>
  );
};
