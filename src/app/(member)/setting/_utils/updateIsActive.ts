import { KeyedMutator } from "swr";
import { PutRequest } from "@/app/_types/LongVacation/IsActive/PutRequest";
import { api } from "@/app/_utils/api";
import toast from "react-hot-toast";
export const updateIsAcive = async <T>({
  id,
  childId,
  activeStatus,
  mutate,
}: {
  childId: string;
  id: string;
  activeStatus: boolean;
  mutate: KeyedMutator<T>;
}) => {
  try {
    await api.put<PutRequest, { message: string }>(
      `/api/children/${childId}/long_vacation/${id}/is_active`,
      {
        isActive: !activeStatus,
      }
    );
    toast.success("更新しました");
    mutate();
  } catch (e) {
    console.error(e);
    toast.error("更新に失敗しました");
  }
};
