import Image from "next/image";
import { Title } from "../Title";
import { ReactNode } from "react";
interface Props {
  title: string;
  imageSrc: string;
  children: ReactNode;
}
export const Section: React.FC<Props> = ({ title, children, imageSrc }) => {
  return (
    <div className="flex flex-col gap-8 pb-10">
      <Title>{title}</Title>
      {children}
      <div className="flex justify-center">
        <Image src={imageSrc} alt="" width={400} height={800} />
      </div>
    </div>
  );
};
