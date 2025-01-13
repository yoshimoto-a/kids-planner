import { NextRequest, NextResponse } from "next/server";
import { buildPrisma } from "@/app/_utils/prisma";
import { buildError } from "@/app/api/_utils/buildError";
import { getCurrentUser } from "../_utils/getCurrentUser";
import { PostRequest } from "@/app/_types/child/PostRequest";
import { IndexResponse } from "@/app/_types/children/IndexResponse";
export const POST = async (request: NextRequest) => {
  const prisma = await buildPrisma();
  const { name }: PostRequest = await request.json();

  try {
    const user = await getCurrentUser({ request });

    await prisma.child.create({
      data: {
        userId: user.id,
        name,
      },
    });

    return NextResponse.json(
      {
        message: "success!",
      },
      { status: 200 }
    );
  } catch (e) {
    return buildError(e);
  }
};

export const GET = async (request: NextRequest) => {
  const prisma = await buildPrisma();
  try {
    const user = await getCurrentUser({ request });

    const children = await prisma.child.findMany({
      where: {
        userId: user.id,
      },
    });

    return NextResponse.json<IndexResponse>(
      {
        children,
      },
      { status: 200 }
    );
  } catch (e) {
    return buildError(e);
  }
};
