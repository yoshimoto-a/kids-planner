import { Button } from "@/app/_components/Button";
import { Modal } from "@/app/_components/Modal";
import { PostRequest } from "@/app/_types/child/PostRequest";
import { PutRequest } from "@/app/_types/child/PutRequest";
import { DashboardResponse } from "@/app/_types/Dashboard/Responase";
import { api } from "@/app/_utils/api";
import { useState } from "react";
import { KeyedMutator } from "swr";
interface Props {
  data: DashboardResponse;
  mutate: KeyedMutator<DashboardResponse | undefined>;
}
export const ChildrenSection: React.FC<Props> = ({ data, mutate }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [name, setName] = useState("");

  const handleOpen = (name: string) => {
    setName(name);
    setIsEditModalOpen(true);
  };
  const create = async () => {
    try {
      await api.post<PostRequest, { message: string }>("/api/children", {
        name,
      });
      setName("");
      mutate();
      setIsEditModalOpen(false);
    } catch (e) {
      console.error(e);
      alert("登録に失敗しました");
    }
  };
  const update = async (id: string) => {
    try {
      await api.put<PutRequest, { message: string }>(`/api/children/${id}`, {
        name,
      });
      setName("");
      mutate();
      setIsEditModalOpen(false);
    } catch (e) {
      console.error(e);
      alert("更新に失敗しました");
    }
  };
  const del = async (id: string) => {
    try {
      await api.del(`/api/children/${id}`);
      setName("");
      mutate();
      setIsEditModalOpen(false);
    } catch (e) {
      console.error(e);
      alert("削除に失敗しました");
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
            /**子供追加モーダル */
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
              value={name}
              onChange={e => setName(e.target.value)}
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
              className="shadow-sm w-full p-2 border cursor-pointer"
              onClick={() => handleOpen(child.name)}
            >
              {child.name}
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
                  value={name}
                  onChange={e => setName(e.target.value)}
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
