import { useFetch } from "@/app/_hooks/useFetch";
import { IndexResponse } from "@/app/_types/LongVacation/IndexResponse";
export const useChildLongVacaion = ({ childId }: { childId: string }) => {
  return useFetch<IndexResponse>(`/api/children/${childId}/long_vacation`);
};
