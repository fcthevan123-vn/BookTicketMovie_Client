import { Grid, Paper, SimpleGrid, Text, Transition } from "@mantine/core";
import { Fragment, ReactElement, useEffect, useState } from "react";
import Seat from "./Seat";
import classes from "./LayoutSeat.module.css";
import { SeatOverView, SeatStatus } from "../../types";
import { usePickSeatContext } from "../Provider/PickSeatProvider";

type Props = {
  dataSeats: SeatOverView | null;
  dataSeatsPicked: SeatStatus[] | null;
};

function LayoutSeat({ dataSeats, dataSeatsPicked }: Props) {
  const seatMatrix = [];

  const { seatNumberControl, setIsDisabledSeat, seatSelected } =
    usePickSeatContext();
  const [isMount, setIsMount] = useState(false);

  function generateRowNames(rows: number) {
    const rowNames = [];
    const startCharCode = "A".charCodeAt(0);

    for (let i = 0; i < rows; i++) {
      const rowName = String.fromCharCode(startCharCode + i);
      rowNames.push(rowName);
    }

    return rowNames;
  }

  const rowsName =
    dataSeats && generateRowNames(dataSeats?.MovieHall.Layout.rows);

  // render seat matrix
  if (dataSeats) {
    for (let row = 1; row <= dataSeats.MovieHall.Layout.rows; row++) {
      const rowSeats = dataSeats?.MovieHall?.Layout?.Seats?.filter(
        (seat) => seat.rowNumber === row
      );
      const rowElements = [
        <p
          key={row - 1}
          className="flex w-full text-gray-400 justify-center items-center "
        >
          {rowsName ? rowsName[row - 1] : ""}
        </p>,
      ];

      for (
        let seatNumber = 1;
        seatNumber <= dataSeats.MovieHall.Layout.seatsPerRow;
        seatNumber++
      ) {
        const seat = rowSeats?.find((seat) => seat.seatNumber === seatNumber);
        const seatOrdered = dataSeatsPicked?.find(
          (seat) =>
            seat.isBooked === true &&
            seat.Seat.seatNumber === seatNumber &&
            seat.Seat.rowNumber === row
        );

        if (seatOrdered && seat) {
          rowElements.push(
            <Seat
              dataSeat={seatOrdered.Seat}
              key={seatOrdered.id}
              dataOrdered={seatOrdered}
            ></Seat>
          );
        } else if (!seatOrdered && seat) {
          rowElements.push(<Seat dataSeat={seat} key={seat.id}></Seat>);
        } else {
          rowElements.push(
            <div key={`empty-${row}-${seatNumber}`} className="empty-seat">
              Empty
            </div>
          );
        }
      }

      seatMatrix.push(<Fragment key={row}>{rowElements}</Fragment>);
    }
  }

  useEffect(() => {
    if (seatSelected.length >= parseInt(seatNumberControl)) {
      setIsDisabledSeat(true);
    } else {
      setIsDisabledSeat(false);
    }
  }, [seatNumberControl, seatSelected.length, setIsDisabledSeat]);

  useEffect(() => {
    setIsMount(true);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <Paper
        shadow="xs"
        radius="md"
        withBorder
        p="md"
        w={{ base: "90%", lg: "90%", xl: "80%" }}
        className="relative"
      >
        <div className="mb-5 flex flex-col items-center ">
          <div className={classes.screen}></div>
          <Text c={"dimmed"} size="xs" mt={"2px"}>
            Màn hình ở phía này
          </Text>
        </div>
        <Grid>
          <Grid.Col span={12}>
            <Transition
              mounted={isMount}
              transition="pop"
              duration={500}
              timingFunction="ease"
            >
              {(styles) => (
                <div style={styles}>
                  {dataSeats?.MovieHall.Layout.seatsPerRow && (
                    <SimpleGrid
                      cols={dataSeats?.MovieHall.Layout.seatsPerRow + 1}
                    >
                      {seatMatrix}
                    </SimpleGrid>
                  )}
                </div>
              )}
            </Transition>{" "}
          </Grid.Col>
        </Grid>
      </Paper>
    </div>
  );
}

export default LayoutSeat;
