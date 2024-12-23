import { User, Child, Homework } from "@prisma/client";
export type DashboardResponse = {
  user: User;
  children: Child[];
  homeworks: Homework[];
};
