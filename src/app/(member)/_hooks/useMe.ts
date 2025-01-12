import { useFetch } from "../../_hooks/useFetch";
import { Response } from "../../_types/Me/Response";
export const useMe = () => {
  return useFetch<Response>("/api/me");
};
