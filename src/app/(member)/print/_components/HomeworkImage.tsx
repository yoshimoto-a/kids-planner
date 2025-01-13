import { useImage } from "../_hooks/useImage";
import Image from "next/image";
interface Props {
  childId: string;
}
export const HomeworkImage: React.FC<Props> = ({ childId }) => {
  const { data, error } = useImage({ childId });
  if (!data) return <div className="text-center pt-20">読込み中...</div>;
  if (error) return <div className="text-center pt-20">データ取得に失敗</div>;

  return (
    <div>
      <Image width={200} height={200} alt="宿題一覧" src={data.image}></Image>
    </div>
  );
};
