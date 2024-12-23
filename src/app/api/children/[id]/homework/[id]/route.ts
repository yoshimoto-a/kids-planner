import { NextRequest, NextResponse } from "next/server";
import { buildPrisma } from "@/app/_utils/prisma";
import { buildError } from "@/app/api/_utils/buildError";
import { getCurrentUser } from "../../../../_utils/getCurrentUser";
import { PostRequest } from "@/app/_types/homework/PostRequest";

interface Props {
  params: Promise<{
    id: string;
  }>;
}
//mishiyou
export const POST = async (request: NextRequest, { params }: Props) => {
  const prisma = await buildPrisma();
  const { dueDate, title, description }: PostRequest = await request.json();
  const { id } = await params;
  try {
    const user = await getCurrentUser({ request });

    await prisma.homework.create({
      data: {
        userId: user.id,
        childId: id,
        title,
        dueDate,
        description,
        submitted: false,
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
