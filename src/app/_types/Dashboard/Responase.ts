import { User, Child } from "@prisma/client";
export type DashboardResponse = {
  user: User;
  children: Child[];
};
