import { KeyedMutator } from "swr";
import { PutRequest } from "@/app/_types/homework/submitted/PutRequest";
import { api } from "@/app/_utils/api";
import toast from "react-hot-toast";
export const updateSubmitted = async <T>({
  id,
  submittedStatus,
  mutate,
}: {
  id: string;
  submittedStatus: boolean;
  mutate: KeyedMutator<T | undefined>;
}) => {
  try {
    await api.put<PutRequest, { message: string }>(
      `/api/homework/${id}/submitted`,
      {
        submitted: !submittedStatus,
      }
    );
    toast.success("更新しました");
    mutate();
  } catch (e) {
    console.error(e);
    toast.error("更新に失敗しました");
  }
};
