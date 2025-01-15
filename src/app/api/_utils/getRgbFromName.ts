import { Color } from "@prisma/client";

export const getRgbFromName = (colorName: Color) => {
  switch (colorName) {
    case Color.RED:
      return "rgb(255, 69, 58)";
    case Color.PINK:
      return "rgb(255, 105, 180)";
    case Color.BLUE:
      return "rgb(30, 144, 255)";
    case Color.GREEN:
      return "rgb(50, 205, 50)";
    case Color.YELLOW:
      return "rgb(255, 223, 0)";
    case Color.PURPLE:
      return "rgb(138, 43, 226)";
  }
};
