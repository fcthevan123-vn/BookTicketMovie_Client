import {
  Button,
  Grid,
  Image,
  Paper,
  Rating,
  Stack,
  Text,
  rem,
} from "@mantine/core";
import { DataTableMoviesProps } from "../../../components/Provider/MovieProvider/MovieProvider";
import { Carousel } from "@mantine/carousel";
import classes from "./TopSection.module.css";
import Autoplay from "embla-carousel-autoplay";

import { useEffect, useRef, useState } from "react";
import ModalPickShow from "../../../components/Modals/ModalPickShow";
import { useAuthenticate } from "../../../hooks";

type Props = {
  dataMovie: DataTableMoviesProps;
};

const PRIMARY_COL_HEIGHT = rem(500);

function TopSecton({ dataMovie }: Props) {
  const autoplay = useRef(Autoplay({ delay: 2000 }));
  const [isOpen, setIsOpen] = useState(false);
  const [isLogged, ,] = useAuthenticate();

  const urlParams = new URLSearchParams(window.location.search);

  const openModal = urlParams.get("open");

  useEffect(() => {
    if (openModal) {
      setIsOpen(true);
    }
  }, [openModal]);

  return (
    <div className={classes.background}>
      {/* modal */}
      <ModalPickShow
        dataMovie={dataMovie}
        opened={isOpen}
        close={() => setIsOpen(false)}
      ></ModalPickShow>

      <Grid>
        {/* Carousel */}
        <Grid.Col span={8}>
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
                <Image src={img} h={"100%"} fit="fill" radius={"md"}></Image>
              </Carousel.Slide>
            ))}
          </Carousel>
        </Grid.Col>

        <Grid.Col span={4}>
          <Grid gutter="md">
            <Grid.Col>
              <Paper shadow="xs" radius="md" withBorder p="sm" h={498}>
                <div className="flex flex-col justify-around h-full">
                  <div>
                    <Stack gap={0} px={"xs"}>
                      <Text tt="uppercase" c="dimmed" fw={700} size="sm">
                        {dataMovie.genre.join(" - ")}
                      </Text>
                      <Text
                        tt="uppercase"
                        className={classes.title}
                        c={"blue"}
                        my="xs"
                      >
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
                  </div>

                  <div className="flex justify-center">
                    <Button
                      variant="gradient"
                      radius={"md"}
                      w={200}
                      ml="xs"
                      disabled={!isLogged ? true : false}
                      gradient={{ from: "blue", to: "pink", deg: 90 }}
                      onClick={() => setIsOpen(true)}
                    >
                      Đặt vé
                    </Button>

                    <Button
                      variant="gradient"
                      radius={"md"}
                      w={200}
                      ml="xs"
                      disabled={!isLogged ? true : false}
                      gradient={{ from: "pink", to: "blue", deg: 0 }}
                    >
                      Viết đánh giá
                    </Button>
                  </div>
                </div>
              </Paper>
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
    </div>
  );
}

export default TopSecton;
