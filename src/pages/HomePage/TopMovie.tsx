import { Badge, Box, Button, Rating, Stack, Text } from "@mantine/core";
import { PreviewImages } from "../../components/PreviewImage";
import { MovieTS } from "../../types";
import { Link } from "react-router-dom";

type Props = {
  topBookMovie: MovieTS;
  topStarMovie: MovieTS;
};

function TopMovie({ topBookMovie, topStarMovie }: Props) {
  return (
    <div className="grid grid-cols-2">
      <Box w={"100%"}>
        <div
          style={{
            backgroundImage: `url(${
              topBookMovie.images ? topBookMovie?.images[0] : ""
            })`,
            backgroundPosition: "left",
            backgroundRepeat: "no-repeat",
          }}
          className="h-[580px] overflow-hidden rounded-br-2xl"
        >
          <div className="flex flex-col justify-center items-center h-full gap-8 backdrop-brightness-75 backdrop-blur-sm bg-black/15">
            <Badge
              size="xl"
              variant="gradient"
              radius={"md"}
              tt={"none"}
              gradient={{ from: "pink", to: "orange", deg: 90 }}
            >
              Đặt vé nhiều nhất
            </Badge>

            <div className="grid grid-cols-2  mx-12 gap-4 h-max">
              <div className="flex justify-end">
                <PreviewImages
                  width={"270px"}
                  height={"350px"}
                  img={
                    topBookMovie.images
                      ? topBookMovie.images[1]
                      : "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png"
                  }
                ></PreviewImages>
              </div>

              <div className=" p-3 rounded-lg backdrop-blur-xl bg-black/40 flex justify-between flex-col ">
                <Stack gap={0} px={"xs"}>
                  <Text
                    tt="uppercase"
                    c="dimmed"
                    fw={700}
                    size="sm"
                    lineClamp={1}
                  >
                    {topBookMovie.genre.join()}
                  </Text>
                  <Text
                    tt="uppercase"
                    lineClamp={2}
                    size="xl"
                    fw={700}
                    c={"white"}
                    my="xs"
                  >
                    {topBookMovie.title}
                  </Text>

                  <Text size="sm" c={"white"} mb={"sm"} lineClamp={3}>
                    {topBookMovie.description}
                  </Text>
                  <div className="flex">
                    <Rating
                      value={topBookMovie.ageRequire}
                      readOnly
                      mb={"xs"}
                    />
                  </div>
                  <div className="flex  items-center">
                    <p className="text-sm text-gray-300">Độ tuổi yêu cầu:</p>
                    <Badge color="teal" radius="sm" size="lg" ms={"sm"}>
                      {topBookMovie.ageRequire}
                    </Badge>
                  </div>
                </Stack>

                <div className="flex justify-center gap-3">
                  <Link to={`/select-show/${topBookMovie.id}`}>
                    <Button size="sm" color={"pink"} radius={"md"}>
                      Đặt vé ngay
                    </Button>
                  </Link>

                  <Link to={`/movie/${topBookMovie.id}`}>
                    <Button size="sm" color={"pink"} radius={"md"}>
                      Xem chi tiết
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Box>

      <Box w={"100%"}>
        <div
          style={{
            backgroundImage: `url(${
              topStarMovie.images ? topStarMovie?.images[0] : ""
            })`,
            backgroundPosition: "left center",
            backgroundRepeat: "no-repeat",
          }}
          className="h-[580px] overflow-hidden rounded-bl-2xl"
        >
          <div className="flex flex-col justify-center items-center h-full gap-8 backdrop-brightness-75 backdrop-blur-sm bg-black/10">
            <Badge
              size="xl"
              variant="gradient"
              radius={"md"}
              tt={"none"}
              gradient={{ from: "indigo", to: "pink", deg: 90 }}
            >
              Đánh giá tích cực nhất
            </Badge>

            <div className="grid grid-cols-2 mx-12 gap-3 h-max">
              <div className="flex justify-end">
                <PreviewImages
                  width={"270px"}
                  height={"350px"}
                  img={
                    topStarMovie.images
                      ? topStarMovie.images[1]
                      : "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png"
                  }
                ></PreviewImages>
              </div>

              <div className="backdrop-blur-xl bg-black/40 p-3 rounded-lg  flex justify-between flex-col">
                <Stack gap={0} px={"xs"}>
                  <Text
                    tt="uppercase"
                    c="dimmed"
                    fw={700}
                    size="sm"
                    lineClamp={1}
                  >
                    {topStarMovie.genre.join(" - ")}
                  </Text>
                  <Text
                    tt="uppercase"
                    size="xl"
                    fw={700}
                    c={"white"}
                    my="xs"
                    lineClamp={2}
                  >
                    {topStarMovie.title}
                  </Text>

                  <Text size="sm" c={"white"} mb={"sm"} lineClamp={3}>
                    {topStarMovie.description}
                  </Text>
                  <div className="flex">
                    <Rating
                      value={topStarMovie.averageRating}
                      readOnly
                      mb={"xs"}
                    />
                  </div>
                  <div className="flex  items-center">
                    <p className="text-sm text-gray-300">Độ tuổi yêu cầu:</p>
                    <Badge color="teal" radius="sm" size="lg" ms={"sm"}>
                      {topStarMovie.ageRequire}
                    </Badge>
                  </div>
                </Stack>

                <div className="flex justify-center gap-3">
                  <Link to={`/select-show/${topStarMovie.id}`}>
                    <Button size="sm" color={"pink"} radius={"md"}>
                      Đặt vé ngay
                    </Button>
                  </Link>

                  <Link to={`/movie/${topStarMovie.id}`}>
                    <Button size="sm" color={"pink"} radius={"md"}>
                      Xem chi tiết
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
}

export default TopMovie;
