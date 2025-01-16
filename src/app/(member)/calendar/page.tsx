"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import jaLocale from "@fullcalendar/core/locales/ja";
import listPlugin from "@fullcalendar/list";
import { CalendarSkeleton } from "./_components/CalendarSkeleton";
import { useCalendar } from "./_hooks/useCalendar";
export default function Calendar() {
  const { data, error } = useCalendar();
  if (error) return <div>データの取得に失敗しました</div>;

  return (
    <div className="py-[70px] px-2 flex flex-col gap-7 max-w-[480px] mx-auto">
      <h1 className="text-lg">カレンダー</h1>

      {data ? (
        <div className="">
          <FullCalendar
            locale={jaLocale}
            plugins={[dayGridPlugin, listPlugin]}
            headerToolbar={{
              left: "prev",
              center: "title",
              right: "next dayGridMonth dayGridWeek list",
            }}
            height="auto"
            initialView="dayGridWeek"
            buttonText={{
              list: "li",
            }}
            events={data.events}
          />
        </div>
      ) : (
        <CalendarSkeleton />
      )}
    </div>
  );
}
