import {
  ActionIcon,
  Badge,
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
  const element = allShows.map((show, index) => (
    <ShowTime dataShow={show} key={index}></ShowTime>
  ));
  return element;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ShowItem({ dataShow, dataControlShow }: Props) {
  const showTimeRender =
    dataShow.allShowsMovieHall.length > 0 &&
    dataShow.allShowsMovieHall.map((item, index) => (
      <div key={index} className="py-2">
        <Grid px={"md"} py={10}>
          <Grid.Col span={3}>
            <div className="flex items-center">
              <Text c={"violet.8"}>
                <IconArrowBadgeRightFilled></IconArrowBadgeRightFilled>
              </Text>
              <Badge variant="light" p={"sm"} color="violet" radius="md">
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
      {dataShow.allShowsMovieHall.length > 0 && (
        <Paper
          withBorder
          shadow="xs"
          radius="md"
          p="lg"
          styles={{
            root: {
              borderLeft: "8px solid var(--mantine-color-violet-6)",
            },
          }}
        >
          <div className="flex items-center gap-2">
            <Badge variant="filled" p={"sm"} color="violet" radius="md">
              <Text fw={500} size="sm" tt="capitalize">
                {dataShow.cinema.name}
              </Text>
            </Badge>
            <HoverCard radius={"md"} width={280} shadow="lg" withArrow>
              <HoverCard.Target>
                <ActionIcon
                  variant="light"
                  color="violet"
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
