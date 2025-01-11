"use client";
import { DashboardResponse } from "@/app/_types/Dashboard/Responase";
import { KeyedMutator } from "swr";
import { HomeworkIndex } from "./HomeworkIndex";
interface Props {
  data: DashboardResponse;
  mutate: KeyedMutator<DashboardResponse | undefined>;
}
export const HomeworkSection: React.FC<Props> = ({ data, mutate }) => {
  return (
    <>
      <h3 className="text-xl py-5">宿題一覧</h3>
      <HomeworkIndex data={data} mutate={mutate} />
    </>
  );
};
