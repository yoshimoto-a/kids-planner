"use client";
import { useReward } from "react-rewards";
import { Homework } from "@prisma/client";
import { updateSubmitted } from "@/app/dashboard/_utils/updateSubmitted";
import { IndexResponse } from "@/app/_types/homework/IndexResponse";
import { KeyedMutator } from "swr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
interface Props {
  homework: Homework;
  mutate: KeyedMutator<IndexResponse | undefined>;
}
export const HomeworkItem: React.FC<Props> = ({ homework, mutate }) => {
  const rewardId = `reward-${homework.id}`;
  const { reward } = useReward(rewardId, "emoji", {
    emoji: [
      "🎉",
      "✨",
      "🌟",
      "🎈",
      "🎂",
      "🍭",
      "🍬",
      "🦄",
      "🌈",
      "🍓",
      "🐶",
      "🐱",
      "🐰",
      "🦊",
      "🐻",
      "🐼",
      "🐥",
      "🐸",
      "🌸",
    ],
    elementCount: 100, // エフェクト量を増やす
    spread: 100, // 拡散範囲を広げる
  });

  const handleSubmit = () => {
    if (homework.submitted) return;
    updateSubmitted<IndexResponse | undefined>({
      id: homework.id,
      submittedStatus: homework.submitted,
      mutate,
    });
    reward();
  };
  return (
    <div
      key={homework.id}
      className={`relative p-4 border-2 border-gray rounded-md  ${
        homework.submitted && "bg-accentBeige"
      }`}
    >
      {homework.submitted && (
        <FontAwesomeIcon
          icon={faCrown}
          className="text-yellow-500 text-4xl absolute top-[-20px] right-0"
        />
      )}
      <div className="pt-3 flex flex-col gap-1">
        <div>{homework.title}</div>
        <div className="text-sm">{homework.description}</div>
        <span id={rewardId} className="block mx-auto" />
      </div>
      <div className={`pt-3 flex flex-col items-center gap-2 `}>
        <button
          type="button"
          className={`rounded-full w-32 h-32 flex justify-center items-center text-white text-xl font-bold ${
            homework.submitted
              ? "bg-gradient-to-r from-green-400 to-blue-500"
              : "bg-gradient-to-r from-pink-500 to-purple-500"
          }`}
          onClick={handleSubmit}
        >
          <div>{homework.submitted ? "できたね🎉" : "がんばれ💪"}</div>
        </button>
      </div>
    </div>
  );
};
