import React, { createContext, useState } from "react";
import SearchBar from "../../SearchBar";
import { Pagination, Select, Text } from "@mantine/core";

type TableFilterProps = {
  limitRow: number;
  setLimitRow: (limitRow: number) => void;
  totalPagination: number;
  setTotalPagination: (totalPagination: number) => void;
  setIsLoading: (isLoading: boolean) => void;
  isLoading: boolean;
  activePage: number;
  setActivePage: (activePage: number) => void;
};

const TableFilter = createContext<TableFilterProps | undefined>(undefined);

function TableFilterProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [totalPagination, setTotalPagination] = useState(1);
  const [limitRow, setLimitRow] = useState(10);

  return (
    <TableFilter.Provider
      value={{
        isLoading,
        setIsLoading,
        activePage,
        setActivePage,
        totalPagination,
        setTotalPagination,
        limitRow,
        setLimitRow,
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
            <Pagination radius="md" withEdges total={4} />
          </div>
          <div className="flex-none">
            <Text mb={"4px"} size="sm">
              Số dòng
            </Text>
            <Select
              data={["5", "10", "20", "30", "50"]}
              defaultValue="10"
              allowDeselect={false}
              radius={"md"}
              // onChange={(e) => setLimitRow(e as unknown as number)}
            />
          </div>
        </div>
      </div>
    </TableFilter.Provider>
  );
}

export default TableFilterProvider;
