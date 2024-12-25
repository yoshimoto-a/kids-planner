"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSupabaseSession } from "./_hooks/useSupabaseSession";
import { supabase } from "./_utils/supabase";
import { Button } from "./_components/Button";
import { isDevelopmentEnv } from "./_utils/isDevelopmentEnv";
export default function Home() {
  const router = useRouter();
  const { session, isLoading } = useSupabaseSession();
  useEffect(() => {
    if (isLoading) return;
    if (session) {
      router.replace("/dashboard");
    }
  }, [session, isLoading, router]);

  const signIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/oauth/callback/google`,
        },
      });
      if (error) throw new Error(error.message);
    } catch (e) {
      alert(`ログインに失敗しました:${e}`);
      console.error(e);
    }
  };
  const devSignIn = async () => {
    try {
      const response = await fetch("api/oauth/dev", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status !== 200) {
        const errorData = await response.json();
        const errorMessage = errorData.message;
        throw new Error(errorMessage);
      }
      alert("マジックリンク送信");
    } catch (e) {
      alert(`ログインに失敗しました:${e}`);
      console.error(e);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center gap-5">
      <Button type="button" onClick={signIn} variant="bg-blue">
        Googleアカウントでログイン
      </Button>
      {isDevelopmentEnv && (
        <Button type="button" onClick={devSignIn} variant="bg-blue">
          ログイン
        </Button>
      )}
    </div>
  );
}
