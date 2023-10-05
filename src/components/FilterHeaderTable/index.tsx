import { ActionIcon, Checkbox, Menu, Stack, Text } from "@mantine/core";
import { IconArrowsSort, IconSortDescending } from "@tabler/icons-react";
import { useTableCustom } from "../Provider/TableFilterProvider";
import { useState, useEffect } from "react";

type Props = {
  label: string;
  labelDropdown: string;
  dataOptions?: {
    value: string;
    label: string;
  }[];
  fieldFilter: string;
};

function FilterHeaderTable({
  label,
  labelDropdown,
  dataOptions,
  fieldFilter,
}: Props) {
  const { currentStateFilter, setCurrentStateFilter } = useTableCustom();
  const [defaultValue, setDefaultValue] = useState<string[] | undefined>();

  useEffect(() => {
    if (
      dataOptions &&
      dataOptions?.length > 0 &&
      currentStateFilter &&
      currentStateFilter?.length > 0
    ) {
      const newState = currentStateFilter
        .filter((state) => state.value === fieldFilter)
        .map((state) => state.key)
        .flat(1);

      setDefaultValue(newState);
    }
  }, [currentStateFilter]);

  return (
    <div className="flex justify-between">
      {label}
      {/* {console.log("default value", defaultValue)}
      {console.log("currentStateFilter", currentStateFilter)} */}

      {dataOptions && dataOptions?.length > 0 ? (
        <Menu
          shadow="md"
          width={200}
          withArrow
          styles={{
            dropdown: {
              boxShadow: "var(--mantine-shadow-md)",
              borderRadius: "var(--mantine-radius-lg)",
              border: "1px solid var(--mantine-color-gray-3)",
            },
          }}
        >
          <Menu.Target>
            <ActionIcon size={"sm"} variant="light">
              <IconSortDescending
                style={{
                  width: "80%",
                  height: "80%",
                }}
                stroke={1.5}
              />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Checkbox.Group
              label={
                <Text size="sm" c={"blue"} fw={500}>
                  {labelDropdown}
                </Text>
              }
              value={defaultValue}
              p={"xs"}
              onChange={(e) =>
                setCurrentStateFilter([{ value: fieldFilter, key: e }])
              }
            >
              <Stack mt="sm">
                {dataOptions.map((option, index) => (
                  <Checkbox
                    key={index}
                    value={option.value}
                    label={option.label}
                  />
                ))}
              </Stack>
            </Checkbox.Group>
          </Menu.Dropdown>
        </Menu>
      ) : (
        <ActionIcon size={"sm"} variant="light">
          <IconArrowsSort
            style={{
              width: "80%",
              height: "80%",
            }}
            stroke={1.5}
          />
        </ActionIcon>
      )}
    </div>
  );
}

export default FilterHeaderTable;
