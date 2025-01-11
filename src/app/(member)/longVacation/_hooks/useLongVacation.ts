import { useFetch } from "@/app/_hooks/useFetch";
import { IndexResponse } from "@/app/_types/LongVacation/IndexResponse";
export const useLongVacation = () => {
  return useFetch<IndexResponse>("/api/long_vacation");
};
