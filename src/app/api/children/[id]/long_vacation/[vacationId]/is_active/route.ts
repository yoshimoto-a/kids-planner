import { NextRequest, NextResponse } from "next/server";
import { buildPrisma } from "@/app/_utils/prisma";
import { buildError } from "@/app/api/_utils/buildError";
import { getCurrentUser } from "../../../../../_utils/getCurrentUser";
import { PutRequest } from "@/app/_types/LongVacation/IsActive/PutRequest";

interface Props {
  params: Promise<{
    id: string;
    vacationId: string;
  }>;
}

export const PUT = async (request: NextRequest, { params }: Props) => {
  const prisma = await buildPrisma();
  const { isActive }: PutRequest = await request.json();
  try {
    const user = await getCurrentUser({ request });
    const { id, vacationId } = await params;
    //有効に更新しようとする場合、既に有効なデータがあれば無効化する
    if (isActive) {
      const isActiveTrue = await prisma.longVacation.findMany({
        where: {
          userId: user.id,
          childId: id,
          isActive: true,
        },
      });
      if (isActiveTrue.length !== 0) {
        await prisma.longVacation.updateMany({
          where: { id: isActiveTrue[0].id },
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
        isActive,
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
