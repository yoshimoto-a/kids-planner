import { Homework, Child } from "@prisma/client";
export type IndexResponse = {
  children: Child[];
  homeworks: Homework[];
};
