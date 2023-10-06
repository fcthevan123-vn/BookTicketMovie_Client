import { Carousel } from "@mantine/carousel";
import {
  Container,
  Title,
  Text,
  Button,
  BackgroundImage,
  Center,
  Divider,
  Box,
  Badge,
  Skeleton,
  Card,
  Avatar,
  Group,
  Image,
} from "@mantine/core";
import Autoplay from "embla-carousel-autoplay";
import { AiFillFire } from "react-icons/ai";
import { useRef } from "react";
import classes from "./TrendingMovie.module.css";
import { DataTableMoviesProps } from "../../Provider/MovieProvider/MovieProvider";
import moment from "moment";

interface TrendingMovieProps {
  dataMovies: DataTableMoviesProps[] | undefined;
}

export function TrendingMovie({ dataMovies }: TrendingMovieProps) {
  const autoplay = useRef(Autoplay({ delay: 3000 }));

  const slides = dataMovies
    ? dataMovies.map((movie, index) => (
        <Carousel.Slide key={index} className={classes.carouselSlide}>
          <BackgroundImage src={movie.images[0].imageUrl} radius="lg">
            <Center
              p="md"
              className="backdrop-blur-sm backdrop-brightness-50"
              style={{
                height: "100%",
              }}
            >
              <div className={classes.inner}>
                <div className={classes.content}>
                  <Title className={classes.title}>
                    {movie.title.toUpperCase()}
                  </Title>

                  <Text className={classes.description} mt={30} lineClamp={4}>
                    {movie.description}
                  </Text>

                  <div className="flex gap-4">
                    <Text className={classes.description} mt={30}>
                      Từ: {moment(movie.releaseDate).format("DD-MM-YYYY")}
                    </Text>

                    <Text className={classes.description} mt={30}>
                      Đến: {moment(movie.endDate).format("DD-MM-YYYY")}
                    </Text>
                  </div>

                  <Button
                    variant="gradient"
                    gradient={{ from: "pink", to: "yellow" }}
                    size="xl"
                    radius="lg"
                    className={classes.control}
                    mt={40}
                  >
                    Đặt vé ngay
                  </Button>
                </div>
              </div>
            </Center>
          </BackgroundImage>
        </Carousel.Slide>
      ))
    : "";

  const sliderTest = (
    <Carousel.Slide>
      <Card withBorder radius="md" p={0} className={classes.card}>
        <Group wrap="nowrap" gap={0}>
          <Image
            src="https://images.unsplash.com/photo-1602080858428-57174f9431cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80"
            height={160}
          />
          <div className={classes.body}>
            <Text tt="uppercase" c="dimmed" fw={700} size="xs">
              technology
            </Text>
            <Text className={classes.titleB} mt="xs" mb="md">
              The best laptop for Frontend engineers in 2022
            </Text>
            <Group wrap="nowrap" gap="xs">
              <Group gap="xs" wrap="nowrap">
                <Avatar
                  size={20}
                  src="https://images.unsplash.com/photo-1628890923662-2cb23c2e0cfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80"
                />
                <Text size="xs">Elsa Typechecker</Text>
              </Group>
              <Text size="xs" c="dimmed">
                •
              </Text>
              <Text size="xs" c="dimmed">
                Feb 6th
              </Text>
            </Group>
          </div>
        </Group>
      </Card>
    </Carousel.Slide>
  );

  return (
    <div>
      <Container size="lg">
        <div className={classes.root + " py-3 "}>
          <Divider
            size="sm"
            my="xs"
            label={
              <Box className={classes.badgeTrendingMovie}>
                <Badge
                  size="xl"
                  variant="gradient"
                  gradient={{ from: "pink", to: "orange", deg: 90 }}
                  style={{
                    textTransform: "none",
                  }}
                  leftSection={<AiFillFire size="1.125rem" />}
                >
                  <Text fw={500}>Phim phổ biến</Text>
                </Badge>
              </Box>
            }
            orientation="horizontal"
            labelPosition="center"
            className={"py-3 px-8"}
          />
          <div className={classes.carousel + " shadow-xl drop-shadow-2xl"}>
            <Carousel
              loop
              orientation="vertical"
              height="100%"
              // sx={{ flex: 1 }}
              style={{
                flex: 1,
              }}
              plugins={[autoplay.current]}
              onMouseEnter={autoplay.current.stop}
              onMouseLeave={autoplay.current.reset}
            >
              {/* {slides} */}

              {/* {dataMovies ? slides : <Skeleton height={500} radius={"md"} />} */}
              {sliderTest}
            </Carousel>
          </div>
        </div>
      </Container>
    </div>
  );
}
