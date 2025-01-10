export type PutRequest = {
  title: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  schoolDay?: Date;
};
