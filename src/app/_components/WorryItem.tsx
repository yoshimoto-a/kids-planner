import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  text: string;
}
export const WorryItem: React.FC<Props> = ({ text }) => {
  return (
    <li>
      <FontAwesomeIcon className="pr-1 text-beige" icon={faCheck} />
      {text}
    </li>
  );
};
