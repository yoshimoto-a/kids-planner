"use client";
import { supabase } from "../_utils/supabase";
import { Button } from "../_components/Button";
import { ReactNode } from "react";
interface Props {
  children: ReactNode;
}

export const LoginButton: React.FC<Props> = ({ children }) => {
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

  return (
    <Button type="button" onClick={signIn} variant="bg-beige">
      {children}
    </Button>
  );
};
