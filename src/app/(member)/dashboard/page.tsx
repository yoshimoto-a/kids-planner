"use client";
import { User } from "../_components/User";
import { useDashboard } from "./_hooks/useDashboard";
import dayjs from "dayjs";
import { ProgressBar } from "./_components/ProgressBar";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export default function Dashboard() {
  const { data, error } = useDashboard();

  if (error) return <div className="text-center pt-20">データ取得に失敗</div>;

  return (
    <div className="max-w-[480px] mx-auto pt-[72px] pb-[70px] px-2">
      <User />
      <div className="flex flex-col gap-6 pt-2">
        {data ? (
          data.data.map(item => (
            <div
              key={item.child.id}
              className="p-4 border rounded-lg bg-white shadow"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold mb-2">{item.child.name}</h2>
                <ProgressBar progressPercent={item.progress} />
              </div>

              {item.longVacation?.endDate && (
                <div>
                  <div className="text-sm mb-1">
                    休暇明けまで残り
                    <span className="text-lg font-bold text-accentBeige pl-2">
                      {dayjs(item.longVacation.endDate).diff(dayjs(), "day")}日
                    </span>
                  </div>
                  <div className="text-sm mb-2">
                    宿題残り
                    <span className="text-lg font-bold text-accentBeige px-2">
                      {
                        item.homeworks.filter(homework => !homework.submitted)
                          .length
                      }
                    </span>
                    個
                  </div>
                  <div className="space-y-1">
                    {item.homeworks.map(homework => (
                      <div
                        key={homework.id}
                        className="flex items-center gap-2 text-sm"
                      >
                        <span>{homework.submitted ? "✅" : "⬜"}</span>
                        <span>{homework.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center flex flex-col gap-6">
            <SkeletonTheme width="98%" height={250} borderRadius={8}>
              <Skeleton />
              <Skeleton />
            </SkeletonTheme>
          </div>
        )}
      </div>
    </div>
  );
}
