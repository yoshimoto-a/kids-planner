import { LongVacation } from "@prisma/client";

export interface IndexResponse {
  longVacations: LongVacation[];
}
