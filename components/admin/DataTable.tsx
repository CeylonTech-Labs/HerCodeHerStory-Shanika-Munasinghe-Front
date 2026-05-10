"use client";

import { LoadingSpinner } from "../common/LoadingSpinner";

export type Column<T> = {
  header: string;
  cell: (row: T) => React.ReactNode;
  className?: string;
};

export function DataTable<T>({
  columns,
  data,
  empty = "No records found.",
  loading = false
}: {
  columns: Column<T>[];
  data: T[];
  empty?: string;
  loading?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-lg border bg-background">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-sm">
          <thead className="bg-muted/70 text-left">
            <tr>
              {columns.map((column) => (
                <th key={column.header} className={`px-4 py-3 font-bold ${column.className || ""}`}>{column.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td className="px-4 py-12 text-center" colSpan={columns.length}><LoadingSpinner className="mx-auto" /></td></tr>
            ) : data.length ? (
              data.map((row, index) => (
                <tr key={index} className="border-t">
                  {columns.map((column) => (
                    <td key={column.header} className={`px-4 py-3 align-top ${column.className || ""}`}>{column.cell(row)}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr><td className="px-4 py-12 text-center text-muted-foreground" colSpan={columns.length}>{empty}</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
