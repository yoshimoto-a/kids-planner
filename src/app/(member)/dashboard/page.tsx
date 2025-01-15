"use client";
import { User } from "./_components/User";
import { useDashboard } from "./_hooks/useDashboard";
import { useState, useEffect } from "react";
import { SingleChildSelect } from "../_components/SingleChildSelect";
import dayjs from "dayjs";
export default function Dashboard() {
  const { data, error } = useDashboard();
  const [childId, setChildId] = useState("");
  useEffect(() => {
    if (!data) return;
    setChildId(data.data[0].child.id);
  }, [data]);
  if (!data) return <div className="text-center pt-20">読込み中...</div>;
  if (error) return <div className="text-center pt-20">データ取得に失敗</div>;

  const formatData = data.data.filter(item => item.child.id === childId);
  return (
    <div className="max-w-[480px] mx-auto pt-[72px] pb-[60px] px-2">
      <User />
      <SingleChildSelect childId={childId} setChildId={setChildId} />
      {formatData.map(item => (
        <div key={item.child.id}>
          {item.longVacation?.endDate && (
            <div className="flex flex-col gap-5">
              <div>
                休暇明けまで残り
                <span className="text-2xl">
                  {dayjs(item.longVacation.endDate).diff(dayjs(), "day")}日
                </span>
              </div>
              <div>
                宿題残り
                <span className="text-2xl">
                  {
                    item.homeworks.filter(item => item.submitted === false)
                      .length
                  }
                </span>
                個
              </div>
              <div>
                {item.homeworks.map(item => (
                  <div key={item.id}>
                    <span>{item.submitted ? "✅" : "　 "}</span>
                    {item.title}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
