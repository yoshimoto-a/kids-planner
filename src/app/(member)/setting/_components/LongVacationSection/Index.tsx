import { Button } from "@/app/_components/Button";
import { Modal } from "@/app/_components/Modal";
import { useState } from "react";
import { useLongVacation } from "@/app/(member)/longVacation/_hooks/useLongVacation";
import { AddModalContents } from "./AddModalContents";
import { Table } from "./Table";
import { LongVacation } from "@prisma/client";
import { UpdateModalContents } from "./UpdateModalContents";
import { ChildSelect } from "./ChildSelect";
import { ActiveSelect } from "./ActiveSelect";

export const LongVacationSection: React.FC = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selected, setSelected] = useState<LongVacation | null>(null);
  const [childIds, setChildIds] = useState<string[]>([]);
  const [isActive, setIsActive] = useState<(boolean | null)[]>([]);

  const { data, error } = useLongVacation();
  if (!data) return <div className="pt-[60px] text-center">読込み中...</div>;
  if (error)
    return <div className="pt-[60px] text-center">エラー発生しました</div>;

  const filterData = data.longVacations.filter(item => {
    const matchesChild =
      childIds?.length === 0 || childIds?.includes(item.childId);
    const matchesActive =
      isActive.length === 0 ||
      isActive.some(val => val === null || item.isActive === val);
    return matchesChild && matchesActive;
  });
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex">
          <ChildSelect childrenIds={childIds} setChildIds={setChildIds} />
          <ActiveSelect isActive={isActive} setIsActive={setIsActive} />
        </div>
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
          <AddModalContents setIsModalOpen={setIsAddModalOpen} />
        </Modal>
      </div>
      <div className="flex flex-col gap-3">
        {filterData.length !== 0 ? (
          <>
            <Table
              data={filterData}
              setSelected={setSelected}
              openEditModal={setIsEditModalOpen}
            />
            <Modal
              isOpen={isEditModalOpen}
              onClose={() => {
                setIsEditModalOpen(false);
                setSelected(null);
              }}
            >
              {selected && (
                <UpdateModalContents
                  setIsModalOpen={setIsEditModalOpen}
                  selectedData={selected}
                />
              )}
            </Modal>
          </>
        ) : (
          <div className="text-center pt-5">データがありません</div>
        )}
      </div>
    </>
  );
};
