import { Homework, LongVacation } from "@prisma/client";
export type Data = {
  child: {
    id: string;
    name: string;
  };
  progress: number;
  homeworks: Homework[];
  longVacation: LongVacation | null;
};
export type DashboardResponse = { data: Data[] };
