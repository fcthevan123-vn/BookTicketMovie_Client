import { Box, Chip, Text, rem } from "@mantine/core";
import React, { useCallback, useEffect, useState } from "react";

import { SeatStatus, SeatTS } from "../../types";
import { usePickSeatContext } from "../Provider/PickSeatProvider";
import NormalToast from "../AllToast/NormalToast";
import { clamp } from "@mantine/hooks";

type Props = {
  dataSeat: SeatTS;
  dataOrdered?: SeatStatus;
};

function Seat({ dataSeat, dataOrdered }: Props) {
  // console.log("dataSeat", dataSeat);
  const {
    seatNumberControl,
    isDisabledSeat,
    setIsDisabledSeat,
    seatSelected,
    setSeatSelected,
  } = usePickSeatContext();

  const [preventDisabled, setPreventDisabled] = useState(false);

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

  // console.log("seatSelected", seatSelected);

  useEffect(() => {
    const isSelected = seatSelected.find((seat) => seat.id === dataSeat.id);

    if (isSelected) {
      // console.log("isSelected", isSelected);
      setPreventDisabled(true);
    }
  }, [dataSeat.id, seatSelected]);

  return (
    <div>
      <Chip
        styles={{
          label: {
            width: "50px",
            height: "40px",
            border:
              dataSeat.SeatType.name === "Ghế VIP"
                ? "1.5px solid var(--mantine-color-green-4)"
                : "1.5px solid var(--mantine-color-blue-4)",
          },
        }}
        onChange={(e) => handlePickSeat(e)}
        size="xs"
        radius="md"
        color={dataSeat.SeatType.name === "Ghế VIP" ? "green" : "blue"}
        variant="filled"
        disabled={
          (dataOrdered && dataOrdered.isBooked === true) ||
          (isDisabledSeat && !preventDisabled)
            ? true
            : false
        }
      >
        <Text size="xs" ta={"center"}>
          {dataSeat.name}
        </Text>
      </Chip>
    </div>
  );
}

export default Seat;
