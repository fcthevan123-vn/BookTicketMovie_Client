import React, { createContext, useContext, useEffect, useState } from "react";
import SearchBar from "../../SearchBar";
import { Pagination, Select, Text } from "@mantine/core";

export type TableFilterProps<T> = {
  dataGloBal: T[];
  setDataGlobal: (data: T[]) => void;
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
  const [dataGloBal, setDataGlobal] = useState<unknown[]>(initialData);
  const [currentStateFilter, setCurrentStateFilter] =
    useState<currentStateFilterI[]>();
  const [currentSearchValue, setCurrentSearchValue] = useState("");

  function searchObjects(array, keyword: string) {
    const results: unknown[] = [];

    array.forEach((obj) => {
      // Lặp qua tất cả các thuộc tính của đối tượng
      for (const key in obj) {
        // eslint-disable-next-line no-prototype-builtins
        if (obj.hasOwnProperty(key)) {
          // Kiểm tra xem giá trị của thuộc tính có chứa từ khóa hay không
          const value = obj[key].toString().toLowerCase();
          if (value.includes(keyword.toLowerCase())) {
            // Nếu chứa từ khóa, thêm đối tượng vào kết quả và dừng vòng lặp
            results.push(obj);
            break;
          }
        }
      }
    });

    return results;
  }

  useEffect(() => {
    const searchResults = searchObjects(dataGloBal, currentSearchValue);
    setDataGlobal(searchResults);
  }, [currentSearchValue]);

  return (
    <TableFilterConText.Provider
      value={{
        dataGloBal,
        rows,
        setRows: setRows as React.Dispatch<React.SetStateAction<unknown[]>>,
        headers,
        setHeaders: setHeaders as React.Dispatch<
          React.SetStateAction<unknown[]>
        >,
        currentStateFilter,
        setCurrentStateFilter,
        setDataGlobal,
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
      {/* {console.log("currentSearchValue", currentSearchValue)}
      {console.log("data", dataGloBal)} */}

      <div>
        {/* <SearchBar></SearchBar> */}

        <div>{children}</div>
        <div className="flex justify-between items-center w-full mt-3 gap-28">
          <div>
            <Text mb={"4px"} size="xs">
              Trang hiện tại
            </Text>
            <Pagination
              size={"xs"}
              disabled={isLoading}
              onChange={(e) => setActivePage(e)}
              radius="sm"
              value={activePage}
              withEdges
              total={totalPagination}
            />
          </div>
          <div className="flex-none">
            <Text mb={"4px"} size="xs">
              Số dòng
            </Text>
            <Select
              size="xs"
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
