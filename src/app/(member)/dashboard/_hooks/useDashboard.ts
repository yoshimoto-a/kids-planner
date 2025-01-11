import { useFetch } from "@/app/_hooks/useFetch";
import { DashboardResponse } from "@/app/_types/Dashboard/Responase";
export const useDashboard = () => {
  return useFetch<DashboardResponse>("/api/dashboard");
};
