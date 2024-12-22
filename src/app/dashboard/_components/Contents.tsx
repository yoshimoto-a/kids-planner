"use client";
import { useDashboard } from "./../_hooks/useDashboard";
export const Contents = () => {
  const { data, error } = useDashboard();
  if (!data) return <div>読込み中...</div>;
  if (error) return <div>データ取得に失敗</div>;
  return (
    <div className="text-center">
      <div>ログインユーザー:{data.user.name}</div>
      {data.children.map(child => (
        <div key={child.id}>{child.name}</div>
      ))}
    </div>
  );
};
