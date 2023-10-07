// import { Card, Text, Group, Rating } from "@mantine/core";
// import classes from "./MovieSmallPreview.module.css";
// import { DataTableMoviesProps } from "../Provider/MovieProvider/MovieProvider";

// type Props = {
//   dataMovie: DataTableMoviesProps;
// };

// export default function MovieSmallPreview({ dataMovie }: Props) {
//   return (
//     <Card
//       p="lg"
//       shadow="lg"
//       className={classes.card}
//       radius="md"
//       component="a"
//       href="https://mantine.dev/"
//       target="_blank"
//     >
//       <div
//         className={classes.image}
//         style={{
//           backgroundImage: `url(${dataMovie.images[0].imageUrl})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       />
//       <div className={classes.overlay} />

//       <div className={classes.content}>
//         <div>
//           <Text size="lg" className={classes.title} fw={500}>
//             {dataMovie.title.toUpperCase()}
//           </Text>

//           <Text size="sm" className={classes.author}>
//             descirption
//           </Text>

//           <Group justify="space-between" gap="xs">
//             <Text size="sm" className={classes.author}>
//               date - date
//             </Text>
//           </Group>
//           <div className="flex justify-between">
//             <Rating size="xs" value={4} fractions={2} readOnly />
//           </div>
//         </div>
//       </div>
//     </Card>
//   );
// }

import {
  Card,
  Image,
  Text,
  Badge,
  Rating,
  Button,
  Tooltip,
} from "@mantine/core";
import classes from "./MovieSmallPreview.module.css";
import { DataTableMoviesProps } from "../Provider/MovieProvider/MovieProvider";
import moment from "moment";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { Carousel } from "@mantine/carousel";
type Props = {
  dataMovie: DataTableMoviesProps;
};

export default function MovieSmallPreview({ dataMovie }: Props) {
  const autoplay = useRef(Autoplay({ delay: 5000 }));
  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section>
        <Carousel
          height={250}
          orientation="horizontal"
          loop
          withControls={false}
          plugins={[autoplay.current]}
          draggable={false}
          withIndicators
        >
          {dataMovie.images.map((movieImage, index) => (
            <Carousel.Slide key={index}>
              <Image
                fallbackSrc="https://raw.githubusercontent.com/koehlersimon/fallback/master/Resources/Public/Images/placeholder.jpg"
                src={movieImage.imageUrl}
                className={classes.img}
              />
            </Carousel.Slide>
          ))}
        </Carousel>
      </Card.Section>

      <Badge
        className={classes.rating}
        variant="gradient"
        gradient={{ from: "yellow", to: "red" }}
      >
        Phim nổi bật
      </Badge>

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

      <div className="py-2">
        <Text c="dimmed" fz="sm">
          Từ: {moment(dataMovie.releaseDate).format("DD - MM - YYYY")}
        </Text>

        <Text c="dimmed" fz="sm">
          Đến: {moment(dataMovie.endDate).format("DD - MM - YYYY")}
        </Text>
      </div>
      <Rating value={4} readOnly size="xs" mt={1}></Rating>

      <Button
        w={100}
        mt={"sm"}
        radius={"md"}
        size="compact-xs"
        variant="gradient"
        className={classes.button}
        gradient={{ from: "orange", to: "red", deg: 90 }}
      >
        Xem chi tiết
      </Button>
    </Card>
  );
}
