import { UseFormRegister } from "react-hook-form";
import { LongVacationForm } from "../../_types/LongVacationForm";
interface Props {
  type: string;
  placeholder?: string;
  className?: string;
  register: ReturnType<UseFormRegister<LongVacationForm>>;
}

export const InputField: React.FC<Props> = ({
  type,
  placeholder,
  className,
  register,
}) => (
  <input
    type={type}
    placeholder={placeholder}
    className={`p-2 border rounded-sm w-full ${className}`}
    {...register}
  />
);
