import { ReactNode } from "react";
interface Props {
  children: ReactNode;
}
export const Title: React.FC<Props> = ({ children }) => {
  return (
    <h2
      className={`text-center relative text-2xl font-bold before:absolute before:left-16 before:top-3 before:h-[3px] before:w-[30px] before:translate-y-1/2 before:rotate-[60deg] before:rounded-sm before:bg-accentBeige  before:content-[''] after:absolute after:right-16 after:top-3 after:h-[3px] after:w-[30px] after:translate-y-1/2 after:rotate-[-60deg] after:rounded-sm after:bg-accentBeige after:content-['']`}
    >
      {children}
    </h2>
  );
};
