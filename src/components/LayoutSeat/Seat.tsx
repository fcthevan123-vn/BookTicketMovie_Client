import { Chip, Text } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";

import { SeatStatus, SeatTS } from "../../types";
import { usePickSeatContext } from "../Provider/PickSeatProvider";

type Props = {
  dataSeat: SeatTS;
  dataOrdered?: SeatStatus;
};

function Seat({ dataSeat, dataOrdered }: Props) {
  // console.log("dataSeat", dataSeat);
  const { isDisabledSeat, seatSelected, setSeatSelected } =
    usePickSeatContext();

  const [preventDisabled, setPreventDisabled] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handlePickSeat = useCallback(
    (e: boolean) => {
      if (e) {
        setSeatSelected([...seatSelected, dataSeat]);
      } else {
        const filterSeat = seatSelected.filter(
          (seat) => seat.id !== dataSeat.id
        );
        setPreventDisabled(false);
        setSeatSelected(filterSeat);
      }
    },
    [dataSeat, seatSelected, setSeatSelected]
  );

  const generateColor = () => {
    if (dataSeat.SeatType.name === "Ghế VIP") {
      return "green";
    } else if (dataSeat.SeatType.name === "Ghế Sweet") {
      return "violet";
    } else {
      return "blue";
    }
  };

  const colorSeat = generateColor();

  useEffect(() => {
    const isSelected = seatSelected.find((seat) => seat.id === dataSeat.id);

    if (isSelected) {
      setPreventDisabled(true);
    }
  }, [dataSeat.id, seatSelected]);

  return (
    <div className="flex justify-center items-center m-1">
      {dataOrdered && dataOrdered.isBooked === true ? (
        <Chip
          styles={{
            label: {
              width: "60px",
              height: "50px",
              background: `var(--mantine-color-gray-4)`,
            },
          }}
          radius="md"
          variant="filled"
          disabled={true}
        >
          <Text td="line-through" size="xs" c={"white"} ta={"center"}>
            {dataSeat.name}
          </Text>
        </Chip>
      ) : (
        <Chip
          styles={{
            label: {
              width: "60px",
              height: "50px",
              background: `${
                isChecked
                  ? `var(--mantine-color-${colorSeat}-4)`
                  : `var(--mantine-color-${colorSeat}-6)`
              }`,
              border: `${
                isChecked ? `2px solid var(--mantine-color-${colorSeat}-9)` : ""
              }`,
              boxShadow: `${
                isChecked
                  ? "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset"
                  : ""
              }`,
              scale: `${isChecked ? `1.2` : ``}`,
            },
          }}
          onChange={(e) => {
            // if (seatSelected.length > 7) {
            //   console.log("first");
            //   alert("max 8");
            // }
            setIsChecked(e);
            handlePickSeat(e);
          }}
          radius="md"
          variant="filled"
          disabled={isDisabledSeat && !preventDisabled ? true : false}
        >
          <Text size="xs" c={"white"} ta={"center"}>
            {dataSeat.name}
          </Text>
        </Chip>
      )}
    </div>
  );
}

export default Seat;
