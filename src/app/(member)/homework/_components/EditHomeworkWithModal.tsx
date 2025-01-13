import { Modal } from "@/app/_components/Modal";
import { Homework } from "@prisma/client";
import { Button } from "@/app/_components/Button";
import { HomeworkForm } from "../_types/HomeworkForm";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { VacationSlect } from "./VacationSlect";
interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  register: UseFormRegister<HomeworkForm>;
  errors: FieldErrors<HomeworkForm>;
  selectedHomework: Homework | null;
  deleteHomework: () => void;
  longVacationId: string;
  setLongVacationId: (longVacationId: string) => void;
}
export const EditHomeworkWithModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSubmit,
  register,
  errors,
  selectedHomework,
  deleteHomework,
  longVacationId,
  setLongVacationId,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        className=" w-[500px] bg-white p-10 text-black rounded-md flex flex-col gap-6 shadow-lg"
        onClick={event => event.stopPropagation()}
      >
        {!selectedHomework ? (
          <div>宿題データがありません</div>
        ) : (
          <>
            <h3 className="text-xl font-bold mb-4 text-center ">宿題編集</h3>
            <form className="flex flex-col gap-2" onSubmit={onSubmit}>
              <div className="flex flex-col">
                <label className="font-medium">宿題</label>
                <input
                  type="text"
                  className="border rounded p-2"
                  placeholder="内容を入力"
                  {...register("title")}
                />
                {errors.title && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col col-span-2">
                <label className="font-medium">詳細</label>
                <input
                  type="text"
                  className="border rounded p-2"
                  placeholder="詳細を入力"
                  {...register("description")}
                />
                {errors.description && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="font-medium">提出日:</label>
                <input
                  type="date"
                  className="border rounded p-2"
                  {...register("dueDate")}
                />
                {errors.dueDate && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.dueDate.message}
                  </p>
                )}
              </div>
              <label>休暇</label>
              <VacationSlect
                childId={selectedHomework.childId}
                longVacationId={longVacationId}
                setLongVacationId={setLongVacationId}
              />
              <div className="col-span-2 mt-4 flex flex-col gap-5">
                <Button type="submit" variant="bg-beige">
                  登録
                </Button>
                <Button
                  type="button"
                  variant="bg-gray"
                  onClick={deleteHomework}
                >
                  削除
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </Modal>
  );
};
