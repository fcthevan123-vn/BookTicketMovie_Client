import { Badge, Divider, Modal, Paper, Select, Text, rem } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import {
  IconArmchair,
  IconCalendar,
  IconChalkboard,
  IconLocation,
} from "@tabler/icons-react";
import ShowItem from "../../ShowItem";

type Props = {
  close: () => void;
  opened: boolean;
};

function ModalPickShow({ opened, close }: Props) {
  const titleCustom = (
    <div className="w-full flex justify-between px-20">
      <div className="flex gap-6">
        <DatePickerInput
          leftSection={
            <IconCalendar
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          }
          defaultValue={new Date()}
          valueFormat="DD - MM - YYYY"
          minDate={new Date()}
          defaultDate={new Date(2022, 1)}
          placeholder="Chọn ngày muốn xem"
          label="Ngày"
          radius="md"
          styles={{
            label: {
              color: "white",
            },
          }}
        />

        <Select
          leftSection={
            <IconLocation
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          }
          searchable
          allowDeselect={false}
          checkIconPosition="right"
          label="Thành phố"
          radius="md"
          placeholder="Chọn thành phố của bạn"
          data={["React", "Angular", "Vue", "Svelte"]}
          styles={{
            label: {
              color: "white",
            },
          }}
        />
      </div>
      <Select
        leftSection={
          <IconChalkboard
            style={{ width: rem(18), height: rem(18) }}
            stroke={1.5}
          />
        }
        searchable
        allowDeselect={false}
        checkIconPosition="right"
        defaultValue={"1"}
        label="Kiểu phòng"
        radius="md"
        placeholder="Chọn số ghế"
        data={["1", "2", "3", "4"]}
        styles={{
          label: {
            color: "white",
          },
        }}
      />
    </div>
  );

  return (
    <div>
      <Modal
        opened={opened}
        onClose={close}
        title={titleCustom}
        fullScreen
        padding={"lg"}
        radius={0}
        styles={{
          header: {
            background: "var(--mantine-color-blue-5)",
          },
          body: {
            marginTop: "15px",
          },
          title: {
            width: "100%",
          },
          content: {
            background: "var(--mantine-color-gray-1)",
          },
        }}
        // transitionProps={{ transition: "fade", duration: 200 }}
      >
        <Paper withBorder shadow="sm" radius="lg    " p="lg">
          <div>
            <div className="flex items-center gap-5 justify-between">
              <Text fw={700} size="lg" c={"blue"}>
                SPIDER MAN - 120 PHÚT
              </Text>
              <div className="flex gap-2">
                <Badge color="blue" size="md" variant="dot" radius="md">
                  HÀNH ĐỘNG
                </Badge>
                <Badge color="blue" size="md" variant="dot" radius="md">
                  HÀI KỊCH
                </Badge>
                <Badge color="blue" size="md" variant="dot" radius="md">
                  KỊCH TÍNH
                </Badge>
              </div>
            </div>
          </div>
        </Paper>

        <div className="mt-4 flex flex-col gap-4">
          <ShowItem></ShowItem>

          <ShowItem></ShowItem>

          <ShowItem></ShowItem>
        </div>
      </Modal>
    </div>
  );
}

export default ModalPickShow;
