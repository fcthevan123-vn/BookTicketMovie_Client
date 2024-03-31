import {
  Button,
  Grid,
  Image,
  Paper,
  Rating,
  Stack,
  Text,
  Tooltip,
  rem,
} from "@mantine/core";
import { DataTableMoviesProps } from "../../../components/Provider/MovieProvider/MovieProvider";
import { Carousel } from "@mantine/carousel";
import classes from "./TopSection.module.css";
import Autoplay from "embla-carousel-autoplay";

import { useEffect, useRef, useState } from "react";
import ModalPickShow from "../../../components/Modals/ModalPickShow";
import { useAuthenticate } from "../../../hooks";
import { reviewServices } from "../../../services";

type Props = {
  dataMovie: DataTableMoviesProps;
};

type StarRating = {
  average: number;
  totalCount: number;
  counts: { rating: number; count: number }[];
};

const initialStarRating = {
  average: 0,
  totalCount: 0,
  counts: [
    { rating: 5, count: 0 },
    { rating: 4, count: 0 },
    { rating: 3, count: 0 },
    { rating: 2, count: 0 },
    { rating: 1, count: 0 },
  ],
};

const PRIMARY_COL_HEIGHT = rem(500);

function TopSecton({ dataMovie }: Props) {
  const autoplay = useRef(Autoplay({ delay: 5000 }));
  const [isOpen, setIsOpen] = useState(false);
  const [isLogged, , dataUser] = useAuthenticate();

  const urlParams = new URLSearchParams(window.location.search);

  const [dataStarRating, setDataStarRating] =
    useState<StarRating>(initialStarRating);

  const openModal = urlParams.get("open");

  function getToolTipFromState(
    isLogin?: boolean,
    isVerifyEmail?: boolean,
    isWatched?: boolean
  ) {
    if (!isLogin) {
      return "Bạn chưa đăng nhập";
    }
    if (!isVerifyEmail) {
      return "Bạn cần phải xác nhận tài khoản";
    }
    if (!isWatched) {
      return "Bạn chưa xem phim này";
    }
  }

  async function calculateStarRating(movieId: string) {
    try {
      const res = await reviewServices.calculateStar(movieId);
      if (res.statusCode === 0) {
        console.log("res", res);
        setDataStarRating(res.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  function getIdInTrailerLink(trailerLink: string) {
    if (trailerLink) {
      const videoID = trailerLink.match(
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
      );

      if (videoID) {
        return videoID[1];
      }
    }
    return "B2Jlyq_Tf3Y";
  }

  useEffect(() => {
    calculateStarRating(dataMovie.id);
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
            onMouseEnter={autoplay.current.stop}
          >
            <>
              {/* <Carousel.Slide key={88291}>
                <iframe
                  height="100%"
                  width={"100%"}
                  src="https://www.youtube.com/embed/B2Jlyq_Tf3Y"
                ></iframe>
              </Carousel.Slide> */}

              <Carousel.Slide key={882912}>
                <iframe
                  height="100%"
                  width={"100%"}
                  src={`https://www.youtube.com/embed/${getIdInTrailerLink(
                    dataMovie.trailerLink
                  )}`}
                ></iframe>
              </Carousel.Slide>

              {dataMovie.images.map((img, index) => (
                <Carousel.Slide key={index}>
                  <Image src={img} h={"100%"} fit="fill" radius={"md"}></Image>
                </Carousel.Slide>
              ))}
            </>
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
                      <Rating
                        value={dataStarRating.average}
                        readOnly
                        px={"xs"}
                        mb={"xs"}
                      />
                      <Text size="sm" c="dimmed">
                        •
                      </Text>
                      <Text size="sm" c="dimmed" ml={"xs"}>
                        {dataStarRating.totalCount} đánh giá
                      </Text>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <Tooltip
                      label={getToolTipFromState(
                        isLogged,
                        dataUser.isVerifyEmail
                      )}
                      disabled={isLogged && dataUser.isVerifyEmail}
                    >
                      <Button
                        variant="gradient"
                        radius={"md"}
                        w={"50%"}
                        ml="xs"
                        disabled={
                          !isLogged || !dataUser.isVerifyEmail ? true : false
                        }
                        gradient={{ from: "blue", to: "violet", deg: 90 }}
                        onClick={() => setIsOpen(true)}
                      >
                        Đặt vé
                      </Button>
                    </Tooltip>

                    <Tooltip
                      label={getToolTipFromState(
                        isLogged,
                        dataUser.isVerifyEmail
                      )}
                      disabled={isLogged && dataUser.isVerifyEmail}
                    >
                      <Button
                        variant="gradient"
                        radius={"md"}
                        w={"50%"}
                        ml="xs"
                        onClick={() =>
                          window.location.replace(
                            `/movie/${dataMovie.id}#reviews`
                          )
                        }
                        disabled={
                          !isLogged || !dataUser.isVerifyEmail ? true : false
                        }
                        gradient={{ from: "violet", to: "blue", deg: 0 }}
                      >
                        Xem đánh giá
                      </Button>
                    </Tooltip>
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
