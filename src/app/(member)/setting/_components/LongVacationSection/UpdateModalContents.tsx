import { Button } from "@/app/_components/Button";
import { api } from "@/app/_utils/api";
import toast from "react-hot-toast";
import { ChildSelect } from "../../../_components/ChildSelect";
import { useLongVacation } from "@/app/(member)/longVacation/_hooks/useLongVacation";
import { PutRequest } from "@/app/_types/LongVacation/Id/PutRequest";
import { LongVacation } from "@prisma/client";
import { useLongVacationForm } from "../../_hooks/useLongVacationForm";
import dayjs from "dayjs";
import { LongVacationForm } from "../../_types/LongVacationForm";
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

  const onSubmit = async (data: LongVacationForm) => {
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[400px] bg-white p-10 text-black rounded-md flex flex-col justify-center gap-2"
      onClick={event => event.stopPropagation()}
    >
      <h3 className="text-center">長期休暇編集</h3>
      <ChildSelect childId={childId} setChildId={setChildId} />
      <label>
        <span className="text-red-600 text-sm">※</span>休暇名
      </label>
      <input
        type="text"
        placeholder="タイトル(夏休みetc)"
        className="p-2 border rounded-sm w-full"
        {...register("title")}
      />
      {errors.title && (
        <p className="text-red-600 text-sm">{errors.title.message}</p>
      )}
      <label>
        <span className="text-red-600 text-sm">※</span>開始日
      </label>
      <input
        type="date"
        className="p-2 border rounded-sm w-full"
        {...register("startDate")}
      />
      {errors.startDate && (
        <p className="text-red-600 text-sm">{errors.startDate.message}</p>
      )}
      <label>
        <span className="text-red-600 text-sm">※</span>終了日
      </label>
      <input
        type="date"
        className="p-2 border rounded-sm w-full"
        {...register("endDate")}
      />
      {errors.endDate && (
        <p className="text-red-600 text-sm">{errors.endDate.message}</p>
      )}

      <label>登校日</label>
      <input
        type="date"
        className="p-2 border rounded-sm w-full"
        {...register("schoolDay")}
      />
      <label className="flex justify-start items-center gap-2">
        <input
          type="checkbox"
          className="transform scale-150"
          {...register("isActive")}
        />
        有効化
        <span className="text-xs">(有効化すると他の休暇は無効化されます)</span>
      </label>
      <Button type="submit" variant="bg-beige" disabled={isSubmitting}>
        更新
      </Button>
      <Button
        type="button"
        variant="bg-gray"
        onClick={del}
        disabled={isSubmitting}
      >
        削除
      </Button>
    </form>
  );
};
