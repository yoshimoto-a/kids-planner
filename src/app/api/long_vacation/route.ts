import { NextRequest, NextResponse } from "next/server";
import { buildPrisma } from "@/app/_utils/prisma";
import { buildError } from "@/app/api/_utils/buildError";
import { getCurrentUser } from "../_utils/getCurrentUser";
import { PostRequest } from "@/app/_types/LongVacation/PostRequest";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export const POST = async (request: NextRequest, { params }: Props) => {
  const prisma = await buildPrisma();
  const { title, endDate, isActive, startDate, schoolDay }: PostRequest =
    await request.json();
  const { id } = await params;
  try {
    const user = await getCurrentUser({ request });

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
