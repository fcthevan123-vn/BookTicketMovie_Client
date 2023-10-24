import {
  ActionIcon,
  Badge,
  Divider,
  Grid,
  HoverCard,
  Paper,
  SimpleGrid,
  Text,
} from "@mantine/core";
import {
  IconArrowBadgeRightFilled,
  IconDotsVertical,
} from "@tabler/icons-react";

import ShowTime from "./ShowTime";
import { Cinema, MovieHall, Show } from "../../types";
import { useMemo } from "react";

type Props = {
  dataShow: dataShowType;
  dataControlShow: {
    dateControl: Date;
    roomTypeControl: string | null;
    cityControl: string | null;
  };
};

type dataShowType = {
  cinema: Cinema;
  allShowsMovieHall: allShowsMovieHallType[];
};

type allShowsMovieHallType = {
  allShows: Show[];
  movieHall: MovieHall;
};
type GridRenderProps = {
  allShows: Show[];
};

function GridRender({ allShows }: GridRenderProps) {
  // console.log("allShows.length", allShows.length, allShows);
  const element = allShows.map((show, index) => (
    <ShowTime dataShow={show} key={index}></ShowTime>
  ));
  return element;
}

function ShowItem({ dataShow, dataControlShow }: Props) {
  const showTimeRender =
    dataShow.allShowsMovieHall.length > 0 &&
    dataShow.allShowsMovieHall.map((item, index) => (
      <div key={index} className="py-2">
        <Grid px={"md"} py={10}>
          <Grid.Col span={3}>
            <div className="flex items-center">
              <Text c={"orange.8"}>
                <IconArrowBadgeRightFilled></IconArrowBadgeRightFilled>
              </Text>
              <Badge variant="light" p={"sm"} color="orange" radius="md">
                <Text fw={500} size="sm" tt="capitalize">
                  {item.movieHall.name}
                </Text>
              </Badge>
            </div>
          </Grid.Col>
          <Grid.Col span={9}>
            <SimpleGrid cols={5}>
              <GridRender allShows={item.allShows}></GridRender>
            </SimpleGrid>
          </Grid.Col>
        </Grid>
      </div>
    ));

  return (
    <>
      {/* {console.log("dataControlShow", dataControlShow)} */}
      {dataShow.allShowsMovieHall.length > 0 && (
        <Paper
          withBorder
          shadow="xs"
          radius="md"
          p="lg"
          styles={{
            root: {
              borderLeft: "8px solid var(--mantine-color-orange-6)",
            },
          }}
        >
          <div className="flex items-center gap-2">
            <Badge variant="filled" p={"sm"} color="orange" radius="md">
              <Text fw={500} size="sm" tt="capitalize">
                {dataShow.cinema.name}
              </Text>
            </Badge>
            <HoverCard radius={"md"} width={280} shadow="lg" withArrow>
              <HoverCard.Target>
                <ActionIcon
                  variant="light"
                  color="orange"
                  size="sm"
                  radius="md"
                  aria-label="Settings"
                >
                  <IconDotsVertical
                    style={{ width: "70%", height: "70%" }}
                    stroke={1.5}
                  />
                </ActionIcon>
              </HoverCard.Target>
              <HoverCard.Dropdown>
                <Text size="sm">{dataShow.cinema.detailLocation}</Text>
              </HoverCard.Dropdown>
            </HoverCard>
          </div>

          <div className="flex flex-col gap-2">{showTimeRender}</div>
        </Paper>
      )}
    </>
  );
}

export default ShowItem;
