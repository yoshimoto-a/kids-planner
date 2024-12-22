import { NextRequest, NextResponse } from "next/server";
import { buildPrisma } from "@/app/_utils/prisma";
import { buildError } from "@/app/api/_utils/buildError";
import { getCurrentUser } from "../../_utils/getCurrentUser";
import { PutRequest } from "@/app/_types/child/PutRequest";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export const PUT = async (request: NextRequest, { params }: Props) => {
  const prisma = await buildPrisma();
  const { name }: PutRequest = await request.json();
  try {
    await getCurrentUser({ request });
    const { id } = await params;

    await prisma.child.update({
      where: {
        id,
      },
      data: {
        name,
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

    await prisma.child.delete({
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
