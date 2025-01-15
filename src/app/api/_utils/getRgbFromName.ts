import { Color } from "@prisma/client";

export const getRgbFromName = (colorName: Color) => {
  switch (colorName) {
    case Color.RED:
      return "#FF453A";
    case Color.PINK:
      return "#FF69B4";
    case Color.BLUE:
      return "#1E90FF";
    case Color.GREEN:
      return "#32CD32";
    case Color.YELLOW:
      return "#FFDF00";
    case Color.PURPLE:
      return "#8A2BE2";
  }
};
