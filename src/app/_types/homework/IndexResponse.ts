import { Homework, Child } from "@prisma/client";
export type IndexResponse = {
  child: Child;
  homeworks: Homework[];
};
