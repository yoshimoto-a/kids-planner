"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/app/_utils/api";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { PutRequest } from "@/app/_types/homework/PutRequest";
import { Homework } from "@prisma/client";
import toast from "react-hot-toast";
import { KeyedMutator } from "swr";
import { IndexResponse } from "@/app/_types/homework/IndexResponse";
import { HomeworkForm } from "../../homework/_types/HomeworkForm";
export const useControlHomework = (
  mutate: KeyedMutator<IndexResponse | undefined>
) => {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedHomework, setSelectedHomework] = useState<Homework | null>(
    null
  );
  const [longVacationId, setLongVacationId] = useState("");
  useEffect(() => {
    if (!selectedHomework) return;
    setLongVacationId(selectedHomework.longVacationId || "");
  }, [selectedHomework]);
  const schema = z.object({
    title: z.string().min(1, { message: "必須です" }),
    dueDate: z.string().min(1, { message: "必須です" }),
    description: z.string().optional(),
    submitted: z.boolean().optional(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<HomeworkForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      dueDate: "",
      description: "",
      submitted: false,
    },
  });

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

  const onSubmitHomework = async (data: HomeworkForm) => {
    if (!selectedHomework) return;
    try {
      await api.put<PutRequest, { message: string }>(
        `/api/homework/${selectedHomework.id}`,
        {
          dueDate: new Date(data.dueDate),
          title: data.title,
          description: data.description,
          longVacationId,
        }
      );
      mutate();
      toast.success("宿題更新しました");
    } catch (e) {
      console.error(e);
      toast.error("更新に失敗しました");
    }
    setIsTaskModalOpen(false);
    setSelectedHomework(null);
  };
  const deleteHomework = async () => {
    if (!selectedHomework) return;
    try {
      await api.del(`/api/homework/${selectedHomework.id}`);
      mutate();
      toast.success("削除しました");
    } catch (e) {
      console.error(e);
      toast.error("削除に失敗しました");
    }
    setIsTaskModalOpen(false);
    setSelectedHomework(null);
  };

  return {
    openEditModal,
    deleteHomework,
    onSubmitHomework: handleSubmit(onSubmitHomework),
    register,
    errors,
    isTaskModalOpen,
    setIsTaskModalOpen,
    setSelectedHomework,
    selectedHomework,
    longVacationId,
    setLongVacationId,
  };
};
