"use client";
import { useReward } from "react-rewards";
import { Homework } from "@prisma/client";
import { updateSubmitted } from "@/app/dashboard/_utils/updateSubmitted";
import { IndexResponse } from "@/app/_types/homework/IndexResponse";
import { KeyedMutator } from "swr";
interface Props {
  homework: Homework;
  mutate: KeyedMutator<IndexResponse | undefined>;
}
export const HomeworkItem: React.FC<Props> = ({ homework, mutate }) => {
  const { reward } = useReward(`rewardId`, "confetti");
  return (
    <div
      key={homework.id}
      className={`p-4 border rounded-md ${
        homework.submitted ? "bg-gray-100" : "bg-white"
      }`}
    >
      <div className="pt-3 flex flex-col gap-1">
        <div>{homework.title}</div>
        <div className="text-sm">{homework.description}</div>
        <span id="rewardId" />
      </div>
      <div className={`pt-3 flex flex-col items-center gap-2 `}>
        <button
          type="button"
          className="rounded-full border w-32 h-32 flex justify-center items-center"
          onClick={() => {
            updateSubmitted<IndexResponse | undefined>({
              id: homework.id,
              submittedStatus: homework.submitted,
              mutate,
            });
            reward();
          }}
        >
          <div>{homework.submitted ? "できたね！" : "がんばれ！"}</div>
        </button>
      </div>
    </div>
  );
};
