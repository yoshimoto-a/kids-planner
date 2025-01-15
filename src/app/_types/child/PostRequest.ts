import { Color } from "@prisma/client";

export type PostRequest = {
  name: string;
  color: Color;
};
