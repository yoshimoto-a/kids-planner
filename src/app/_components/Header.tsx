"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../_utils/supabase";
import { Button } from "./Button";

export const Header: React.FC = () => {
  const { replace } = useRouter();
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw new Error(error.message);
      replace("/");
    } catch (e) {
      alert(`ログアウトに失敗しました:${e}`);
      console.error(e);
    }
  };
  return (
    <header className="fixed top-0 z-10  h-[72px] w-screen bg-white/90 p-6 shadow-sm">
      <div className="max-w-[480px] flex items-center justify-between mx-auto">
        <Link className="font-bold" href={"/dashboard"}>
          kids planner
        </Link>
        <Button type="button" onClick={logout} variant="text-black">
          ログアウト
        </Button>
      </div>
    </header>
  );
};
