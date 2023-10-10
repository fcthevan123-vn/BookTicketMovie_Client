import { Accordion, Grid, SimpleGrid, Text } from "@mantine/core";
import { IconCalendarEvent, IconLanguage } from "@tabler/icons-react";
import { IconList } from "@tabler/icons-react";
import { DataTableMoviesProps } from "../../../components/Provider/MovieProvider/MovieProvider";
import MovieSmallPreview from "../../../components/MovieSmallPreview";
type Props = {
  dataMovies: DataTableMoviesProps[];
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

function ListMovie({ dataMovies }: Props) {
  const items = groceries.map((item) => (
    <Accordion.Item key={item.value} value={item.value}>
      <Accordion.Control icon={item.icon}>
        <Text size="sm">{item.value}</Text>
      </Accordion.Control>
      <Accordion.Panel>{item.description}</Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <div className="mt-8 relative">
      <Grid>
        <Grid.Col span="auto" className="">
          <Accordion variant="separated" radius="md" multiple={true}>
            {items}
          </Accordion>
        </Grid.Col>

        <Grid.Col span={9}>
          <SimpleGrid cols={4}>
            {dataMovies.map((movie, index) => (
              <MovieSmallPreview
                key={index}
                dataMovie={movie}
              ></MovieSmallPreview>
            ))}
          </SimpleGrid>
        </Grid.Col>
      </Grid>
    </div>
  );
}

export default ListMovie;
