import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import { Text, TextVariant } from "ui-components";

export type SimpleTableProps<
  TRow extends Record<string, unknown> = Record<string, unknown>
> = {
  data: TRow[];
  /* eslint-disable @typescript-eslint/no-explicit-any */
  columns: ColumnDef<TRow, any>[];
  onRowClick?: (url: string) => void;
  propertyOnRowClick?: keyof TRow;
  showHeader?: boolean;
  isTransparent?: boolean;
};

const SimpleTable = <
  TRow extends Record<string, unknown> = Record<string, unknown>
>({
  data,
  columns,
  onRowClick,
  propertyOnRowClick,
  showHeader = true,
  isTransparent = true,
}: SimpleTableProps<TRow>) => {
  const table = useReactTable<TRow>({
    data,
    columns,
    defaultColumn: {
      minSize: 0,
    },
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table
      className={clsx(
        "table text-sm w-full border-separate border-spacing-x-0",
        { "border-spacing-y-3": !isTransparent }
      )}
    >
      {showHeader && (
        <thead
          className={clsx("sticky top-0 h-10", {
            "bg-gray-50": !isTransparent,
            "bg-transparent": isTransparent,
          })}
        >
          {table.getHeaderGroups().map((headerGroups) => (
            <tr key={headerGroups.id} className="pb-2">
              {headerGroups.headers.map((header) => (
                <th
                  key={header.id}
                  className="text-left font-bold pl-6"
                  style={{ width: `${header.getSize()}%` }}
                >
                  <Text
                    variant={TextVariant.OVERLINE}
                    customClasses="text-gray-500"
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
                {
                  "cursor-pointer": onRowClick,
                  "bg-white hover:bg-gray-100 shadow-sm shadow-primary-100":
                    !isTransparent,
                  "bg-transparent hover:bg-white row-span-5": isTransparent,
                },
                "p-5 max-h-[40px] hover:shadow-sm hover:shadow-primary-100 rounded-2xl transition-all ease-in-out duration-300"
              )}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-6 py-5 [&:first-child]:rounded-l-2xl [&:last-child]:rounded-r-2xl overflow"
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

export default SimpleTable;
