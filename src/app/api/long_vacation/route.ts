import { NextRequest, NextResponse } from "next/server";
import { buildPrisma } from "@/app/_utils/prisma";
import { buildError } from "@/app/api/_utils/buildError";
import { getCurrentUser } from "../_utils/getCurrentUser";
import { IndexResponse } from "@/app/_types/LongVacation/IndexResponse";

export const GET = async (request: NextRequest) => {
  const prisma = await buildPrisma();
  try {
    const user = await getCurrentUser({ request });

    const longVacations = await prisma.longVacation.findMany({
      where: {
        userId: user.id,
      },
    });

    return NextResponse.json<IndexResponse>(
      {
        longVacations,
      },
      { status: 200 }
    );
  } catch (e) {
    return buildError(e);
  }
};
