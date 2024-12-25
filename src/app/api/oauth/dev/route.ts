import { NextResponse } from "next/server";
import { buildError } from "@/app/api/_utils/buildError";
import { supabase } from "@/app/_utils/supabase";

export const POST = async () => {
  const emailRedirectTo =
    `${process.env.NEXT_PUBLIC_APP_BASE_URL}/dashboard` || "";
  try {
    const { error } = await supabase.auth.signInWithOtp({
      email: process.env.TEST_EMAIL || "",
      options: {
        emailRedirectTo,
      },
    });
    if (error) throw new Error(error.message);
    return NextResponse.json(
      {
        message: "成功",
      },
      { status: 200 }
    );
  } catch (e) {
    return buildError(e);
  }
};
