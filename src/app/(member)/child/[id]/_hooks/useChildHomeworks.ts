import { useFetch } from "@/app/_hooks/useFetch";
import { IndexResponse } from "@/app/_types/Children/Homework/IndexResponse";
export const useChildHomeworks = ({ childId }: { childId: string }) => {
  return useFetch<IndexResponse>(`/api/children/${childId}`);
};
