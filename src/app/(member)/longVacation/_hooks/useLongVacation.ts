import { useFetch } from "@/app/_hooks/useFetch";
export const useLongVacation = () => {
  return useFetch("/api/long_vacation");
};
