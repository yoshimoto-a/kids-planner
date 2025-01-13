import { useFetch } from "@/app/_hooks/useFetch";
import { IndexResponse } from "@/app/_types/children/IndexResponse";
export const useChildren = () => {
  return useFetch<IndexResponse>(`/api/children`);
};
