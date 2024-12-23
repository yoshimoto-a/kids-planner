"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/app/_utils/api";
import { DashboardResponse } from "@/app/_types/Dashboard/Responase";
import { KeyedMutator } from "swr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import { useState } from "react";
import { PutRequest } from "@/app/_types/homework/PutRequest";
import { Modal } from "@/app/_components/Modal";
import { Homework } from "@prisma/client";

interface Props {
  data: DashboardResponse;
  mutate: KeyedMutator<DashboardResponse | undefined>;
}
export const HomeworkIndex: React.FC<Props> = ({ data, mutate }) => {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedHomework, setSelectedHomework] = useState<Homework | null>(
    null
  );
  const schema = z.object({
    title: z.string().min(1, { message: "必須です" }),
    dueDate: z
      .string()
      .min(1, { message: "必須です" })
      .refine(
        str => dayjs(str, "YYYY-MM-DD", true).isValid(), // 厳密に日付フォーマットをチェック
        { message: "有効な日付を入力してください" }
      ),
    description: z.string().optional(),
    submitted: z.boolean().optional(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<HomeworkFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      dueDate: "",
      description: "",
      submitted: false,
    },
  });
  type HomeworkFormData = z.infer<typeof schema>;

  const openEditModal = (homework: Homework) => {
    setSelectedHomework(homework);
    reset({
      title: homework.title,
      dueDate: dayjs(homework.dueDate).format("YYYY-MM-DD"),
      description: homework.description || "",
      submitted: homework.submitted || false,
    });
    setIsTaskModalOpen(true);
  };

  const onSubmitHomework = async (data: HomeworkFormData) => {
    if (!selectedHomework) return;
    try {
      await api.put<PutRequest, { message: string }>(
        `/api/homework/${selectedHomework.id}`,
        {
          dueDate: new Date(data.dueDate),
          title: data.title,
          description: data.description,
          submitted: data.submitted || false,
        }
      );
      mutate();
      alert("宿題更新しました");
    } catch (e) {
      console.error(e);
      alert("更新に失敗しました");
    }
    setIsTaskModalOpen(false);
    setSelectedHomework(null);
  };
  const deleteHomework = async () => {
    if (!selectedHomework) return;
    try {
      await api.del(`/api/homework/${selectedHomework.id}`);
      mutate();
      alert("削除しました");
    } catch (e) {
      console.error(e);
      alert("削除に失敗しました");
    }
    setIsTaskModalOpen(false);
    setSelectedHomework(null);
  };
  return (
    <div>
      <h3 className="text-xl py-5">宿題一覧</h3>
      {data.children.map(child => {
        return (
          <div key={child.id}>
            <div className="text-lg border-b-2 inline px-2">{child.name}</div>
            <div className="pt-3">
              {data.homeworks
                .filter(homework => homework.childId === child.id)
                .map(homework => (
                  <div
                    key={homework.id}
                    className="flex gap-3 justify-between items-center border p-2"
                  >
                    <div>{homework.title}</div>
                    <div>
                      {homework.dueDate &&
                        dayjs(homework.dueDate).format("YYYY-MM-DD〆")}
                    </div>
                    <button
                      type="button"
                      onClick={() => openEditModal(homework)}
                    >
                      <FontAwesomeIcon
                        className="text-xl text-[#ACAAA9]"
                        icon={faPen}
                      />
                    </button>
                    <Modal
                      isOpen={isTaskModalOpen}
                      onClose={() => {
                        reset();
                        setIsTaskModalOpen(false);
                        setSelectedHomework(null);
                      }}
                    >
                      <div
                        className="h-[70%] w-[500px] bg-white p-10 text-black rounded-md flex flex-col gap-6 shadow-lg"
                        onClick={event => event.stopPropagation()}
                      >
                        <h3 className="text-xl font-bold mb-4 text-center ">
                          宿題編集
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
                          <div className="col-span-2 mt-4 flex flex-col gap-5">
                            <button
                              type="submit"
                              className="w-full bg-blue-600 text-white rounded py-2 font-semibold hover:bg-blue-700 transition"
                            >
                              登録
                            </button>
                            <button
                              type="button"
                              className="w-full bg-gray-600 text-white rounded py-2 font-semibold hover:bg-blue-700 transition"
                              onClick={deleteHomework}
                            >
                              削除
                            </button>
                          </div>
                        </form>
                      </div>
                    </Modal>
                  </div>
                ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
