import { api } from "@/app/_utils/api";
import toast from "react-hot-toast";
import { useLongVacation } from "@/app/(member)/longVacation/_hooks/useLongVacation";
import { PutRequest } from "@/app/_types/LongVacation/Id/PutRequest";
import { LongVacation } from "@prisma/client";
import { useLongVacationForm } from "../../_hooks/useLongVacationForm";
import dayjs from "dayjs";
import { LongVacationForm as Form } from "../../_types/LongVacationForm";
import { LongVacationForm } from "./LongVacationForm";

interface Props {
  selectedData: LongVacation;
  setIsModalOpen: (isModalOpen: boolean) => void;
}

export const UpdateModalContents: React.FC<Props> = ({
  selectedData,
  setIsModalOpen,
}) => {
  const {
    childId: getChildId,
    id: vacationId,
    title,
    startDate,
    endDate,
    isActive,
    schoolDay,
  } = selectedData;
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    reset,
    childId,
    setChildId,
  } = useLongVacationForm(
    {
      title,
      endDate: dayjs(endDate).format("YYYY-MM-DD"),
      startDate: dayjs(startDate).format("YYYY-MM-DD"),
      schoolDay: dayjs(schoolDay).format("YYYY-MM-DD") || undefined,
      isActive,
    },
    getChildId
  );

  const { mutate } = useLongVacation();

  const onSubmit = async (data: Form) => {
    if (!childId) {
      alert("子供を選択してください");
      return;
    }

    try {
      await api.put<PutRequest, { message: string }>(
        `/api/long_vacation/${vacationId}`,
        {
          childId,
          startDate: new Date(data.startDate),
          endDate: new Date(data.endDate),
          title: data.title,
          isActive: data.isActive,
          schoolDay: data.schoolDay ? new Date(data.schoolDay) : undefined,
        }
      );
      reset();
      mutate();
      toast.success("更新しました");
    } catch (e) {
      console.error(e);
      toast.error("更新に失敗しました");
    }
    setIsModalOpen(false);
  };

  const del = async () => {
    if (!confirm("削除していいですか？")) return;
    try {
      await api.del(`/api/long_vacation/${vacationId}`);
      mutate();
      setIsModalOpen(false);
      toast.success("削除しました");
    } catch (e) {
      console.error(e);
      toast.error("削除に失敗しました");
    }
  };

  return (
    <LongVacationForm
      mode={"update"}
      onSubmit={handleSubmit(onSubmit)}
      del={del}
      childId={childId}
      setChildId={setChildId}
      register={register}
      errors={errors}
      isSubmitting={isSubmitting}
    />
  );
};
