import { NextRequest, NextResponse } from "next/server";
import { buildError } from "@/app/api/_utils/buildError";
import { getCurrentUser } from "../_utils/getCurrentUser";
import { Response } from "@/app/_types/Me/Response";

export const GET = async (request: NextRequest) => {
  try {
    const user = await getCurrentUser({ request });

    return NextResponse.json<Response>(
      {
        user,
      },
      { status: 200 }
    );
  } catch (e) {
    return buildError(e);
  }
};
