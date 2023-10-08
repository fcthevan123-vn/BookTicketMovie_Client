import {
  Button,
  Grid,
  Image,
  Paper,
  Rating,
  SimpleGrid,
  Stack,
  Table,
  Text,
  rem,
} from "@mantine/core";
import { DataTableMoviesProps } from "../../../components/Provider/MovieProvider/MovieProvider";
import { Carousel } from "@mantine/carousel";
import classes from "./TopSection.module.css";
import Autoplay from "embla-carousel-autoplay";

import moment from "moment";
import { useRef } from "react";

type Props = {
  dataMovie: DataTableMoviesProps;
};

const PRIMARY_COL_HEIGHT = rem(500);

function TopSecton({ dataMovie }: Props) {
  const autoplay = useRef(Autoplay({ delay: 2000 }));

  return (
    <div className={classes.background}>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        {/* Carousel */}
        <Carousel
          withIndicators
          height={PRIMARY_COL_HEIGHT}
          loop
          plugins={[autoplay.current]}
          classNames={{
            root: classes.carousel,
            controls: classes.carouselControls,
            indicator: classes.carouselIndicator,
          }}
        >
          {dataMovie.images.map((img, index) => (
            <Carousel.Slide key={index}>
              <Image
                src={img.imageUrl}
                h={"100%"}
                fit="fill"
                radius={"md"}
              ></Image>
            </Carousel.Slide>
          ))}
        </Carousel>

        <Grid gutter="md">
          <Grid.Col>
            <Paper shadow="xs" radius="md" withBorder p="sm" h={498}>
              <div className="flex flex-col justify-around h-full">
                <div>
                  <Stack gap={0} px={"xs"}>
                    <Text tt="uppercase" c="dimmed" fw={700} size="sm">
                      {dataMovie.genre.join(" - ")}
                    </Text>
                    <Text tt="uppercase" className={classes.title} my="xs">
                      {dataMovie.title}
                    </Text>
                  </Stack>

                  <Text size="sm" px={"xs"} mb={"xs"}>
                    {dataMovie.description}
                  </Text>

                  <div className="flex">
                    <Rating value={4} readOnly px={"xs"} mb={"xs"} />
                    <Text size="sm" c="dimmed">
                      •
                    </Text>
                    <Text size="sm" c="dimmed" ml={"xs"}>
                      257 đánh giá
                    </Text>
                  </div>

                  <Table withRowBorders={false}>
                    <Table.Tbody>
                      <Table.Tr>
                        <Table.Td w={100}>
                          <Text size="sm" c={"dimmed"}>
                            Đạo diễn:
                          </Text>
                        </Table.Td>
                        <Table.Td>
                          {" "}
                          <Text size="sm" tt={"capitalize"}>
                            {dataMovie.directors.join(" - ")}
                          </Text>
                        </Table.Td>

                        <Table.Td w={100}>
                          <Text size="sm" c={"dimmed"}>
                            Diễn viên:
                          </Text>
                        </Table.Td>
                        <Table.Td>
                          {" "}
                          <Text size="sm" tt={"capitalize"}>
                            {dataMovie.actors.join(" - ")}
                          </Text>
                        </Table.Td>
                      </Table.Tr>

                      <Table.Tr>
                        <Table.Td w={100}>
                          <Text size="sm" c={"dimmed"}>
                            Quốc gia:
                          </Text>
                        </Table.Td>
                        <Table.Td>
                          {" "}
                          <Text size="sm" tt={"capitalize"}>
                            {dataMovie.country}
                          </Text>
                        </Table.Td>

                        <Table.Td w={100}>
                          <Text size="sm" c={"dimmed"}>
                            Ngôn ngữ:
                          </Text>
                        </Table.Td>
                        <Table.Td>
                          {" "}
                          <Text size="sm" tt={"capitalize"}>
                            {dataMovie.language}
                          </Text>
                        </Table.Td>
                      </Table.Tr>

                      <Table.Tr>
                        <Table.Td w={100}>
                          <Text size="sm" c={"dimmed"}>
                            Thời lượng:
                          </Text>
                        </Table.Td>
                        <Table.Td>
                          {" "}
                          <Text size="sm" tt={"capitalize"}>
                            {dataMovie.duration} phút
                          </Text>
                        </Table.Td>

                        <Table.Td w={100}>
                          <Text size="sm" c={"dimmed"}>
                            Phụ đề:
                          </Text>
                        </Table.Td>
                        <Table.Td>
                          {" "}
                          <Text size="sm" tt={"capitalize"}>
                            Tiếng {dataMovie.subtitle}
                          </Text>
                        </Table.Td>
                      </Table.Tr>

                      <Table.Tr>
                        <Table.Td w={140}>
                          <Text size="sm" c={"dimmed"}>
                            Ngày chiếu phim:
                          </Text>
                        </Table.Td>
                        <Table.Td>
                          {" "}
                          <Text size="sm" tt={"capitalize"}>
                            {moment(dataMovie.releaseDate).format(
                              "DD - MM - YYYY"
                            )}
                          </Text>
                        </Table.Td>

                        <Table.Td w={140}>
                          <Text size="sm" c={"dimmed"}>
                            Ngày kết thúc:
                          </Text>
                        </Table.Td>
                        <Table.Td>
                          {" "}
                          <Text size="sm" tt={"capitalize"}>
                            {moment(dataMovie.endDate).format("DD - MM - YYYY")}
                          </Text>
                        </Table.Td>
                      </Table.Tr>

                      <Table.Tr>
                        <Table.Td w={100}>
                          <Text size="sm" c={"dimmed"}>
                            Độ tuổi:
                          </Text>
                        </Table.Td>
                        <Table.Td>
                          {" "}
                          <Text size="sm" tt={"capitalize"}>
                            {dataMovie.ageRequire} tuổi
                          </Text>
                        </Table.Td>
                      </Table.Tr>
                    </Table.Tbody>
                  </Table>
                </div>

                <div className="flex">
                  <Button
                    variant="gradient"
                    radius={"md"}
                    w={150}
                    ml="xs"
                    gradient={{ from: "teal", to: "orange", deg: 270 }}
                  >
                    Đặt vé
                  </Button>

                  <Button
                    variant="gradient"
                    radius={"md"}
                    w={150}
                    ml="xs"
                    gradient={{ from: "teal", to: "orange", deg: 270 }}
                  >
                    Viết đánh giá
                  </Button>
                </div>
              </div>
            </Paper>
          </Grid.Col>
        </Grid>
      </SimpleGrid>
    </div>
  );
}

export default TopSecton;
