import { NextRequest, NextResponse } from "next/server";
import { buildPrisma } from "@/app/_utils/prisma";
import { buildError } from "@/app/api/_utils/buildError";
import { getCurrentUser } from "../../_utils/getCurrentUser";
import { PutRequest } from "@/app/_types/LongVacation/PutRequest";
import { IndexResponse } from "@/app/_types/LongVacation/Id/IndexResponse";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export const PUT = async (request: NextRequest, { params }: Props) => {
  const prisma = await buildPrisma();
  const { endDate, isActive, startDate, title, schoolDay }: PutRequest =
    await request.json();
  const { id } = await params;
  try {
    await getCurrentUser({ request });

    await prisma.longVacation.update({
      where: {
        id,
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
