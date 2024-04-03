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
import { EventTS } from "../../../types";
import { useEffect, useState } from "react";
import { eventServices } from "../../../services";
import moment from "moment";
import { Link } from "react-router-dom";

function showEvent(event: EventTS) {
  return (
    <Link key={event.id} to={`/event/${event.id}`}>
      <Card key={event.id} p="md" radius="md" className={classes.card}>
        <AspectRatio ratio={1920 / 1080}>
          <Image src={event.thumbnail} alt="test image" fit="contain" />
        </AspectRatio>
        <Text c="dimmed" size="xs" fw={700} mt="md">
          {moment(event.startDate).format("DD/MM/YYYY")}
          {" - "}
          {moment(event.endDate).format("DD/MM/YYYY")}
        </Text>
        <Text className={classes.title} mt={5} tt="uppercase">
          {event.title}
        </Text>
      </Card>
    </Link>
  );
}

function AllEvents() {
  const [allEvent, setAllEvents] = useState<EventTS[]>();

  async function getAllEvents() {
    try {
      const res = await eventServices.getAllEvents();
      if (res.statusCode === 0) {
        setAllEvents(res.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    getAllEvents();
  }, []);

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

      {allEvent && allEvent?.length > 4 && (
        <span className="flex justify-end text-sm italic text-violet-500 mb-3 hover:underline cursor-pointer hover:text-violet-600">
          Xem tất cả
        </span>
      )}

      <SimpleGrid cols={{ base: 1, sm: 2 }}>
        {allEvent && allEvent.map((event) => showEvent(event))}
      </SimpleGrid>
    </div>
  );
}

export default AllEvents;
