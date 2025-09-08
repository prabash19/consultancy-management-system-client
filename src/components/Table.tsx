import type { ReactNode } from "react";

export type Column<T> = {
  key: keyof T | string;
  label: string;
  render?: (value: any, row: T) => ReactNode;
};

type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
};

function Table<T>({ columns, data }: TableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className="px-4 py-2 text-left border-b font-medium text-gray-700"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={idx}
              className="odd:bg-white even:bg-gray-200 hover:bg-gray-100"
            >
              {columns.map((col) => (
                <td key={String(col.key)} className="px-4 py-2 border-b">
                  {col.render
                    ? col.render(row[col.key as keyof T], row)
                    : (row[col.key as keyof T] as ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
