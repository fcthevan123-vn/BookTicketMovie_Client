import { LoadingOverlay, Table, TableData } from "@mantine/core";

type Props = {
  data: TableData;
  minWidth: number;
  loading: boolean;
};

function TableDefault({ data, minWidth, loading }: Props) {
  return (
    <div className="border-2 relative border-gray-200 rounded-lg">
      <LoadingOverlay
        visible={loading}
        zIndex={5}
        overlayProps={{ radius: "sm", blur: 2 }}
      />

      <Table.ScrollContainer minWidth={minWidth}>
        <Table
          // stickyHeader
          // stickyHeaderOffset={60}
          captionSide="top"
          data={data}
          striped
          highlightOnHover
          withColumnBorders
        ></Table>
      </Table.ScrollContainer>
    </div>
  );
}

export default TableDefault;
