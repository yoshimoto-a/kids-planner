export type PostRequest = {
  title: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  schoolDay?: Date;
};
