"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/app/_utils/api";
import { PostRequest } from "@/app/_types/homework/PostRequest";
import { KeyedMutator } from "swr";
import { Modal } from "@/app/_components/Modal";
import { Button } from "@/app/_components/Button";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { IndexResponse } from "@/app/_types/homework/IndexResponse";
import { HomeworkForm } from "../_types/HomeworkForm";
import { VacationSlect } from "./VacationSlect";
import { useLongVacation } from "../../longVacation/_hooks/useLongVacation";
interface Props {
  childId: string;
  mutate: KeyedMutator<IndexResponse | undefined>;
}
export const AddHomeworkWithModal: React.FC<Props> = ({ childId, mutate }) => {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const { data } = useLongVacation();
  const [longVacationId, setLongVacationId] = useState("");
  const schema = z.object({
    title: z.string().min(1, { message: "必須です" }),
    dueDate: z.string().min(1, { message: "必須です" }),
    description: z.string().optional(),
  });
  useEffect(() => {
    if (!data) return;
    const filtringData = data.longVacations.find(
      item => item.childId === childId && item.isActive
    );
    setLongVacationId(filtringData?.id || "");
  }, [data, setLongVacationId, childId]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<HomeworkForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      dueDate: "",
      description: "",
    },
  });

  const onSubmitHomework = async (data: HomeworkForm) => {
    try {
      await api.post<PostRequest, { message: string }>(
        `/api/children/${childId}`,
        {
          dueDate: new Date(data.dueDate),
          title: data.title,
          description: data.description,
          longVacationId,
        }
      );
      mutate();
      reset();
      toast.success("宿題登録しました");
    } catch (e) {
      console.error(e);
      toast.error("宿題登録に失敗しました");
    }
    setIsTaskModalOpen(false);
  };

  return (
    <>
      <Button
        variant="bg-gray"
        onClick={() => {
          setIsTaskModalOpen(true);
        }}
      >
        宿題登録
      </Button>

      <Modal
        isOpen={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false);
          reset();
        }}
      >
        <div
          className="h-[70%] w-[500px] bg-white p-10 text-black rounded-md flex flex-col gap-6 shadow-lg"
          onClick={event => event.stopPropagation()}
        >
          <h3 className="text-xl font-bold mb-4 text-center ">宿題登録</h3>
          <form
            className="flex flex-col gap-2"
            onSubmit={handleSubmit(onSubmitHomework)}
          >
            <div className="flex flex-col col-span-2">
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
            <div className="flex flex-col w-full">
              <label className="font-medium">提出日</label>
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
            <div>
              <label>休暇</label>
              <VacationSlect
                childId={childId}
                longVacationId={longVacationId}
                setLongVacationId={setLongVacationId}
              />
            </div>

            <div className="col-span-2 mt-4 text-center">
              <Button type="submit" variant="bg-beige">
                登録
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};
