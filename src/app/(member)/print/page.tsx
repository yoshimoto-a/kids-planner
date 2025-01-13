"use client";
import { useChildren } from "../_hooks/useChildren";
import { Pdf } from "./_components/Pdf";

export default function Print() {
  const { data, error } = useChildren();
  if (!data) return <div className="text-center pt-20">読込み中...</div>;
  if (error) return <div className="text-center pt-20">データ取得に失敗</div>;
  //プレビュー表示してみたい

  return (
    <div className="max-w-[480px] mx-auto pt-[72px] pb-[60px] px-2">
      <h3 className="text-lx">宿題印刷</h3>
      <div className="pt-5 flex justify-between gap-2 h-[390px]">
        {data.children.map(child => (
          <div key={child.id}>
            <div>{child.name} </div>
            <Pdf childId={child.id} />
          </div>
        ))}
      </div>
    </div>
  );
}
