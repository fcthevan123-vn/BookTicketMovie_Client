import {
  AspectRatio,
  Badge,
  Box,
  Card,
  Divider,
  Image,
  SimpleGrid,
  Text,
} from "@mantine/core";

import classes from "./AllEvents.module.css";
import { IconCalendarEvent } from "@tabler/icons-react";

const mockdata = [
  {
    title: "Sự kiện chào mừng",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "26 Tháng 12 2023",
  },
  {
    title:
      "KẾT HỢP CHÂN ÁI, KHÁM PHÁ NGAY VÀ NHẬN COSY BÁNH XỐP LIỀN TAY KHI MUA COMBO BẮP NƯỚC TẠI RẠP!",
    image:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "3 Tháng 12 2023",
  },
  {
    title: "Phim hay sao thiếu được bánh ngon",
    image:
      "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=2056&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "29 Tháng 11 2023",
  },
  {
    title: "Áp dụng khi mua online hoặc offiline",
    image:
      "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?q=80&w=1779&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "12 Tháng 12 2023",
  },
];

function AllEvents() {
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
    <div className="mt-14">
      <Divider
        size="sm"
        my="xs"
        label={
          <Box className={classes.badgeTrendingMovie}>
            <Badge
              size="xl"
              variant="gradient"
              gradient={{ from: "violet", to: "violet", deg: 90 }}
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
    </div>
  );
}

export default AllEvents;
