import { Button } from "@/app/_components/Button";
import { Modal } from "@/app/_components/Modal";
import { PostRequest } from "@/app/_types/child/PostRequest";
import { api } from "@/app/_utils/api";
import { useState } from "react";
import toast from "react-hot-toast";
import { useChildren } from "../../../_hooks/useChildren";
import { Color } from "@prisma/client";
import { ChildForm } from "./ChildForm";
export const AddChild: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [inputName, setInputName] = useState("");
  const [color, setColor] = useState<Color>("RED");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate } = useChildren();

  const create = async () => {
    setIsSubmitting(true);
    try {
      await api.post<PostRequest, { message: string }>("/api/children", {
        name: inputName,
        color,
      });
      mutate();
    } catch (e) {
      console.error(e);
      toast.success("登録に失敗しました");
    }
    setInputName("");
    setIsAddModalOpen(false);
    setIsSubmitting(false);
  };
  return (
    <>
      <div className="flex items-center justify-end">
        <Button
          type="button"
          variant="bg-gray"
          onClick={() => {
            setIsAddModalOpen(true);
          }}
        >
          追加
        </Button>
        <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
          <ChildForm
            color={color}
            inputName={inputName}
            isSubmitting={isSubmitting}
            mode="add"
            onSubmit={create}
            setColor={setColor}
            setInputName={setInputName}
          />
        </Modal>
      </div>
    </>
  );
};
