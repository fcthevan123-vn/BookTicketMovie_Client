import { Carousel } from "@mantine/carousel";
import {
  createStyles,
  Container,
  Title,
  Text,
  Button,
  rem,
  Image,
  BackgroundImage,
  Center,
  Divider,
  Group,
  ActionIcon,
} from "@mantine/core";
import { AiFillFire } from "react-icons/ai";

const useStyles = createStyles((theme) => ({
  root: {
    // backgroundColor: "#11284b",
    backgroundSize: "cover",
    backgroundPosition: "center",

    // backgroundImage:
    //   "linear-gradient(250deg, rgba(130, 201, 30, 0) 0%, #062343 70%), url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80)",
    // paddingBottom: `calc(${theme.spacing.xl} * 3)`,
  },

  inner: {
    // position: "absolute",
    // zIndex: 10,
    // top: "50%",
    // transform: "translate(0, -50%)",
    // left: 30,
    height: "100%",
    display: "flex",
    justifyContent: "space-between",

    [theme.fn.smallerThan("md")]: {
      flexDirection: "column",
    },
  },

  carousel: {
    borderRadius: theme.radius.lg,
    overflow: "hidden",
    // position: "relative",
  },

  carouselSlide: {
    display: "flex",
    justifyContent: "center",
    borderRadius: theme.radius.lg,
    overflow: "hidden",
  },

  image: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  content: {
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
    paddingBottom: `calc(${theme.spacing.xl} * 2)`,
    marginRight: `calc(${theme.spacing.xl} * 3)`,

    [theme.fn.smallerThan("md")]: {
      marginRight: 0,
    },
  },

  title: {
    color: theme.white,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    lineHeight: 1.05,
    maxWidth: rem(500),
    fontSize: rem(48),

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      fontSize: rem(34),
      lineHeight: 1.15,
    },
  },

  description: {
    color: theme.white,
    opacity: 1,
    maxWidth: rem(500),

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
    },
  },

  control: {
    paddingLeft: rem(50),
    paddingRight: rem(50),
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(22),

    [theme.fn.smallerThan("md")]: {
      width: "100%",
    },
  },
  devider: {
    color: "red",
  },
}));

const images = [
  "https://images.unsplash.com/photo-1521714161819-15534968fc5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",

  "https://i.redd.it/7trta4nby7b31.png",

  "https://preview.redd.it/pyt36yajj3561.png?width=960&crop=smart&auto=webp&s=13b80bd83738a49443ef9ee358cee01db7618703",

  "https://i.pinimg.com/originals/03/c1/62/03c1626f27a3a92dc1c45fc0a3598d7d.jpg",
];

export function TrendingMovie() {
  const { classes } = useStyles();

  const slides = images.map((url) => (
    <Carousel.Slide key={url} className={classes.carouselSlide}>
      <BackgroundImage src={url} radius="lg">
        <Center
          p="md"
          className="backdrop-blur-sm backdrop-brightness-50"
          sx={{ height: "100%" }}
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
                Book Now
              </Button>
            </div>
          </div>
        </Center>
      </BackgroundImage>
    </Carousel.Slide>
  ));

  return (
    <div>
      <Container size="lg">
        <div className={classes.root + " py-3 "}>
          <Divider
            size="sm"
            my="xs"
            label={
              <Text
                variant="gradient"
                gradient={{ from: "#f74c06", to: "#f9bc2c", deg: 45 }}
                ta="center"
                fz="xl"
                fw={700}
              >
                <div className="flex gap-2">
                  <ActionIcon
                    radius="md"
                    variant="gradient"
                    gradient={{ from: "#f74c06", to: "#f9bc2c", deg: 45 }}
                  >
                    <AiFillFire size="1.125rem" />
                  </ActionIcon>
                  <p>Trending Movie</p>
                </div>
              </Text>
            }
            labelPosition="center"
            className={"py-3 px-8"}
          />
          <div
            style={{ height: 500, display: "flex" }}
            className={classes.carousel + " shadow-xl drop-shadow-2xl"}
          >
            <Carousel
              loop
              orientation="vertical"
              height="100%"
              sx={{ flex: 1 }}
            >
              {slides}
            </Carousel>
          </div>
        </div>
      </Container>
    </div>
  );
}
