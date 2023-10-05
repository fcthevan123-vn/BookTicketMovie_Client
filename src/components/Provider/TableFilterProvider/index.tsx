import React, { createContext, useContext, useState } from "react";
import SearchBar from "../../SearchBar";
import { Pagination, Select, Text } from "@mantine/core";

export type TableFilterProps<T> = {
  data: T[];
  setData: (data: T[]) => void;
  limitRow: number;
  rows: T[];
  headers: T[];
  setRows: React.Dispatch<React.SetStateAction<T[]>>;
  setHeaders: React.Dispatch<React.SetStateAction<T[]>>;
  setLimitRow: (limitRow: number) => void;
  totalPagination: number;
  setTotalPagination: (totalPagination: number) => void;
  setIsLoading: (isLoading: boolean) => void;
  isLoading: boolean;
  activePage: number;
  setActivePage: (activePage: number) => void;
  currentStateFilter: currentStateFilterI[] | undefined;
  setCurrentStateFilter: (
    currentStateFilter: {
      value: string;
      key: string[];
    }[]
  ) => void;
  currentSearchValue: string;
  setCurrentSearchValue: (value: string) => void;
};

export type currentStateFilterI = {
  value: string;
  key: string[];
};

const TableFilterConText = createContext<TableFilterProps<unknown> | undefined>(
  undefined
);

export function TableFilterProvider<T>({
  children,
  initialData,
}: {
  children: React.ReactNode;
  initialData: T[];
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [totalPagination, setTotalPagination] = useState(1);
  const [limitRow, setLimitRow] = useState(5);
  const [rows, setRows] = useState<T[]>(initialData);
  const [headers, setHeaders] = useState(initialData);
  const [data, setData] = useState<unknown[]>(initialData);
  const [currentStateFilter, setCurrentStateFilter] =
    useState<currentStateFilterI[]>();
  const [currentSearchValue, setCurrentSearchValue] = useState("");

  return (
    <TableFilterConText.Provider
      value={{
        data,
        rows,
        setRows: setRows as React.Dispatch<React.SetStateAction<unknown[]>>,
        headers,
        setHeaders: setHeaders as React.Dispatch<
          React.SetStateAction<unknown[]>
        >,
        currentStateFilter,
        setCurrentStateFilter,
        setData,
        isLoading,
        setIsLoading,
        activePage,
        setActivePage,
        totalPagination,
        setTotalPagination,
        limitRow,
        setLimitRow,
        currentSearchValue,
        setCurrentSearchValue,
      }}
    >
      <div>
        <SearchBar></SearchBar>

        <div>{children}</div>
        <div className="flex justify-between items-center w-full mt-3 gap-28">
          <div>
            <Text mb={"4px"} size="sm">
              Trang hiện tại
            </Text>
            <Pagination
              disabled={isLoading}
              onChange={(e) => setActivePage(e)}
              radius="md"
              value={activePage}
              withEdges
              total={totalPagination}
            />
          </div>
          <div className="flex-none">
            <Text mb={"4px"} size="sm">
              Số dòng
            </Text>
            <Select
              disabled={isLoading}
              checkIconPosition="right"
              data={["5", "10", "20", "30", "50"]}
              value={limitRow as unknown as string}
              allowDeselect={false}
              onChange={(e) => setLimitRow(parseInt(e as string))}
              radius={"md"}
              // onChange={(e) => setLimitRow(e as unknown as number)}
            />
          </div>
        </div>
      </div>
    </TableFilterConText.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTableCustom() {
  const context = useContext(TableFilterConText);

  if (!context) {
    throw new Error("useMovie must be used within a MovieProvider");
  }

  return context;
}
