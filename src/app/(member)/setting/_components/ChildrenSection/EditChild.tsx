import { Modal } from "@/app/_components/Modal";
import { PutRequest } from "@/app/_types/child/PutRequest";
import { api } from "@/app/_utils/api";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import toast from "react-hot-toast";
import { Child, Color } from "@prisma/client";
import { ChildForm } from "./ChildForm";
import { useChildren } from "@/app/(member)/_hooks/useChildren";

interface Props {
  child: Child;
}
export const EditChild: React.FC<Props> = ({ child }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [inputName, setInputName] = useState(child.name);
  const [color, setColor] = useState<Color>(child.color);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate } = useChildren();

  const update = async () => {
    setIsSubmitting(true);
    try {
      await api.put<PutRequest, { message: string }>(
        `/api/children/${child.id}`,
        {
          name: inputName,
          color,
        }
      );
      mutate();
      setIsEditModalOpen(false);
    } catch (e) {
      console.error(e);
      toast.error("更新に失敗しました");
    }
    setInputName("");
    setIsSubmitting(false);
  };
  const del = async () => {
    setIsSubmitting(true);
    try {
      await api.del(`/api/children/${child.id}`);
      setInputName("");
      mutate();
      setIsEditModalOpen(false);
      toast.success("削除しました");
    } catch (e) {
      console.error(e);
      toast.error("削除に失敗しました");
    }
    setIsSubmitting(false);
  };
  return (
    <>
      <div
        className="flex justify-between w-full p-2 cursor-pointer"
        onClick={() => setIsEditModalOpen(true)}
      >
        <div>{child.name}</div>
        <FontAwesomeIcon className="text-xl text-[#ACAAA9]" icon={faPen} />
      </div>

      <Modal onClose={() => setIsEditModalOpen(false)} isOpen={isEditModalOpen}>
        <ChildForm
          color={color}
          inputName={inputName}
          isSubmitting={isSubmitting}
          mode="update"
          onSubmit={update}
          setColor={setColor}
          setInputName={setInputName}
          del={del}
        />
      </Modal>
    </>
  );
};
