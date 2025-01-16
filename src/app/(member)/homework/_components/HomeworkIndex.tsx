"use client";
import { HomeworkTable } from "./HomeworkTable";
import { AddHomeworkWithModal } from "./AddHomeworkWithModal";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useHomework } from "../../_hooks/useHomework";
import { EditHomeworkWithModal } from "./EditHomeworkWithModal";
import { useControlHomework } from "../../dashboard/_hooks/useControlHomework";
import { SkeletonItem } from "./SkeletonItem";

export const HomeworkIndex: React.FC = () => {
  const { data, mutate } = useHomework();
  const {
    openEditModal,
    onSubmitHomework,
    register,
    errors,
    isTaskModalOpen,
    setIsTaskModalOpen,
    deleteHomework,
    selectedHomework,
    longVacationId,
    setLongVacationId,
  } = useControlHomework(mutate);

  return (
    <div>
      {data ? (
        data.children.map(child => {
          return (
            <div key={child.id} className="mb-3">
              <div className="flex justify-between items-center">
                <Link
                  href={`/children/${child.id}`}
                  className="text-lg inline cursor-pointer"
                  target="_blank"
                >
                  {child.name}
                  <FontAwesomeIcon
                    className="text-sm pl-2"
                    icon={faArrowUpRightFromSquare}
                  />
                </Link>
                <AddHomeworkWithModal childId={child.id} mutate={mutate} />
              </div>
              <div className="pt-3 flex flex-col gap-2">
                {data.homeworks.filter(
                  homework => homework.childId === child.id
                ).length === 0 ? (
                  <div className="text-center text-gray-500">
                    登録された宿題がありません
                  </div>
                ) : (
                  <>
                    <HomeworkTable
                      openEditModal={openEditModal}
                      data={data.homeworks.filter(
                        homework => homework.childId === child.id
                      )}
                      mutate={mutate}
                    />

                    <EditHomeworkWithModal
                      isOpen={isTaskModalOpen}
                      onClose={() => setIsTaskModalOpen(false)}
                      onSubmit={onSubmitHomework}
                      register={register}
                      errors={errors}
                      selectedHomework={selectedHomework}
                      deleteHomework={deleteHomework}
                      longVacationId={longVacationId}
                      setLongVacationId={setLongVacationId}
                    />
                  </>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex flex-col gap-3">
          <SkeletonItem />
          <SkeletonItem />
        </div>
      )}
    </div>
  );
};
