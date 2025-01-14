import { buildPrisma } from "@/app/_utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "../_utils/getCurrentUser";
import { Response } from "@/app/_types/calendar/Response";
import { buildError } from "../_utils/buildError";
import { dayjs } from "@/app/_utils/dayjs";

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

    const getColorByChildId = (childId: string) => {
      const colors = [
        "rgb(135, 206, 235)", // SkyBlue
        "rgb(255, 99, 71)", // Tomato
        "rgb(50, 205, 50)", // LimeGreen
        "rgb(255, 105, 180)", // HotPink
        "rgb(255, 160, 122)", // LightSalmon
      ];

      let hash = 0;
      for (let i = 0; i < childId.length; i++) {
        hash = childId.charCodeAt(i) + ((hash << 5) - hash);
      }
      const index = Math.abs(hash) % colors.length;
      return colors[index];
    };

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
        ? "#808080"
        : getColorByChildId(homework.childId),
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
