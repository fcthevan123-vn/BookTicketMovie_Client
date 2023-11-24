import { Box, Container, Grid, Paper, SimpleGrid, Text } from "@mantine/core";
import React, { Fragment, useEffect } from "react";
import Seat from "./Seat";
import classes from "./LayoutSeat.module.css";
import { SeatOverView, SeatStatus, SeatTS } from "../../types";
import { usePickSeatContext } from "../Provider/PickSeatProvider";

type Props = {
  dataSeats: SeatOverView | null;
  dataSeatsPicked: SeatStatus[] | null;
};

function LayoutSeat({ dataSeats, dataSeatsPicked }: Props) {
  const seatMatrix = [];

  const {
    seatNumberControl,
    isDisabledSeat,
    setIsDisabledSeat,
    seatSelected,
    setSeatSelected,
  } = usePickSeatContext();

  if (dataSeats) {
    for (let row = 1; row <= dataSeats.MovieHall.Layout.rows; row++) {
      const rowSeats = dataSeats.MovieHall.Layout.Seats.filter(
        (seat) => seat.rowNumber === row
      );
      const rowElements = [];

      for (
        let seatNumber = 1;
        seatNumber <= dataSeats.MovieHall.Layout.seatsPerRow;
        seatNumber++
      ) {
        const seat = rowSeats.find((seat) => seat.seatNumber === seatNumber);
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

  useEffect(() => {
    if (seatSelected.length >= parseInt(seatNumberControl)) {
      setIsDisabledSeat(true);
    } else {
      setIsDisabledSeat(false);
    }
  }, [seatNumberControl, seatSelected.length, setIsDisabledSeat]);

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <Paper
        shadow="xs"
        radius="md"
        withBorder
        p="xl"
        style={{
          width: "700px",
        }}
      >
        <Grid>
          <Grid.Col span={1}>
            {rowsName?.map((name, index) => (
              <Box
                key={index}
                h={"54.5px"}
                className="flex items-center justify-start"
              >
                <Text c={"dimmed"} size="lg">
                  {name}
                </Text>
              </Box>
            ))}
          </Grid.Col>
          <Grid.Col span={11}>
            <SimpleGrid cols={dataSeats?.MovieHall.Layout.seatsPerRow}>
              {seatMatrix}
            </SimpleGrid>
          </Grid.Col>
        </Grid>

        {/* <SimpleGrid
            cols={dataSeats?.MovieHall.Layout.seatsPerRow}
            spacing={"xs"}
          >
            {renderSeat}
          </SimpleGrid> */}

        <div className="mt-10 flex flex-col items-center">
          <div className={classes.screen}></div>
          <Text c={"dimmed"} size="sm">
            Màn hình ở phía này
          </Text>
        </div>
      </Paper>
    </div>
  );
}

export default LayoutSeat;
