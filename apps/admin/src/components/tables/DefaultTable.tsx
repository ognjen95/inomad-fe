import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import { Text, TextVariant } from "ui-components";

export type DefaultTableProps<
  TRow extends Record<string, unknown> = Record<string, unknown>
> = {
  data: TRow[];
  columns: ColumnDef<TRow, unknown>[];
  onRowClick?: (url: string) => void;
  propertyOnRowClick?: keyof TRow;
  showHeader?: boolean;
};

const DefaultTable = <
  TRow extends Record<string, unknown> = Record<string, unknown>
>({
  data,
  columns,
  onRowClick,
  propertyOnRowClick = "id",
  showHeader = true,
}: DefaultTableProps<TRow>) => {
  const table = useReactTable<TRow>({
    data,
    columns,
    defaultColumn: {
      minSize: 0,
    },
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="table text-sm w-full border-separate border-spacing-x-0">
      {showHeader && (
        <thead className="sticky top-0 h-10 z-50 bg-gray-50">
          {table.getHeaderGroups().map((headerGroups) => (
            <tr key={headerGroups.id} className="pb-2">
              {headerGroups.headers.map((header) => (
                <th
                  key={header.id}
                  className="text-left font-bold pl-4 border-b border-primary-50"
                  style={{ width: `${header.getSize()}%` }}
                >
                  <Text
                    variant={TextVariant.OVERLINE}
                    customClasses="font-semibold"
                    light
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </Text>
                </th>
              ))}
            </tr>
          ))}
        </thead>
      )}
      <tbody>
        {table.getRowModel().rows.map((row) => {
          const handleRowClick = () => {
            if (
              onRowClick &&
              propertyOnRowClick &&
              typeof row.original === "object"
            ) {
              const propertyValue = row.original[propertyOnRowClick as string];

              if (propertyValue && typeof propertyValue === "string") {
                onRowClick(propertyValue);
              }
            }
          };
          return (
            <tr
              key={row.id}
              onClick={handleRowClick}
              className={clsx(
                "p-5 max-h-[40px] rounded-2xl transition-all ease-in-out duration-300 bg-transparent hover:bg-primary-50 row-span-5",
                {
                  "cursor-pointer": onRowClick,
                }
              )}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className=" px-4 py-1 overflow border-b border-primary-50"
                  style={{ width: `${cell.column.getSize()}%` }}
                >
                  <div>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DefaultTable;
