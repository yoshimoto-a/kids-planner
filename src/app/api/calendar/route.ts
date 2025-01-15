import { buildPrisma } from "@/app/_utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "../_utils/getCurrentUser";
import { Response } from "@/app/_types/calendar/Response";
import { buildError } from "../_utils/buildError";
import { dayjs } from "@/app/_utils/dayjs";
import { getRgbFromName } from "../_utils/getRgbFromName";
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
        child: true,
        longVacation: true,
      },
    });

    const events = homeworks.map(homework => ({
      id: homework.childId,
      groupId: homework.childId,
      title: homework.title,
      name: homework.child.name,
      start: dayjs(homework.longVacation?.startDate).tz().format("YYYY-MM-DD"),
      end: dayjs(homework.longVacation?.endDate).tz().format("YYYY-MM-DD"),
      submitted: homework.submitted,
      url: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/homework`,
      color: homework.submitted
        ? "rgb(128, 128, 128)"
        : getRgbFromName(homework.child.color),
    }));

    return NextResponse.json<Response>(
      {
        events,
      },
      { status: 200 }
    );
  } catch (e) {
    return buildError(e);
  }
};
