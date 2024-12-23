import { NextRequest, NextResponse } from "next/server";
import { buildPrisma } from "@/app/_utils/prisma";
import { buildError } from "@/app/api/_utils/buildError";
import { getCurrentUser } from "../../_utils/getCurrentUser";
import { PutRequest } from "@/app/_types/homework/PutRequest";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export const PUT = async (request: NextRequest, { params }: Props) => {
  const prisma = await buildPrisma();
  const { dueDate, title, submitted, description }: PutRequest =
    await request.json();
  const { id } = await params;
  try {
    await getCurrentUser({ request });
    await prisma.homework.update({
      where: {
        id,
      },
      data: {
        title,
        dueDate,
        description,
        submitted,
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
export const DELETE = async (request: NextRequest, { params }: Props) => {
  const prisma = await buildPrisma();
  try {
    await getCurrentUser({ request });
    const { id } = await params;

    await prisma.homework.delete({
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
