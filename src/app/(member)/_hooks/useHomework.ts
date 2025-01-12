import { useFetch } from "@/app/_hooks/useFetch";
import { IndexResponse } from "@/app/_types/homework/IndexResponse";
export const useHomework = () => {
  return useFetch<IndexResponse>(`/api/homework`);
};
