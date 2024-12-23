"use client";
import { DashboardResponse } from "@/app/_types/Dashboard/Responase";
import { KeyedMutator } from "swr";
import { AddHomeworks } from "./AddHomeworks";
import { HomeworkIndex } from "./HomeworkIndex";
interface Props {
  data: DashboardResponse;
  mutate: KeyedMutator<DashboardResponse | undefined>;
}
export const HomeworkSection: React.FC<Props> = ({ data, mutate }) => {
  return (
    <>
      <h3 className="pt-5 text-xl">宿題登録</h3>
      <AddHomeworks data={data} mutate={mutate} />
      <HomeworkIndex data={data} mutate={mutate} />
    </>
  );
};
