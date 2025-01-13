import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Homework } from "@prisma/client";
import { Button } from "@/app/_components/Button";
import { updateSubmitted } from "../../dashboard/_utils/updateSubmitted";
import dayjs from "dayjs";
import { KeyedMutator } from "swr";
import { IndexResponse } from "@/app/_types/homework/IndexResponse";

interface Props {
  data: Homework[];
  openEditModal: (homework: Homework) => void;
  mutate: KeyedMutator<IndexResponse | undefined>;
}

export const HomeworkTable: React.FC<Props> = ({
  data,
  openEditModal,
  mutate,
}) => {
  const columnHelper = createColumnHelper<Homework>();
  const columns = [
    columnHelper.accessor("submitted", {
      header: "進捗",
      cell: info => {
        const submitted = info.getValue();
        return (
          <Button
            variant={submitted ? "bg-gray" : "bg-beige"}
            type="button"
            onClick={e => {
              e.stopPropagation();
              updateSubmitted({
                id: info.row.original.id,
                submittedStatus: submitted,
                mutate,
              });
            }}
          >
            {submitted ? "済" : "未"}
          </Button>
        );
      },
    }),
    columnHelper.accessor("title", {
      header: "宿題",
      cell: info => info.getValue(),
    }),
    columnHelper.accessor("dueDate", {
      header: "提出日",
      cell: info => dayjs(info.getValue()).format("YYYY-MM-DD"),
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
                  className={`p-2 text-left font-normal text-xs ${
                    headerContent === "宿題" ? "w-3/5" : "w-auto"
                  }`}
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
              openEditModal(row.original);
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
