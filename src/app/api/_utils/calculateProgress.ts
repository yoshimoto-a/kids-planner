import { Homework } from "@prisma/client";

export const calculateProgress = (homeworks: Homework[]) => {
  const total = homeworks.length;
  const submitted = homeworks.filter(hw => hw.submitted).length;
  return total === 0 ? 0 : Math.round((submitted / total) * 100);
};
