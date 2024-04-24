import {
  Button,
  Image,
  Modal,
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
import { Link } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";

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

const PRIMARY_COL_HEIGHT = rem(450);

function TopSecton({ dataMovie }: Props) {
  const autoplay = useRef(Autoplay({ delay: 2000 }));
  const [isOpen, setIsOpen] = useState(false);
  const [isLogged, , dataUser] = useAuthenticate();
  const [opened, { open, close }] = useDisclosure(false);

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

  useEffect(() => {
    calculateStarRating(dataMovie.id);
    if (openModal) {
      setIsOpen(true);
    }
  }, [dataMovie.id, openModal]);

  return (
    <div className={classes.background}>
      {/* modal */}
      <ModalPickShow
        dataMovie={dataMovie}
        opened={isOpen}
        close={() => setIsOpen(false)}
      ></ModalPickShow>

      {/* modal watch trailer */}
      <Modal
        styles={{
          body: {
            padding: "0px",
          },
        }}
        opened={opened}
        onClose={close}
        withCloseButton={false}
        size={"80%"}
        centered
      >
        <div className="h-full">
          <iframe
            autoFocus={true}
            height="550px"
            width={"100%"}
            src={dataMovie.trailerLink}
            loading="lazy"
          ></iframe>
        </div>
      </Modal>

      <div className="grid grid-cols-4 gap-5">
        <div>
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
            <>
              {/* {dataMovie.trailerLink && (
                <Carousel.Slide key={882912}>
                  <iframe
                    autoFocus={false}
                    height="100%"
                    width={"100%"}
                    src={dataMovie.trailerLink}
                  ></iframe>
                </Carousel.Slide>
              )} */}

              {dataMovie.images.map((img, index) => (
                <Carousel.Slide key={index}>
                  <Image src={img} h={"100%"} fit="cover" radius={"sm"}></Image>
                </Carousel.Slide>
              ))}
            </>
          </Carousel>
        </div>

        <div className="col-span-2 h-full">
          <div className="h-full">
            <div className="flex flex-col justify-between h-full text-white ">
              <div>
                <Stack gap={0} px={"xs"}>
                  <Text tt="uppercase" c="dimmed" fw={700} size="sm">
                    {dataMovie.genre.join(" - ")}
                  </Text>
                  <Text tt="uppercase" className={classes.title} c={""} my="xs">
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

              <div className="flex">
                <Link className="" to={`/select-show/${dataMovie.id}`}>
                  {" "}
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
                      ml="xs"
                      disabled={
                        !isLogged || !dataUser.isVerifyEmail ? true : false
                      }
                      gradient={{ from: "violet", to: "pink.7", deg: -90 }}
                    >
                      Đặt vé
                    </Button>
                  </Tooltip>
                </Link>

                <Button
                  variant="gradient"
                  radius={"md"}
                  ml="xs"
                  onClick={() => open()}
                  disabled={!isLogged || !dataUser.isVerifyEmail ? true : false}
                  gradient={{ from: "violet", to: "pink.7", deg: 90 }}
                >
                  Xem trailer
                </Button>

                <Tooltip
                  label={getToolTipFromState(isLogged, dataUser.isVerifyEmail)}
                  disabled={isLogged && dataUser.isVerifyEmail}
                >
                  <Button
                    variant="gradient"
                    radius={"md"}
                    ml="xs"
                    onClick={() =>
                      window.location.replace(`/movie/${dataMovie.id}#reviews`)
                    }
                    disabled={
                      !isLogged || !dataUser.isVerifyEmail ? true : false
                    }
                    gradient={{ from: "violet", to: "pink.7", deg: 90 }}
                  >
                    Xem đánh giá
                  </Button>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopSecton;
