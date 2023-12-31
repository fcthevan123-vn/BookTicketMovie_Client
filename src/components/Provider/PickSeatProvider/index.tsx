import React, { createContext, useContext, useState } from "react";
import { SeatOverView, SeatTS } from "../../../types";

type PickSeatContextType = {
  allPrice: {
    originalPrice: number;
    vatPrice: number;
    typeRoomPrice: number;
    totalPrice: number;
  };
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  seatSelected: SeatTS[];
  setAllPrice: (value: {
    originalPrice: number;
    vatPrice: number;
    typeRoomPrice: number;
    totalPrice: number;
  }) => void;
  dataTotal: SeatOverView | null;
  setDataTotal: (dataTotal: SeatOverView) => void;
  isDisabledSeat: boolean;
  setIsDisabledSeat: (value: boolean) => void;
  setSeatSelected: (seats: SeatTS[]) => void;
  seatNumberControl: string;
  setSeatNumberControl: (e: string) => void;
};

const PickSeatContext = createContext<PickSeatContextType | undefined>(
  undefined
);

export function PickSeatProvider({ children }: { children: React.ReactNode }) {
  // Seats were selected by user but not yet paid
  const [seatSelected, setSeatSelected] = useState<SeatTS[]>([]);
  const [isDisabledSeat, setIsDisabledSeat] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataTotal, setDataTotal] = useState<SeatOverView | null>(null);
  // const [dataShow]
  const [seatNumberControl, setSeatNumberControl] = useState("1");
  const [allPrice, setAllPrice] = useState({
    originalPrice: 0,
    vatPrice: 0,
    typeRoomPrice: 0,
    totalPrice: 0,
  });

  return (
    <PickSeatContext.Provider
      value={{
        dataTotal,
        setDataTotal,
        isDisabledSeat,
        allPrice,
        isLoading,
        setIsLoading,
        setAllPrice,
        setIsDisabledSeat,
        seatSelected,
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
