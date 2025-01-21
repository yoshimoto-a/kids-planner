import { NextRequest, NextResponse } from "next/server";
import { buildPrisma } from "@/app/_utils/prisma";
import { buildError } from "@/app/api/_utils/buildError";
import { getCurrentUser } from "../../_utils/getCurrentUser";
import { PutRequest } from "@/app/_types/child/PutRequest";
import { PostRequest } from "@/app/_types/homework/PostRequest";
import { IndexResponse } from "@/app/_types/children/Homework/IndexResponse";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export const PUT = async (request: NextRequest, { params }: Props) => {
  const prisma = await buildPrisma();
  const { name, color }: PutRequest = await request.json();
  try {
    await getCurrentUser({ request });
    const { id } = await params;

    await prisma.child.update({
      where: {
        id,
      },
      data: {
        name,
        color,
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

    await prisma.homework.deleteMany({
      where: {
        childId: id,
      },
    });

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

export const POST = async (request: NextRequest, { params }: Props) => {
  const prisma = await buildPrisma();
  const { dueDate, title, description, longVacationId }: PostRequest =
    await request.json();
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
        longVacationId,
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

//子供毎の宿題一覧を返す
export const GET = async (request: NextRequest, { params }: Props) => {
  const prisma = await buildPrisma();
  const { id } = await params;
  try {
    const user = await getCurrentUser({ request });

    const homeworks = await prisma.homework.findMany({
      where: {
        userId: user.id,
        childId: id,
        longVacation: {
          isActive: true,
        },
      },
      include: {
        child: true,
      },
      orderBy: [{ dueDate: "asc" }, { createdAt: "asc" }],
    });

    return NextResponse.json<IndexResponse>(
      {
        child: homeworks[0].child,
        homeworks,
      },
      { status: 200 }
    );
  } catch (e) {
    return buildError(e);
  }
};
