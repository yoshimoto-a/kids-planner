import { Button } from "@/app/_components/Button";
import { Modal } from "@/app/_components/Modal";
import { PostRequest } from "@/app/_types/child/PostRequest";
import { PutRequest } from "@/app/_types/child/PutRequest";
import { DashboardResponse } from "@/app/_types/Dashboard/Responase";
import { api } from "@/app/_utils/api";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { KeyedMutator } from "swr";
import toast from "react-hot-toast";
interface Props {
  data: DashboardResponse;
  mutate: KeyedMutator<DashboardResponse | undefined>;
}
export const ChildrenSection: React.FC<Props> = ({ data, mutate }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [inputName, setInputName] = useState("");

  const handleOpen = (name: string) => {
    setInputName(name);
    setIsEditModalOpen(true);
  };
  const create = async () => {
    try {
      await api.post<PostRequest, { message: string }>("/api/children", {
        name: inputName,
      });
      mutate();
    } catch (e) {
      console.error(e);
      toast.success("登録に失敗しました");
    }
    setInputName("");
    setIsAddModalOpen(false);
  };
  const update = async (id: string) => {
    try {
      await api.put<PutRequest, { message: string }>(`/api/children/${id}`, {
        name: inputName,
      });
      mutate();
      setIsEditModalOpen(false);
    } catch (e) {
      console.error(e);
      toast.error("更新に失敗しました");
    }
    setInputName("");
  };
  const del = async (id: string) => {
    try {
      await api.del(`/api/children/${id}`);
      setInputName("");
      mutate();
      setIsEditModalOpen(false);
      toast.success("削除しました");
    } catch (e) {
      console.error(e);
      toast.error("削除に失敗しました");
    }
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="py-5 text-xl">こどもの設定</div>
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
          <div
            className="h-[50%] w-[400px] bg-white p-10 text-black rounded-md flex flex-col justify-center gap-8"
            onClick={event => event.stopPropagation()}
          >
            <h3 className="text-center">こども情報追加</h3>
            <input
              type="text"
              placeholder="名前"
              className="p-2 border rounded-sm w-full"
              value={inputName}
              onChange={e => setInputName(e.target.value)}
            />
            <Button type="button" variant="bg-blue" onClick={create}>
              登録
            </Button>
          </div>
        </Modal>
      </div>
      <div className="flex flex-col gap-3">
        {data.children.map(child => (
          <div key={child.id}>
            <div
              className="flex justify-between shadow-sm w-full p-2 border cursor-pointer"
              onClick={() => handleOpen(child.name)}
            >
              <div>{child.name}</div>
              <FontAwesomeIcon
                className="text-xl text-[#ACAAA9]"
                icon={faPen}
              />
            </div>

            <Modal
              onClose={() => setIsEditModalOpen(false)}
              isOpen={isEditModalOpen}
            >
              <div
                className="h-[50%] w-[400px] bg-white p-10 text-black rounded-md flex flex-col justify-center gap-8"
                onClick={event => event.stopPropagation()}
              >
                <h3 className="text-center text-xl">編集</h3>
                <input
                  type="text"
                  placeholder="名前"
                  className="p-2 border rounded-sm w-full"
                  value={inputName}
                  onChange={e => setInputName(e.target.value)}
                />
                <Button
                  type="button"
                  variant="bg-blue"
                  onClick={() => update(child.id)}
                >
                  登録
                </Button>
                <Button
                  type="button"
                  variant="bg-gray"
                  onClick={() => del(child.id)}
                >
                  削除
                </Button>
              </div>
            </Modal>
          </div>
        ))}
      </div>
    </>
  );
};
