interface Props {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}

export const LabelWithError: React.FC<Props> = ({
  label,
  required = false,
  error,
  children,
}) => (
  <div className="flex flex-col gap-1">
    <label>
      {required && <span className="text-red-600 text-sm">※</span>}
      {label}
    </label>
    {children}
    {error && <p className="text-red-600 text-sm">{error}</p>}
  </div>
);
