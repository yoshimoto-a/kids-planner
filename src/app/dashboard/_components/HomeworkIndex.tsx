"use client";
import { DashboardResponse } from "@/app/_types/Dashboard/Responase";
import { KeyedMutator } from "swr";
import { Modal } from "@/app/_components/Modal";
import { useControlHomework } from "../_hooks/useControlHomework";
import { HomeworkTable } from "./HomeworkTable";
import { AddHomeworks } from "./AddHomeworks";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
interface Props {
  data: DashboardResponse;
  mutate: KeyedMutator<DashboardResponse | undefined>;
}
export const HomeworkIndex: React.FC<Props> = ({ data, mutate }) => {
  const {
    openEditModal,
    deleteHomework,
    onSubmitHomework,
    register,
    errors,
    isTaskModalOpen,
    setIsTaskModalOpen,
    setSelectedHomework,
  } = useControlHomework(mutate);

  return (
    <div>
      {data.children.map(child => {
        return (
          <div key={child.id} className="mb-3">
            <div className="flex justify-between items-center">
              <Link
                href={`/dashboard/child/${child.id}`}
                className="text-lg inline cursor-pointer"
                target="_blank"
              >
                {child.name}
                <FontAwesomeIcon
                  className="text-sm pl-2"
                  icon={faArrowUpRightFromSquare}
                />
              </Link>
              <AddHomeworks childId={child.id} mutate={mutate} />
            </div>
            <div className="pt-3 flex flex-col gap-2">
              {data.homeworks.filter(homework => homework.childId === child.id)
                .length === 0 ? (
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
                  <Modal
                    isOpen={isTaskModalOpen}
                    onClose={() => {
                      setIsTaskModalOpen(false);
                      setSelectedHomework(null);
                    }}
                  >
                    <div
                      className="h-[70%] w-[500px] bg-white p-10 text-black rounded-md flex flex-col gap-6 shadow-lg"
                      onClick={event => event.stopPropagation()}
                    >
                      <h3 className="text-xl font-bold mb-4 text-center ">
                        宿題編集
                      </h3>
                      <form
                        className="grid grid-cols-2 gap-4"
                        onSubmit={onSubmitHomework}
                      >
                        <div className="flex flex-col col-span-2">
                          <label className="font-medium">宿題</label>
                          <input
                            type="text"
                            className="border rounded p-2"
                            placeholder="内容を入力"
                            {...register("title")}
                          />
                          {errors.title && (
                            <p className="text-red-600 text-sm mt-1">
                              {errors.title.message}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col col-span-2">
                          <label className="font-medium">詳細</label>
                          <input
                            type="text"
                            className="border rounded p-2"
                            placeholder="詳細を入力"
                            {...register("description")}
                          />
                          {errors.description && (
                            <p className="text-red-600 text-sm mt-1">
                              {errors.description.message}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col">
                          <label className="font-medium">提出日:</label>
                          <input
                            type="date"
                            className="border rounded p-2"
                            {...register("dueDate")}
                          />
                          {errors.dueDate && (
                            <p className="text-red-600 text-sm mt-1">
                              {errors.dueDate.message}
                            </p>
                          )}
                        </div>
                        <div className="col-span-2 mt-4 flex flex-col gap-5">
                          <button
                            type="submit"
                            className="w-full bg-blue-600 text-white rounded py-2 font-semibold hover:bg-blue-700 transition"
                          >
                            登録
                          </button>
                          <button
                            type="button"
                            className="w-full bg-gray-600 text-white rounded py-2 font-semibold hover:bg-blue-700 transition"
                            onClick={deleteHomework}
                          >
                            削除
                          </button>
                        </div>
                      </form>
                    </div>
                  </Modal>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
