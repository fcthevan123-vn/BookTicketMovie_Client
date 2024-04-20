import { Card, Text } from "@mantine/core";

import classes from "./ShowTime.module.css";
import { Show } from "../../types";
import { useNavigate } from "react-router-dom";
import moment from "moment";

type Props = {
  dataShow: Show;
};

function ShowTime({ dataShow }: Props) {
  const navigate = useNavigate();

  function navigateToPickSeats() {
    navigate(`/pick-seat-by-show/${dataShow.id}`);
  }

  return (
    <div>
      <Card
        shadow="sm"
        className={classes.card}
        padding="lg"
        radius="md"
        withBorder
        onClick={() => navigateToPickSeats()}
      >
        <Card.Section>
          <Text ta={"center"} py={15} size="md">
            {moment(dataShow.startTime).format("hh:mm A")} ~{" "}
            {moment(dataShow.endTime).format("hh:mm A")}
          </Text>
        </Card.Section>

        <Card.Section
          style={{
            borderTop: "1px solid var(--mantine-color-gray-3)",
          }}
        >
          <Text size="sm" py={3} c={"dimmed"} ta={"center"}>
            {dataShow.availableSeats}/{dataShow.totalSeats} ghế ngồi
          </Text>
        </Card.Section>
      </Card>
    </div>
  );
}

export default ShowTime;
