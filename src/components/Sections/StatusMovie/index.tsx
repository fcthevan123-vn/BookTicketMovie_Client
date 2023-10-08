import { Carousel } from "@mantine/carousel";
import {
  SegmentedControl,
  rem,
  Container,
  Center,
  Box,
  Divider,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { BiRocket } from "react-icons/bi";
import { RiSlideshow2Line } from "react-icons/ri";
import MotiveItem from "../../MovieItem";
import { useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import classes from "./StatusMovie.module.css";
import { DataTableMoviesProps } from "../../Provider/MovieProvider/MovieProvider";
import MovieSmallPreview from "../../MovieSmallPreview";

const data = [
  {
    image:
      "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    title: "Best forests to visit in North America",
    category: "nature",
  },
  {
    image:
      "https://images.unsplash.com/photo-1559494007-9f5847c49d94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    title: "Hawaii beaches review: better than you think",
    category: "beach",
  },
  {
    image:
      "https://images.unsplash.com/photo-1608481337062-4093bf3ed404?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    title: "Mountains at night: 12 best locations to enjoy the view",
    category: "nature",
  },
  {
    image:
      "https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    title: "Aurora in Norway: when to visit for best experience",
    category: "nature",
  },
  {
    image:
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    title: "Best places to visit this winter",
    category: "tourism",
  },
  {
    image:
      "https://images.unsplash.com/photo-1582721478779-0ae163c05a60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    title: "Active volcanos reviews: travel at your own risk",
    category: "nature",
  },
];

interface StatusMovieProps {
  dataActiveMovies: DataTableMoviesProps[] | undefined;
  dataNextMovies: DataTableMoviesProps[] | undefined;
}

export function StatusMovie({
  dataActiveMovies,
  dataNextMovies,
}: StatusMovieProps) {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const autoplay = useRef(Autoplay({ delay: 5000 }));
  const [currentStateMovies, setCurrentStateMovies] = useState("activeMovies");

  const slidesActiveMovies =
    dataActiveMovies &&
    dataActiveMovies?.length > 0 &&
    dataActiveMovies.map((movie) => (
      <Carousel.Slide key={movie.title}>
        <MovieSmallPreview dataMovie={movie}></MovieSmallPreview>
      </Carousel.Slide>
    ));

  const slidesNextMovies =
    dataNextMovies &&
    dataNextMovies?.length > 0 &&
    dataNextMovies.map((movie) => (
      <Carousel.Slide key={movie.title}>
        <MovieSmallPreview dataMovie={movie}></MovieSmallPreview>
      </Carousel.Slide>
    ));

  return (
    <div className="mt-16">
      <Divider
        size="sm"
        my="xs"
        label={
          <SegmentedControl
            radius="xl"
            size="md"
            data={[
              {
                value: "activeMovies",
                label: (
                  <Center>
                    <RiSlideshow2Line size="1.125rem" />
                    <Box ml={10}>Phim đang chiếu</Box>
                  </Center>
                ),
              },
              {
                value: "nextMovies",
                label: (
                  <Center>
                    <BiRocket size="1.125rem" />
                    <Box ml={10}>Phim sắp chiếu</Box>
                  </Center>
                ),
              },
            ]}
            onChange={(e) => setCurrentStateMovies(e)}
            classNames={classes}
          />
        }
        labelPosition="center"
        className={"sm:px-8 px-3"}
      />

      {/* Movie */}
      <Carousel
        className="mt-8"
        slideSize={{ base: "50%", sm: "25%" }}
        slideGap={{ base: rem(8), sm: "md" }}
        align="start"
        loop
        slidesToScroll={mobile ? 2 : 4}
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
      >
        {currentStateMovies === "activeMovies" && slidesActiveMovies}

        {currentStateMovies === "nextMovies" && slidesNextMovies}
      </Carousel>
    </div>
  );
}
