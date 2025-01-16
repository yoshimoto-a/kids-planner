"use client";
import { useMe } from "../_hooks/useMe";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const User: React.FC = () => {
  const { data, error } = useMe();
  if (!data)
    return (
      <div className="text-right">
        <Skeleton width={150} />
      </div>
    );
  if (error) return <div className="text-center pt-20">データ取得に失敗</div>;
  return (
    <div className="w-full">
      <div className="text-right">ログインユーザー:{data.user.name}</div>
    </div>
  );
};
