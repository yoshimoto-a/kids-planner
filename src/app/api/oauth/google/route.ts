import { type NextRequest, NextResponse } from "next/server";
import { GoogleRequest } from "@/app/_types/signup/GoogleRequest";
import { buildPrisma } from "@/app/_utils/prisma";
import { supabase } from "@/app/_utils/supabase";
import { buildError } from "../../_utils/buildError";

export const POST = async (request: NextRequest) => {
  const prisma = await buildPrisma();

  try {
    const { accessToken }: GoogleRequest = await request.json();
    const { data, error } = await supabase.auth.getUser(accessToken);
    if (error) {
      console.error("Supabase error:", error.message);
      throw new Error("Unauthorized");
    }
    const user = await prisma.user.findUnique({
      where: {
        supabaseUserId: data.user.id,
      },
    });
    if (user)
      return NextResponse.json({ message: "既存ユーザー" }, { status: 200 });

    const newUser = await prisma.user.create({
      data: {
        supabaseUserId: data.user.id,
        name: data.user.user_metadata.full_name,
        email: data.user.user_metadata.email,
      },
    });

    await prisma.child.create({
      data: {
        userId: newUser.id,
        name: "こども1",
      },
    });

    return NextResponse.json(
      {
        user,
        message: "新規ユーザー登録",
      },
      { status: 200 }
    );
  } catch (e) {
    return buildError(e);
  }
};
