import { DefaultValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { LongVacationForm } from "../_types/LongVacationForm";
export const useLongVacationForm = (
  defaultValues?: DefaultValues<LongVacationForm>,
  getChildId?: string
) => {
  const [childId, setChildId] = useState<string>(getChildId || "");
  const schema = z.object({
    title: z.string().min(1, { message: "必須です" }),
    startDate: z.string().min(1, { message: "日付は必須です" }),
    endDate: z.string().min(1, { message: "日付は必須です" }),
    schoolDay: z.string(),
    isActive: z.boolean(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LongVacationForm>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues,
  });

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    reset,
    childId,
    setChildId,
  };
};
