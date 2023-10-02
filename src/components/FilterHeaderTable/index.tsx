import { ActionIcon, Checkbox, Menu, Stack, Text, rem } from "@mantine/core";
import { IconArrowsSort, IconSortDescending } from "@tabler/icons-react";

type Props = {};

function FilterHeaderTable({}: Props) {
  return (
    <div className="flex justify-between">
      Vị trí
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
            defaultValue={["react"]}
            label={
              <Text size="sm" c={"blue"} fw={500}>
                Lọc vị trí
              </Text>
            }
            p={"xs"}
          >
            <Stack mt="sm">
              <Checkbox value="react" label="React" />
              <Checkbox value="svelte" label="Svelte" />
              <Checkbox value="ng" label="Angular" />
              <Checkbox value="vue" label="Vue" />
            </Stack>
          </Checkbox.Group>
        </Menu.Dropdown>
      </Menu>
      {/* <ActionIcon size={"sm"} variant="light">
        <IconArrowsSort
          style={{
            width: "80%",
            height: "80%",
          }}
          stroke={1.5}
        />
      </ActionIcon> */}
    </div>
  );
}

export default FilterHeaderTable;
