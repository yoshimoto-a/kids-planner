"use client";
import { useMe } from "../../_hooks/useMe";

export const User: React.FC = () => {
  const { data, error } = useMe();
  if (!data) return <div className="text-center pt-20">読込み中...</div>;
  if (error) return <div className="text-center pt-20">データ取得に失敗</div>;
  return (
    <div className="w-full">
      <div className="text-right">ログインユーザー:{data.user.name}</div>
    </div>
  );
};
