import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
interface Props {
  url: string;
  iconName: IconDefinition;
  title: string;
}
export const FooterItem: React.FC<Props> = ({ url, iconName, title }) => {
  const { replace } = useRouter();
  return (
    <div
      onClick={() => replace(url)}
      className="flex flex-col justify-center items-center gap-1 cursor-pointer"
    >
      <FontAwesomeIcon icon={iconName} className="text-2xl" />
      <div className="text-sm">{title}</div>
    </div>
  );
};
