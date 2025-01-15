import { NextRequest, NextResponse } from "next/server";
import { DashboardResponse, Data } from "@/app/_types/Dashboard/Responase";
import { buildPrisma } from "@/app/_utils/prisma";
import { buildError } from "@/app/api/_utils/buildError";
import { getCurrentUser } from "@/app/api/_utils/getCurrentUser";

export const GET = async (request: NextRequest) => {
  const prisma = await buildPrisma();

  try {
    const user = await getCurrentUser({ request });
    const homeworks = await prisma.homework.findMany({
      where: {
        userId: user.id,
        longVacation: {
          isActive: true,
        },
      },
      include: {
        longVacation: true,
        child: true,
      },
    });

    const data: Data[] = Object.values(
      homeworks.reduce<Record<string, Data>>((acc, homework) => {
        const childId = homework.childId;

        if (!acc[childId]) {
          acc[childId] = {
            child: {
              id: homework.childId,
              name: homework.child.name,
            },
            homeworks: [],
            longVacation: homework.longVacation || null,
          };
        }

        acc[childId].homeworks.push(homework);

        if (homework.longVacation) {
          acc[childId].longVacation = homework.longVacation;
        }

        return acc;
      }, {})
    );

    return NextResponse.json<DashboardResponse>(
      {
        data,
      },
      { status: 200 }
    );
  } catch (e) {
    return buildError(e);
  }
};
