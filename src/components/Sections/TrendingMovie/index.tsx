import { Carousel } from "@mantine/carousel";
import {
  Container,
  Title,
  Text,
  Button,
  BackgroundImage,
  Center,
  Divider,
  ActionIcon,
  Box,
  Badge,
} from "@mantine/core";
import Autoplay from "embla-carousel-autoplay";
import { AiFillFire } from "react-icons/ai";
import { useRef } from "react";
import classes from "./TrendingMovie.module.css";

const images = [
  "https://images.unsplash.com/photo-1521714161819-15534968fc5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",

  "https://i.redd.it/7trta4nby7b31.png",

  "https://preview.redd.it/pyt36yajj3561.png?width=960&crop=smart&auto=webp&s=13b80bd83738a49443ef9ee358cee01db7618703",

  "https://i.pinimg.com/originals/03/c1/62/03c1626f27a3a92dc1c45fc0a3598d7d.jpg",
];

export function TrendingMovie() {
  const autoplay = useRef(Autoplay({ delay: 3000 }));

  const slides = images.map((url) => (
    <Carousel.Slide key={url} className={classes.carouselSlide}>
      <BackgroundImage src={url} radius="lg">
        <Center
          p="md"
          className="backdrop-blur-sm backdrop-brightness-50"
          style={{
            height: "100%",
          }}
          // sx={{ height: "100%" }}
        >
          <div className={classes.inner}>
            <div className={classes.content}>
              <Title className={classes.title}>
                Spider-Man{" "}
                <Text
                  component="span"
                  inherit
                  variant="gradient"
                  gradient={{ from: "pink", to: "yellow" }}
                >
                  No Way Home
                </Text>{" "}
              </Title>

              <Text className={classes.description} mt={30}>
                Build fully functional accessible web applications with ease –
                Mantine includes more than 100 customizable components and hooks
                to cover you in any situation
              </Text>

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
  ));

  return (
    <div>
      {/* {console.log("autoplay", autoplay.current)} */}
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
              {slides}
            </Carousel>
          </div>
        </div>
      </Container>
    </div>
  );
}
