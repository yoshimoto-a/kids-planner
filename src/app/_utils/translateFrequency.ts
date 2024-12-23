import { Frequency } from "@prisma/client";
import { FrequencyLabel } from "../_types/FrequencyLabel";
export const translateFrequency = (frequency: Frequency): FrequencyLabel => {
  switch (frequency) {
    case Frequency.DAILY:
      return "毎日";
    case Frequency.WEEKDAY:
      return "平日";
    case Frequency.WEEKEND:
      return "休日";
    case Frequency.CUSTOM:
      return "カスタム";
  }
};
