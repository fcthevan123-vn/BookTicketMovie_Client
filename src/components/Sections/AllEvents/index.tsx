import {
  AspectRatio,
  Badge,
  Box,
  Card,
  Container,
  Divider,
  Image,
  SimpleGrid,
  Text,
} from "@mantine/core";

import classes from "./AllEvents.module.css";
import { IconCalendarEvent } from "@tabler/icons-react";
type Props = {};

const mockdata = [
  {
    title: "Sự kiện chào mừng",
    image:
      "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
    date: "August 18, 2022",
  },
  {
    title:
      "KẾT HỢP CHÂN ÁI, KHÁM PHÁ NGAY VÀ NHẬN COSY BÁNH XỐP LIỀN TAY KHI MUA COMBO BẮP NƯỚC TẠI RẠP!",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
    date: "August 27, 2022",
  },
  {
    title: "Phim hay sao thiếu được bánh ngon",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
    date: "September 9, 2022",
  },
  {
    title: "Áp dụng khi mua online hoặc offiline",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
    date: "September 12, 2022",
  },
];

function AllEvents({}: Props) {
  const cards = mockdata.map((article) => (
    <Card
      key={article.title}
      p="md"
      radius="md"
      component="a"
      href="#"
      className={classes.card}
    >
      <AspectRatio ratio={1920 / 1080}>
        <Image src={article.image} alt="test image" />
      </AspectRatio>
      <Text c="dimmed" size="xs" tt="uppercase" fw={700} mt="md">
        {article.date}
      </Text>
      <Text className={classes.title} mt={5}>
        {article.title}
      </Text>
    </Card>
  ));

  return (
    <Container size={"lg"} mt={50}>
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
              leftSection={<IconCalendarEvent size="1.125rem" />}
            >
              <Text fw={500}>Các sự kiện đang diễn ra</Text>
            </Badge>
          </Box>
        }
        orientation="horizontal"
        labelPosition="center"
        className={"py-3 px-8"}
      ></Divider>

      <SimpleGrid cols={{ base: 1, sm: 2 }}>{cards}</SimpleGrid>
    </Container>
  );
}

export default AllEvents;
