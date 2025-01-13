import { UseFormRegister } from "react-hook-form";
import { LongVacationForm } from "../../_types/LongVacationForm";

interface Props {
  label: string;
  register: ReturnType<UseFormRegister<LongVacationForm>>;
  description?: string;
}

export const CheckboxWithLabel: React.FC<Props> = ({
  label,
  register,
  description,
}) => (
  <label className="flex justify-start items-center gap-2">
    <input type="checkbox" className="transform scale-150" {...register} />
    {label}
    {description && <span className="text-xs">{description}</span>}
  </label>
);
