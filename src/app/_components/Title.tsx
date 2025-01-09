import { ReactNode } from "react";
interface Props {
  children: ReactNode;
}
export const Title: React.FC<Props> = ({ children }) => {
  return <h2 className="text-2xl text-center">{children}</h2>;
};
