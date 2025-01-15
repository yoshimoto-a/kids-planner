import { Button } from "@/app/_components/Button";
import { ColorSelect } from "@/app/(member)/_components/ColorSelect";
import { Color } from "@prisma/client";
interface Props {
  mode: "add" | "update";
  onSubmit: () => void;
  del?: () => void;
  inputName: string;
  setInputName: (inputName: string) => void;
  color: Color;
  setColor: (color: Color) => void;
  isSubmitting: boolean;
}
export const ChildForm: React.FC<Props> = ({
  mode,
  onSubmit,
  del,
  inputName,
  setInputName,
  color,
  setColor,
  isSubmitting,
}) => {
  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        onSubmit();
      }}
      className="h-[60%] w-[400px] bg-white p-10 text-black rounded-md flex flex-col justify-center gap-8"
      onClick={event => event.stopPropagation()}
    >
      <h3 className="text-center text-xl">
        {mode === "add" ? "子供情報追加" : "子供情報編集"}
      </h3>
      <input
        type="text"
        placeholder="名前"
        className="p-2 border rounded-sm w-full"
        value={inputName}
        onChange={e => setInputName(e.target.value)}
      />
      <ColorSelect color={color} setColor={setColor} />
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
