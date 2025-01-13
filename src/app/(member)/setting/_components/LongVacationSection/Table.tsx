import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { LongVacation } from "@prisma/client";
import { Button } from "@/app/_components/Button";
import dayjs from "dayjs";
import { updateIsAcive } from "../../_utils/updateIsActive";
import { useLongVacation } from "@/app/(member)/longVacation/_hooks/useLongVacation";
interface Props {
  data: LongVacation[];
  setSelected: (longVacation: LongVacation) => void;
  openEditModal: (oepnModal: boolean) => void;
}

export const Table: React.FC<Props> = ({
  data,
  openEditModal,
  setSelected,
}) => {
  const { mutate } = useLongVacation();
  const columnHelper = createColumnHelper<LongVacation>();
  const columns = [
    columnHelper.accessor("isActive", {
      header: "アクティブ",
      cell: info => {
        const isActive = info.getValue();
        return (
          <Button
            variant={isActive ? "bg-gray" : "bg-beige"}
            type="button"
            onClick={e => {
              e.stopPropagation();
              updateIsAcive({
                childId: info.row.original.childId,
                id: info.row.original.id,
                activeStatus: isActive,
                mutate,
              });
            }}
          >
            {isActive ? "有効" : "無効"}
          </Button>
        );
      },
    }),
    columnHelper.accessor("title", {
      header: "休暇名",
      cell: info => info.getValue(),
    }),
    columnHelper.accessor("startDate", {
      header: "開始日",
      cell: info => dayjs(info.getValue()).format("YYYY-MM-DD"),
    }),
    columnHelper.accessor("endDate", {
      header: "終了日",
      cell: info => dayjs(info.getValue()).format("YYYY-MM-DD"),
    }),
    columnHelper.accessor("schoolDay", {
      header: "登校日",
      cell: info =>
        info.getValue() ? dayjs(info.getValue()).format("YYYY-MM-DD") : "-",
    }),
  ];
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <table>
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id} className="bg-accentBeige">
            {headerGroup.headers.map(header => {
              const headerContent = flexRender(
                header.column.columnDef.header,
                header.getContext()
              );
              return (
                <th
                  key={header.id}
                  className={`p-2 text-left font-normal text-xs `}
                >
                  {headerContent}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr
            key={row.id}
            className="border-b-[1px] border-gray_bg cursor-pointer"
            onClick={() => {
              openEditModal(true);
              setSelected(row.original);
            }}
          >
            {row.getVisibleCells().map(cell => {
              const columnContent = flexRender(
                cell.column.columnDef.cell,
                cell.getContext()
              );
              return (
                <td key={cell.id} className={`p-1 font-normal text-xs`}>
                  {columnContent}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
