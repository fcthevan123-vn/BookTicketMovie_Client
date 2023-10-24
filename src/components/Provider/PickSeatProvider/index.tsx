import React, { createContext, useContext, useState } from "react";
import { RoomType, SeatTS } from "../../../types";

type PickSeatContext = {
  seatSelected: SeatTS[];
  isDisabledSeat: boolean;
  dataRoom: RoomType | null;
  setDataRoom: (room: RoomType) => void;
  setIsDisabledSeat: (value: boolean) => void;
  setSeatSelected: (seats: SeatTS[]) => void;
  seatNumberControl: string;
  setSeatNumberControl: (e: string) => void;
};

const PickSeatContext = createContext<PickSeatContext | undefined>(undefined);

export function PickSeatProvider({ children }: { children: React.ReactNode }) {
  // Seats were selected by user but not yet paid
  const [seatSelected, setSeatSelected] = useState<SeatTS[]>([]);
  const [isDisabledSeat, setIsDisabledSeat] = useState(false);
  const [dataRoom, setDataRoom] = useState<RoomType | null>(null);

  const [seatNumberControl, setSeatNumberControl] = useState("1");

  return (
    <PickSeatContext.Provider
      value={{
        isDisabledSeat,
        setIsDisabledSeat,
        seatSelected,
        dataRoom,
        setDataRoom,
        setSeatSelected,
        seatNumberControl,
        setSeatNumberControl,
      }}
    >
      {children}
    </PickSeatContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const usePickSeatContext = () => {
  const context = useContext(PickSeatContext);
  if (context === undefined) {
    throw new Error(
      "usePickSeatContext must be used within a PickSeatProvider"
    );
  }
  return context;
};
