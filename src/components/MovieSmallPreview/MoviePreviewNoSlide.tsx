import { Card, Text, Rating, Button, Tooltip } from "@mantine/core";
import classes from "./MovieSmallPreview.module.css";
import { Link } from "react-router-dom";
import { MovieTS } from "../../types";
import { PreviewImages } from "../PreviewImage";
type Props = {
  dataMovie: MovieTS;
};

export default function MoviePreviewNoSlide({ dataMovie }: Props) {
  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section>
        {dataMovie.images && (
          <PreviewImages
            img={dataMovie?.images[0] ? dataMovie.images[0] : ""}
            width={"auto"}
            height={"auto"}
          ></PreviewImages>
        )}
      </Card.Section>

      <Tooltip label={dataMovie.title} position="top-start">
        <Text className={classes.title} fw={500} component="a" lineClamp={1}>
          {dataMovie.title.toUpperCase()}
        </Text>
      </Tooltip>

      <Tooltip label={dataMovie.genre.join(" - ")} position="top-start">
        <Text fz="sm" c="dimmed" mb={1} lineClamp={1}>
          {dataMovie.genre.join(" - ")}
        </Text>
      </Tooltip>

      <Rating
        value={dataMovie.averageRating}
        readOnly
        size="xs"
        mt={1}
      ></Rating>

      <Link to={`/movie/${dataMovie.id}`}>
        <Button
          w={"100%"}
          mt={"sm"}
          radius={"md"}
          size="sm"
          className={classes.button}
        >
          Xem chi tiết
        </Button>
      </Link>
    </Card>
  );
}
