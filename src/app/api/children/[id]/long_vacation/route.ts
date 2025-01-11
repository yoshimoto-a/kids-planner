import { NextRequest, NextResponse } from "next/server";
import { buildPrisma } from "@/app/_utils/prisma";
import { buildError } from "@/app/api/_utils/buildError";
import { getCurrentUser } from "../../../_utils/getCurrentUser";
import { IndexResponse } from "@/app/_types/LongVacation/IndexResponse";
import { PostRequest } from "@/app/_types/LongVacation/PostRequest";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export const GET = async (request: NextRequest, { params }: Props) => {
  const prisma = await buildPrisma();
  const { id } = await params;
  try {
    const user = await getCurrentUser({ request });

    const longVacations = await prisma.longVacation.findMany({
      where: {
        userId: user.id,
        childId: id,
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
export const POST = async (request: NextRequest, { params }: Props) => {
  const prisma = await buildPrisma();
  const { title, endDate, isActive, startDate, schoolDay }: PostRequest =
    await request.json();
  const { id } = await params;
  try {
    const user = await getCurrentUser({ request });
    //有効に更新しようとする場合、既に有効なデータがあれば無効化する
    if (isActive) {
      const isActiveTrue = await prisma.longVacation.findMany({
        where: {
          userId: user.id,
          childId: id,
          isActive: true,
        },
      });
      console.log(isActiveTrue);
      if (isActiveTrue.length !== 0) {
        await prisma.longVacation.update({
          where: { id: isActiveTrue[0].id },
          data: {
            isActive: false,
          },
        });
      }
    }
    await prisma.longVacation.create({
      data: {
        userId: user.id,
        childId: id,
        title,
        startDate,
        endDate,
        isActive,
        schoolDay,
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
