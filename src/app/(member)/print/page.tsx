"use client";
import { useChildren } from "../_hooks/useChildren";
import { Pdf } from "./_components/Pdf";
import { SkeletonItem } from "./_components/SkeletonItem";

export default function Print() {
  const { data, error } = useChildren();
  if (error) return <div className="text-center pt-20">データ取得に失敗</div>;

  return (
    <div className="max-w-[480px] mx-auto pt-[72px] pb-[60px] px-2">
      <h3 className="text-lx">宿題印刷</h3>
      <div className="pt-5 flex gap-4 h-[390px]">
        {data ? (
          data.children.map(child => (
            <div key={child.id} className="flex-1">
              <div className="font-bold">{child.name}</div>
              <Pdf childId={child.id} />
            </div>
          ))
        ) : (
          <>
            <SkeletonItem />
            <SkeletonItem />
          </>
        )}
      </div>
    </div>
  );
}
