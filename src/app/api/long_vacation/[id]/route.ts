import { NextRequest, NextResponse } from "next/server";
import { buildPrisma } from "@/app/_utils/prisma";
import { buildError } from "@/app/api/_utils/buildError";
import { getCurrentUser } from "../../_utils/getCurrentUser";
import { IndexResponse } from "@/app/_types/LongVacation/Id/IndexResponse";
import { PutRequest } from "@/app/_types/LongVacation/Id/PutRequest";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export const PUT = async (request: NextRequest, { params }: Props) => {
  const prisma = await buildPrisma();
  const {
    endDate,
    isActive,
    startDate,
    title,
    schoolDay,
    childId,
  }: PutRequest = await request.json();
  const { id } = await params;
  try {
    const user = await getCurrentUser({ request });
    console.log(isActive);

    //有効に更新しようとする場合、既に有効なデータがあれば無効化する
    if (isActive) {
      const isActiveTrue = await prisma.longVacation.findMany({
        where: {
          userId: user.id,
          childId: childId,
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

    await prisma.longVacation.update({
      where: {
        id,
      },
      data: {
        title,
        childId,
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

export const DELETE = async (request: NextRequest, { params }: Props) => {
  const prisma = await buildPrisma();
  try {
    await getCurrentUser({ request });
    const { id } = await params;
    await prisma.longVacation.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(
      {
        message: "deleted!",
      },
      { status: 200 }
    );
  } catch (e) {
    return buildError(e);
  }
};

export const GET = async (request: NextRequest, { params }: Props) => {
  const prisma = await buildPrisma();
  const { id } = await params;
  try {
    const user = await getCurrentUser({ request });

    const longVacation = await prisma.longVacation.findUnique({
      where: {
        id,
        userId: user.id,
      },
    });
    if (!longVacation)
      return NextResponse.json(
        {
          message: "longVacation is null",
        },
        { status: 404 }
      );

    return NextResponse.json<IndexResponse>(
      {
        longVacation,
      },
      { status: 200 }
    );
  } catch (e) {
    return buildError(e);
  }
};
