import {
  Card,
  Group,
  Image,
  Text,
  Button,
  Rating,
  Skeleton,
} from "@mantine/core";
import React, { useRef, useState } from "react";
import classes from "./MovieLargePreview.module.css";
import Autoplay from "embla-carousel-autoplay";
import { Carousel } from "@mantine/carousel";
import { DataTableMoviesProps } from "../Provider/MovieProvider/MovieProvider";
import moment from "moment";
import { LazyLoadImage } from "react-lazy-load-image-component";

type Props = {
  dataMovies: DataTableMoviesProps;
};

function MovieLargePreview({ dataMovies }: Props) {
  const autoplay = useRef(Autoplay({ delay: 20000 }));
  const [isLoadingImg, setIsLoadingImg] = useState(true);

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
                  src={movieImage.imageUrl}
                  height={"100%"}
                  style={{
                    display: `${isLoadingImg ? "none" : ""}`,
                  }}
                  onLoadStartCapture={() => setIsLoadingImg(true)}
                  onLoad={() => setIsLoadingImg(false)}
                  className={classes.img}
                />
                {/* 
                <LazyLoadImage
                  alt="https://placehold.co/600x400"
                  height={"100%"}
                  style={{
                    display: `${isLoadingImg ? "none" : ""}`,
                  }}
                  src={movieImage.imageUrl}
                  onLoad={() => setIsLoadingImg(false)}
                /> */}

                {isLoadingImg && <Skeleton h={500} radius={"md"}></Skeleton>}
              </Carousel.Slide>
            ))}
          </Carousel>

          <div className={classes.body}>
            <div>
              <Text tt="uppercase" c="dimmed" fw={700} size="xs">
                {dataMovies.genre.join(" - ")}
              </Text>
              <Text className={classes.title} mt="xs" mb="md">
                {dataMovies.title.toUpperCase()}
              </Text>
              <Group gap="xs" wrap="nowrap">
                {/* <Avatar
                  size={20}
                  src="https://images.unsplash.com/photo-1628890923662-2cb23c2e0cfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80"
                /> */}
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

            <Button
              variant="gradient"
              gradient={{ from: "red", to: "yellow", deg: 270 }}
              radius={"md"}
              translate="yes"
            >
              Đặt ngay
            </Button>
          </div>
        </Group>
      </Card>
    </div>
  );
}

export default MovieLargePreview;
