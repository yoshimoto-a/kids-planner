import { NextRequest, NextResponse } from "next/server";
import { buildPrisma } from "@/app/_utils/prisma";
import { buildError } from "@/app/api/_utils/buildError";
import { getCurrentUser } from "@/app/api/_utils/getCurrentUser";
import { PutRequest } from "@/app/_types/LongVacation/Id/PutRequest";

interface Props {
  params: Promise<{
    id: string;
    vacationId: string;
  }>;
}

export const PUT = async (request: NextRequest, { params }: Props) => {
  const prisma = await buildPrisma();
  const { endDate, isActive, startDate, title, schoolDay }: PutRequest =
    await request.json();
  const { id, vacationId } = await params;
  try {
    const user = await getCurrentUser({ request });

    //有効に更新しようとする場合、既に有効なデータがあれば無効化する
    if (isActive) {
      const isActiveTrue = await prisma.longVacation.findUnique({
        where: {
          userId_childId_isActive: { userId: user.id, childId: id, isActive },
        },
      });
      if (isActiveTrue) {
        await prisma.longVacation.update({
          where: { id: isActiveTrue.id },
          data: {
            isActive: false,
          },
        });
      }
    }

    await prisma.longVacation.update({
      where: {
        id: vacationId,
      },
      data: {
        title,
        startDate,
        endDate,
        isActive,
        schoolDay,
      },
    });

    return NextResponse.json(
      {
        message: "updated!",
      },
      { status: 200 }
    );
  } catch (e) {
    return buildError(e);
  }
};
