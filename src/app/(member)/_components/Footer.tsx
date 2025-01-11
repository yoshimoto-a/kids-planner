import {
  faBook,
  faTableCells,
  faCalendarDays,
  faGear,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";
import { FooterItem } from "./FooterItem";

export const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 z-10 h-[60px] w-screen bg-accentBeige p-2 shadow-sm text-black ">
      <div className="max-w-[480px] mx-auto flex justify-between px-2">
        <FooterItem iconName={faGear} title="印刷" url="/print" />
        <FooterItem
          iconName={faCalendarDays}
          title="カレンダー"
          url="/calendar"
        />
        <FooterItem iconName={faTableCells} title="ホーム" url="/dashboard" />
        <FooterItem iconName={faBook} title="宿題一覧" url="/homework" />
        <FooterItem iconName={faPrint} title="設定" url="/setting" />
      </div>
    </footer>
  );
};
