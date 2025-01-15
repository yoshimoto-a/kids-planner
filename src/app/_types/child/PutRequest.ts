import { Color } from "@prisma/client";

export type PutRequest = {
  name: string;
  color: Color;
};
