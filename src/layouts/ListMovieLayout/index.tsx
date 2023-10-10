import { useDisclosure } from "@mantine/hooks";
import {
  Accordion,
  ActionIcon,
  AppShell,
  Box,
  Select,
  Text,
  TextInput,
  TextInputProps,
  rem,
} from "@mantine/core";

import DefaultHeader from "../../components/Headers/DefaultHeader";
import { FooterComponent } from "../../components/FooterComponent";
import {
  IconAdjustments,
  IconSearch,
  IconArrowRight,
  IconCalendarEvent,
  IconLanguage,
  IconList,
} from "@tabler/icons-react";
type ListMovieLayoutProps = {
  children: React.ReactNode;
  props: TextInputProps;
};

const groceries = [
  {
    icon: <IconList size={"20px"}></IconList>,
    value: "Thể loại",
    description:
      "Crisp and refreshing fruit. Apples are known for their versatility and nutritional benefits. They come in a variety of flavors and are great for snacking, baking, or adding to salads.",
  },
  {
    icon: <IconLanguage size={"20px"}></IconLanguage>,
    value: "Ngôn ngữ/ Quốc gia",
    description:
      "Naturally sweet and potassium-rich fruit. Bananas are a popular choice for their energy-boosting properties and can be enjoyed as a quick snack, added to smoothies, or used in baking.",
  },
  {
    icon: <IconCalendarEvent size={"20px"}></IconCalendarEvent>,
    value: "Độ tuổi yêu cầu",
    description:
      "Nutrient-packed green vegetable. Broccoli is packed with vitamins, minerals, and fiber. It has a distinct flavor and can be enjoyed steamed, roasted, or added to stir-fries.",
  },
];

function ListMovieLayout({ children, props }: ListMovieLayoutProps) {
  const [opened, { toggle }] = useDisclosure();

  const items = groceries.map((item) => (
    <Accordion.Item key={item.value} value={item.value}>
      <Accordion.Control icon={item.icon}>
        <Text size="sm">{item.value}</Text>
      </Accordion.Control>
      <Accordion.Panel>{item.description}</Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <AppShell
      header={{ height: 120 }}
      navbar={{
        width: 350,
        breakpoint: "sm",
        collapsed: { desktop: true, mobile: !opened },
      }}
      padding="md"
      transitionDuration={0}
    >
      <AppShell.Header zIndex={100000}>
        <DefaultHeader></DefaultHeader>
        <div className="flex items-center w-full gap-3 justify-between px-4 border border-b bg-white py-2">
          <ActionIcon
            variant="light"
            size="xl"
            radius="lg"
            aria-label="Settings"
          >
            <IconAdjustments
              style={{ width: "70%", height: "70%" }}
              stroke={1.5}
            />
          </ActionIcon>

          <TextInput
            className="grow"
            radius="lg"
            size="md"
            placeholder="Search questions"
            rightSectionWidth={42}
            leftSection={
              <IconSearch
                style={{ width: rem(18), height: rem(18) }}
                stroke={1.5}
              />
            }
            rightSection={
              <ActionIcon size={32} radius="xl" color={"blue"} variant="filled">
                <IconArrowRight
                  style={{ width: rem(18), height: rem(18) }}
                  stroke={1.5}
                />
              </ActionIcon>
            }
            {...props}
          />

          <Select
            radius={"lg"}
            size="md"
            placeholder="Bộ lọc"
            data={["Phim 1", "Phim 2", "Phim 3", "Phim 4"]}
          />
        </div>
      </AppShell.Header>

      <AppShell.Navbar p="md" ml={350}>
        <Accordion variant="separated" radius="md" multiple={true} mt={"60px"}>
          {items}
        </Accordion>
      </AppShell.Navbar>

      <AppShell.Main>
        <div>{children}</div>
      </AppShell.Main>

      {/* <div
        style={{
          position: "absolute",
          width: "100%",
          zIndex: 1000000000,
        }}
      >
        <FooterComponent></FooterComponent>
      </div> */}
    </AppShell>
  );
}

export default ListMovieLayout;
