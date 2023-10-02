import {
  useMantineTheme,
  TextInput,
  rem,
  ActionIcon,
  TextInputProps,
  Select,
} from "@mantine/core";
import { IconArrowRight, IconSearch } from "@tabler/icons-react";

// type Props = {};

function SearchBar(props: TextInputProps) {
  const theme = useMantineTheme();

  return (
    <div className="my-5 flex justify-between items-center">
      <TextInput
        radius="md"
        size="sm"
        description="Enter hoặc nhấn để tìm kiếm"
        placeholder="Tìm kiếm"
        rightSectionWidth={35}
        leftSection={
          <IconSearch
            style={{ width: rem(18), height: rem(18) }}
            stroke={1.5}
          />
        }
        w={"30vw"}
        rightSection={
          <ActionIcon
            size={28}
            radius="md"
            color={theme.primaryColor}
            variant="filled"
          >
            <IconArrowRight
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
        }
        {...props}
      />

      {/* <div className="flex gap-4">
        <Select
          description="Bộ lọc"
          radius="md"
          checkIconPosition="right"
          styles={{
            dropdown: {
              boxShadow: "var(--mantine-shadow-md)",
              borderRadius: "var(--mantine-radius-md)",
            },
          }}
          placeholder="Bộ lọc"
          data={["Tên", "Giá", "Địa chỉ", "Giới tính"]}
        />

        <Select
          description="Hiển thị theo"
          radius="md"
          checkIconPosition="right"
          color="blue"
          styles={{
            dropdown: {
              boxShadow: "var(--mantine-shadow-md)",
              borderRadius: "var(--mantine-radius-md)",
            },
          }}
          placeholder="Hiển thị theo"
          data={["Tăng dần", "Giảm dần", "Mặc định"]}
        />
      </div> */}
    </div>
  );
}

export default SearchBar;
