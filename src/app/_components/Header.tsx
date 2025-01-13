"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../_utils/supabase";
import { Button } from "./Button";
import { useSupabaseSession } from "../_hooks/useSupabaseSession";
import { LoginButton } from "./LoginButton";
import toast from "react-hot-toast";
export const Header: React.FC = () => {
  const { replace } = useRouter();
  const { session } = useSupabaseSession();

  const logout = async () => {
    if (!confirm("ログアウトしますか")) return;
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw new Error(error.message);
      toast.success("ログアウトしました");
      replace("/");
    } catch (e) {
      alert(`ログアウトに失敗しました:${e}`);
      console.error(e);
    }
  };
  return (
    <header className="fixed top-0 z-10  h-[60px] w-screen bg-accentBeige/90 p-2 shadow-sm text-black ">
      <div className="max-w-[480px] h-full flex items-center justify-between mx-auto">
        <Link className="font-semibold" href={"/"}>
          <h1>kids planner</h1>
        </Link>
        {session ? (
          <div>
            <Link className="" href={"/dashboard"}>
              管理画面
            </Link>
            <Button type="button" onClick={logout} variant="text-black">
              ログアウト
            </Button>
          </div>
        ) : (
          <LoginButton>ログイン</LoginButton>
        )}
      </div>
    </header>
  );
};
