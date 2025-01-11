import { Button } from "@/app/_components/Button";
import { api } from "@/app/_utils/api";
import { PostRequest } from "@/app/_types/LongVacation/PostRequest";
import toast from "react-hot-toast";
import { ChildSelect } from "../../../_components/ChildSelect";
import { useLongVacation } from "@/app/(member)/longVacation/_hooks/useLongVacation";
import { useLongVacationForm } from "../../_hooks/useLongVacationForm";
import { LongVacationForm } from "../../_types/LongVacationForm";
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

  const onSubmit = async (data: LongVacationForm) => {
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[400px] bg-white p-10 text-black rounded-md flex flex-col justify-center gap-2"
      onClick={event => event.stopPropagation()}
    >
      <h3 className="text-center">長期休暇追加</h3>
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
        登録
      </Button>
    </form>
  );
};
