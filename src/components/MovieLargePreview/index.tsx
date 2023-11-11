import { Card, Group, Image, Text, Button, Rating } from "@mantine/core";
import { useRef } from "react";
import classes from "./MovieLargePreview.module.css";
import Autoplay from "embla-carousel-autoplay";
import { Carousel } from "@mantine/carousel";
import { DataTableMoviesProps } from "../Provider/MovieProvider/MovieProvider";
import moment from "moment";
import { Link } from "react-router-dom";

type Props = {
  dataMovies: DataTableMoviesProps;
};

function MovieLargePreview({ dataMovies }: Props) {
  const autoplay = useRef(Autoplay({ delay: 2000 }));

  return (
    <div>
      <Card withBorder radius="md" p={0} className={classes.card}>
        <Group wrap="nowrap" gap={0} h={500}>
          {/* carousel */}

          <Carousel
            height={500}
            w={"75%"}
            orientation="vertical"
            loop
            withControls={false}
            plugins={[autoplay.current]}
            // onMouseEnter={autoplay.current.stop}
            onMouseLeave={autoplay.current.reset}
          >
            {dataMovies.images.map((movieImage, index) => (
              <Carousel.Slide key={index}>
                <Image
                  fallbackSrc="https://placehold.co/600x400"
                  src={movieImage}
                  height={"100%"}
                  className={classes.img}
                />
              </Carousel.Slide>
            ))}
          </Carousel>

          <div className={classes.body}>
            <div>
              <Text tt="uppercase" c="dimmed" fw={700} size="xs">
                {dataMovies.genre.join(" - ")}
              </Text>
              <Text className={classes.title} mt="xs" mb="md" c={"blue"}>
                {dataMovies.title.toUpperCase()}
              </Text>
              <Group gap="xs" wrap="nowrap">
                <Text size="sm" lineClamp={7}>
                  {dataMovies.description}
                </Text>
              </Group>
              <Rating value={4} fractions={2} readOnly mt={"sm"} />
              <Group wrap="nowrap" gap="xs" mt={"sm"}>
                <Text size="xs" c="dimmed">
                  Từ: {moment(dataMovies.releaseDate).format("DD - MM - YYYY")}
                </Text>
                <Text size="sm" c="dimmed">
                  •
                </Text>
                <Text size="xs" c="dimmed">
                  Đến: {moment(dataMovies.endDate).format("DD - MM - YYYY")}
                </Text>
              </Group>
            </div>

            <Link to={`/movie/${dataMovies.id}`}>
              <Button w={"100%"} radius={"md"} translate="yes">
                Đặt ngay
              </Button>
            </Link>
          </div>
        </Group>
      </Card>
    </div>
  );
}

export default MovieLargePreview;
