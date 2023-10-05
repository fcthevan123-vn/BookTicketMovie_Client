import { Box, LoadingOverlay, Table, Text } from "@mantine/core";

import FilterHeaderTable from "../FilterHeaderTable";
import {
  TableFilterProps,
  useTableCustom,
} from "../Provider/TableFilterProvider";

// import type {  } from "@mantine/core";

type headerProps = {
  label: string;
  value: React.ReactNode | string;
  isSortable: boolean;
  dataFilter?: {
    value: string;
    label: string;
  }[];
  dataFilterLabel?: string;
};

type Props = {
  headers: headerProps[] | unknown[];
};

type RowType = {
  fullName: React.ReactNode;
  type: React.ReactNode;
  email: React.ReactNode;
  phone: React.ReactNode;
  sex: React.ReactNode;
  address: React.ReactNode;
  id?: React.ReactNode;
  age: React.ReactNode;
};

function TableFilter({ headers }: Props) {
  const { rows, isLoading } = useTableCustom() as TableFilterProps<RowType>;

  const rowsRender = rows ? (
    rows.map((row, index) => (
      <Table.Tr key={index}>
        <Table.Td>{row.fullName}</Table.Td>
        <Table.Td>{row.type}</Table.Td>
        <Table.Td>{row.email}</Table.Td>
        <Table.Td>{row.phone}</Table.Td>
        <Table.Td>{row.age}</Table.Td>
        <Table.Td>{row.sex}</Table.Td>
        <Table.Td>{row.address}</Table.Td>
        <Table.Td>{row.actions}</Table.Td>
      </Table.Tr>
    ))
  ) : (
    <Table.Td>Loi</Table.Td>
  );

  const headersRender =
    headers &&
    headers.map((header, index) => (
      <Table.Th key={index}>
        {header.isSortable ? (
          <FilterHeaderTable
            labelDropdown={header.dataFilterLabel}
            label={header.label}
            dataOptions={header.dataFilter ? header.dataFilter : ""}
            fieldFilter={header.value}
          ></FilterHeaderTable>
        ) : (
          header.label
        )}
      </Table.Th>
    ));

  return (
    <div>
      <div className="border border-gray-300 rounded-lg overflow-hidden shadow-sm">
        <Box pos="relative">
          <LoadingOverlay
            visible={isLoading}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
          />
          <Table.ScrollContainer minWidth={800}>
            <Table
              // striped="even"
              striped
              // stripedColor="rgba(191, 236, 255, 0.3)"
              withColumnBorders
              verticalSpacing="sm"
            >
              <Table.Thead>
                <Table.Tr>{headersRender}</Table.Tr>
              </Table.Thead>

              <Table.Tbody>
                {Array.isArray(rowsRender) && rowsRender.length
                  ? rowsRender
                  : null}
              </Table.Tbody>
            </Table>
          </Table.ScrollContainer>
          {Array.isArray(rowsRender) && rowsRender.length ? null : (
            <Text fs="italic" ta="center" c="dimmed">
              Không tìm thấy dữ liệu khớp với yêu cầu
            </Text>
          )}
        </Box>
      </div>
    </div>
  );
}

export default TableFilter;
