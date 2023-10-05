import {
  useMantineTheme,
  TextInput,
  rem,
  ActionIcon,
  TextInputProps,
} from "@mantine/core";
import { IconArrowRight, IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import { useTableCustom } from "../Provider/TableFilterProvider";
import { IconX } from "@tabler/icons-react";

// type Props = {};

function SearchBar(props: TextInputProps) {
  const theme = useMantineTheme();
  const [searchValue, setSearchValue] = useState("");

  const { setCurrentSearchValue, isLoading } = useTableCustom();

  return (
    <div className="my-5 flex justify-between items-center">
      <TextInput
        disabled={isLoading}
        radius="md"
        size="sm"
        value={searchValue}
        onChange={(e) => {
          if (e.target.value.length > 0) {
            setSearchValue(e.target.value);
          } else {
            setSearchValue(e.target.value);
            setCurrentSearchValue(e.target.value);
          }
        }}
        description="Enter hoặc nhấn nút để tìm kiếm"
        placeholder="Tìm kiếm"
        rightSectionWidth={65}
        leftSection={
          <IconSearch
            style={{ width: rem(18), height: rem(18) }}
            stroke={1.5}
          />
        }
        w={"30vw"}
        onKeyDownCapture={(event) => {
          if (event.nativeEvent.code === "Enter") {
            setCurrentSearchValue(searchValue);
          }
        }}
        rightSection={
          <div className="flex gap-1">
            <ActionIcon
              onClick={() => {
                setCurrentSearchValue("");
                setSearchValue("");
              }}
              size={28}
              radius="md"
              color="gray"
              variant="light"
            >
              <IconX style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
            </ActionIcon>
            <ActionIcon
              onClick={() => setCurrentSearchValue(searchValue)}
              size={28}
              radius="md"
              color={theme.primaryColor}
              variant="light"
            >
              <IconArrowRight
                style={{ width: rem(18), height: rem(18) }}
                stroke={1.5}
              />
            </ActionIcon>
          </div>
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
