import { NextRequest, NextResponse } from "next/server";
import { DashboardResponse } from "@/app/_types/Dashboard/Responase";
// import { buildPrisma } from "@/app/_utils/prisma";
import { buildError } from "@/app/api/_utils/buildError";
import { getCurrentUser } from "@/app/api/_utils/getCurrentUser";

export const GET = async (request: NextRequest) => {
  try {
    const user = await getCurrentUser({ request });

    return NextResponse.json<DashboardResponse>(
      {
        user,
        children: user.children,
      },
      { status: 200 }
    );
  } catch (e) {
    return buildError(e);
  }
};
