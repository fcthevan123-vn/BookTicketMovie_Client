import { Carousel } from "@mantine/carousel";
import { Text, Divider, Box, Badge, Skeleton } from "@mantine/core";
import Autoplay from "embla-carousel-autoplay";
import { AiFillFire } from "react-icons/ai";
import { useRef } from "react";
import classes from "./TrendingMovie.module.css";
import { DataTableMoviesProps } from "../../Provider/MovieProvider/MovieProvider";
import MovieLargePreview from "../../MovieLargePreview";

interface TrendingMovieProps {
  dataMovies: DataTableMoviesProps[] | undefined;
}

export function TrendingMovie({ dataMovies }: TrendingMovieProps) {
  const autoplay = useRef(Autoplay({ delay: 30000 }));

  const slider = dataMovies
    ? dataMovies.map((movie, index) => (
        <Carousel.Slide key={index}>
          <MovieLargePreview dataMovies={movie}></MovieLargePreview>
        </Carousel.Slide>
      ))
    : "";

  return (
    <div>
      <div className={classes.root + " py-3 "}>
        <Divider
          size="sm"
          my="xl"
          label={
            <Box className={classes.badgeTrendingMovie}>
              <Badge
                size="xl"
                variant="gradient"
                gradient={{ from: "violet", to: "violet", deg: 90 }}
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
        <div className={classes.carousel + " shadow-md drop-shadow-md"}>
          <Carousel
            loop
            orientation="horizontal"
            height="100%"
            // sx={{ flex: 1 }}
            withIndicators
            style={{
              flex: 1,
            }}
            styles={{
              viewport: {
                border: "1.5px solid var(--mantine-color-gray-4 )",
                borderRadius: "var(--mantine-radius-md)",
              },
            }}
            dragFree={false}
            draggable={false}
            plugins={[autoplay.current]}
            // onMouseEnter={autoplay.current.stop}
            onMouseLeave={autoplay.current.reset}
          >
            {/* {slides} */}

            {dataMovies ? slider : <Skeleton height={500} radius={"md"} />}
            {/* {sliderTest} */}
          </Carousel>
        </div>
      </div>
    </div>
  );
}
