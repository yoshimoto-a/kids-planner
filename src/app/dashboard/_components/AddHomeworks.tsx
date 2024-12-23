"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/app/_utils/api";
import { PostRequest } from "@/app/_types/homework/PostRequest";
import { KeyedMutator } from "swr";
import { DashboardResponse } from "@/app/_types/Dashboard/Responase";
import { Modal } from "@/app/_components/Modal";
import { Button } from "@/app/_components/Button";
import { useState } from "react";

interface Props {
  data: DashboardResponse;
  mutate: KeyedMutator<DashboardResponse | undefined>;
}
export const AddHomeworks: React.FC<Props> = ({ data, mutate }) => {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
  const schema = z.object({
    title: z.string().min(1, { message: "必須です" }),
    dueDate: z
      .string()
      .min(1, { message: "必須です" })
      .transform(str => {
        const date = new Date(str);
        if (isNaN(date.getTime())) {
          throw new Error("有効な日付を入力してください");
        }
        return date;
      }),
    description: z.string().optional(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      dueDate: new Date(),
      description: "",
    },
  });
  type TaskFormData = z.infer<typeof schema>;

  const onSubmitHomework = async (data: TaskFormData) => {
    try {
      await api.post<PostRequest, { message: string }>(
        `/api/children/${selectedChildId}`,
        {
          dueDate: new Date(data.dueDate),
          title: data.title,
          description: data.description,
        }
      );
      mutate();
      reset();
      alert("宿題登録しました");
    } catch (e) {
      console.error(e);
      alert("宿題登録に失敗しました");
    }
    setIsTaskModalOpen(false);
    setSelectedChildId(null);
  };

  return (
    <div>
      {data.children.map(child => (
        <div key={child.id}>
          <div className="py-3 flex w-full justify-between items-center">
            <div>{child.name}</div>
            <div className="flex gap-2">
              <Button
                variant="bg-gray"
                onClick={() => {
                  setIsTaskModalOpen(true);
                  setSelectedChildId(child.id);
                }}
              >
                宿題登録
              </Button>
            </div>

            <Modal
              isOpen={isTaskModalOpen}
              onClose={() => {
                setIsTaskModalOpen(false);
                setSelectedChildId(null);
              }}
            >
              <div
                className="h-[70%] w-[500px] bg-white p-10 text-black rounded-md flex flex-col gap-6 shadow-lg"
                onClick={event => event.stopPropagation()}
              >
                <h3 className="text-xl font-bold mb-4 text-center ">
                  宿題登録
                </h3>
                <form
                  className="grid grid-cols-2 gap-4"
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
                  <div className="col-span-2 mt-4">
                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white rounded py-2 font-semibold hover:bg-blue-700 transition"
                    >
                      登録
                    </button>
                  </div>
                </form>
              </div>
            </Modal>
          </div>
        </div>
      ))}
    </div>
  );
};
