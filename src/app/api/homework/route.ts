import { buildPrisma } from "@/app/_utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "../_utils/getCurrentUser";
import { IndexResponse } from "@/app/_types/homework/IndexResponse";
import { buildError } from "../_utils/buildError";

//子供一覧と宿題の一覧を返す
export const GET = async (request: NextRequest) => {
  const prisma = await buildPrisma();
  try {
    const user = await getCurrentUser({ request });

    const homeworks = await prisma.homework.findMany({
      where: {
        userId: user.id,
      },
      include: {
        child: true,
      },
    });
    const children = await prisma.child.findMany({
      where: {
        userId: user.id,
      },
    });

    return NextResponse.json<IndexResponse>(
      {
        homeworks,
        children,
      },
      { status: 200 }
    );
  } catch (e) {
    return buildError(e);
  }
};
