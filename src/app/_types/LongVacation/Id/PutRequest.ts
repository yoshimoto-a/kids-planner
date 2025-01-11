export type PutRequest = {
  title: string;
  childId: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  schoolDay?: Date;
};
