import { LongVacationForm as Form } from "../../_types/LongVacationForm";
import { Button } from "@/app/_components/Button";
import { SingleChildSelect } from "@/app/(member)/_components/SingleChildSelect";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { LabelWithError } from "./LabelWithError";
import { InputField } from "./InputField";
import { CheckboxWithLabel } from "./CheckboxWithLabel";
interface Props {
  mode: "add" | "update";
  onSubmit: () => void;
  del?: () => void;
  childId: string;
  setChildId: (childId: string) => void;
  register: UseFormRegister<Form>;
  errors: FieldErrors<Form>;
  isSubmitting: boolean;
}
export const LongVacationForm: React.FC<Props> = ({
  mode,
  onSubmit,
  del,
  childId,
  setChildId,
  register,
  errors,
  isSubmitting,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="w-[400px] bg-white p-10 text-black rounded-md flex flex-col justify-center gap-2"
      onClick={event => event.stopPropagation()}
    >
      <h3 className="text-center">
        {mode === "add" ? "長期休暇追加" : "長期休暇編集"}
      </h3>
      <SingleChildSelect childId={childId} setChildId={setChildId} />

      <LabelWithError label="休暇名" required error={errors.title?.message}>
        <InputField type="text" register={register("title")} />
      </LabelWithError>

      <LabelWithError label="開始日" required error={errors.startDate?.message}>
        <InputField type="date" register={register("startDate")} />
      </LabelWithError>

      <LabelWithError label="終了日" required error={errors.endDate?.message}>
        <InputField type="date" register={register("endDate")} />
      </LabelWithError>

      <LabelWithError label="登校日">
        <InputField type="date" register={register("schoolDay")} />
      </LabelWithError>

      <CheckboxWithLabel
        label="有効化"
        description="(有効化すると他の休暇は無効化されます)"
        register={register("isActive")}
      />

      <Button type="submit" variant="bg-beige" disabled={isSubmitting}>
        {mode === "add" ? "登録" : "更新"}
      </Button>
      {mode === "update" && (
        <Button
          type="button"
          variant="bg-gray"
          onClick={del}
          disabled={isSubmitting}
        >
          削除
        </Button>
      )}
    </form>
  );
};
