import { Chip, Text } from "@mantine/core";
import { useCallback, useState } from "react";

import { SeatStatus, SeatTS } from "../../types";
import { usePickSeatContext } from "../Provider/PickSeatProvider";
import NormalToast from "../AllToast/NormalToast";

type Props = {
  dataSeat: SeatTS;
  dataOrdered?: SeatStatus;
};

function Seat({ dataSeat, dataOrdered }: Props) {
  // console.log("dataSeat", dataSeat);
  const { seatSelected, setSeatSelected } = usePickSeatContext();

  const [isChecked, setIsChecked] = useState(false);

  const handlePickSeat = useCallback(
    (e: boolean) => {
      if (seatSelected.length > 7 && e == true) {
        return NormalToast({
          title: "Tối đa số ghế",
          message: "Bạn chỉ được đặt tối đa 8 ghế cho một lần",
          color: "orange",
        });
      }
      setIsChecked(e);
      if (e) {
        setSeatSelected([...seatSelected, dataSeat]);
      } else {
        const filterSeat = seatSelected.filter(
          (seat) => seat.id !== dataSeat.id
        );
        setSeatSelected(filterSeat);
      }
    },
    [dataSeat, seatSelected, setSeatSelected]
  );

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
                  ? `var(--mantine-color-violet-6)`
                  : `var(--mantine-color-${dataSeat.SeatType.color}-6)`
              }`,
              border: `${isChecked ? `4px solid rgb(241 241 241 / 81%)` : ""}`,
              boxShadow: `${
                isChecked
                  ? "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset"
                  : ""
              }`,
              scale: `${isChecked ? `1.1` : ``}`,
            },
          }}
          // onClick={() => {
          //   alert("xtest");
          // }}
          checked={isChecked}
          onChange={(e) => {
            handlePickSeat(e);
          }}
          radius="md"
          variant="filled"
          // disabled={isDisabledSeat && !preventDisabled ? true : false}
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
