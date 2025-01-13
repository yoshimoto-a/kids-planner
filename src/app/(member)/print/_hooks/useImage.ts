import { useFetch } from "@/app/_hooks/useFetch";
import { Response } from "@/app/_types/image/Response";

export const useImage = ({ childId }: { childId: string }) => {
  return useFetch<Response>(`/api/homework/children/${childId}`);
};
