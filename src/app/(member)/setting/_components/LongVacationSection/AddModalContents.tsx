import { api } from "@/app/_utils/api";
import { PostRequest } from "@/app/_types/LongVacation/PostRequest";
import toast from "react-hot-toast";
import { LongVacationForm } from "./LongVacationForm";
import { useLongVacation } from "@/app/(member)/longVacation/_hooks/useLongVacation";
import { useLongVacationForm } from "../../_hooks/useLongVacationForm";
import { LongVacationForm as Form } from "../../_types/LongVacationForm";
interface Props {
  setIsModalOpen: (isModalOpen: boolean) => void;
}

export const AddModalContents: React.FC<Props> = ({ setIsModalOpen }) => {
  const { mutate } = useLongVacation();
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    reset,
    childId,
    setChildId,
  } = useLongVacationForm();

  const onSubmit = async (data: Form) => {
    if (!childId) {
      alert("子供を選択してください");
      return;
    }
    try {
      await api.post<PostRequest, { message: string }>(
        `/api/children/${childId}/long_vacation`,
        {
          startDate: new Date(data.startDate),
          endDate: new Date(data.endDate),
          title: data.title,
          isActive: data.isActive,
          schoolDay: data.schoolDay ? new Date(data.schoolDay) : undefined,
        }
      );
      reset();
      mutate();
      toast.success("登録しました");
    } catch (e) {
      console.error(e);
      toast.error("登録に失敗しました");
    }
    setIsModalOpen(false);
  };
  return (
    <LongVacationForm
      mode={"add"}
      onSubmit={handleSubmit(onSubmit)}
      childId={childId}
      setChildId={setChildId}
      register={register}
      errors={errors}
      isSubmitting={isSubmitting}
    />
  );
};
