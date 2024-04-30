import { useMemo } from "react";
import { Layout } from "../../../types";
import { Chip, SimpleGrid, Text } from "@mantine/core";

type Props = {
  data: Layout;
};

export default function PreviewLayout({ data }: Props) {
  console.log(data);

  const sortArray = useMemo(() => {
    if (data.Seats) {
      return data.Seats.sort((a, b) => {
        if (a.rowNumber === b.rowNumber) {
          return a.seatNumber - b.seatNumber;
        } else {
          return a.rowNumber - b.rowNumber;
        }
      });
    }
    return [];
  }, [data.Seats]);

  const allSeats = useMemo(
    () => (
      <SimpleGrid cols={data.seatsPerRow}>
        {sortArray.map((seat) => (
          <Chip
            key={seat.id}
            styles={{
              label: {
                width: "60px",
                height: "50px",
                background: `var(--mantine-color-${seat.SeatType.color}-6)`,
              },
            }}
            checked={false}
            readOnly
            radius="md"
          >
            <Text size="xs" c={"white"} ta={"center"}>
              {seat.name}
            </Text>
          </Chip>
        ))}
      </SimpleGrid>
    ),
    [data.seatsPerRow, sortArray]
  );

  return (
    <div>
      <p className="border-2 bg-gray-500 text-center border-gray-300 text-white rounded-md p-3">
        Màn hình ở đây
      </p>
      <div className="p-4">{allSeats}</div>
    </div>
  );
}
