import { useFetch } from "@/app/_hooks/useFetch";
import { Response } from "@/app/_types/calendar/Response";

export const useCalendar = () => {
  return useFetch<Response>("/api/calendar");
};
