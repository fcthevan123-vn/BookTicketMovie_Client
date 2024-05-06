import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { SeatOverView, SeatTS } from "../../../types";

type OrderFoodType = {
  menuFoodId: string;
  quantity: number;
  totalPrice: number;
  name: string;
  price: number;
};

type PickSeatContextType = {
  allPrice: {
    originalPrice: number;
    typeRoomPrice: number;
    totalPrice: number;
    originalTotalPrice: number;
  };
  foodSelected: OrderFoodType[];
  setFoodSelected: (dataTotal: OrderFoodType[]) => void;

  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  seatSelected: SeatTS[];
  setAllPrice: (value: {
    originalPrice: number;
    typeRoomPrice: number;
    totalPrice: number;
    originalTotalPrice: number;
  }) => void;
  dataTotal: SeatOverView | null;
  setDataTotal: (dataTotal: SeatOverView) => void;
  isDisabledSeat: boolean;
  setIsDisabledSeat: (value: boolean) => void;
  setSeatSelected: (seats: SeatTS[]) => void;
  seatNumberControl: string;
  setSeatNumberControl: (e: string) => void;
  discount: {
    percentDiscount: number;
    nameDiscount: string;
  };
  setDiscount: (value: {
    percentDiscount: number;
    nameDiscount: string;
  }) => void;
  paymentMethod: string;
  setPaymentMethod: (value: string) => void;
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
  const [seatNumberControl, setSeatNumberControl] = useState("8");
  const [allPrice, setAllPrice] = useState({
    originalPrice: 0,
    typeRoomPrice: 0,
    totalPrice: 0,
    originalTotalPrice: 0,
  });
  const [discount, setDiscount] = useState({
    percentDiscount: 0,
    nameDiscount: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [foodSelected, setFoodSelected] = useState<OrderFoodType[]>([]);

  const applyDiscount = useCallback(() => {
    if (discount.nameDiscount.length > 0) {
      const discountPrice =
        allPrice.totalPrice -
        (discount.percentDiscount * allPrice.totalPrice) / 100;

      setAllPrice((prev) => {
        return {
          ...prev,
          totalPrice: discountPrice,
        };
      });
    }
  }, [discount.nameDiscount.length, discount.percentDiscount]);

  // const applyFood = useCallback(() => {
  //   if (foodSelected.length > 0) {
  //     const sum = foodSelected.reduce(
  //       (partialSum, food) => partialSum + food.totalPrice,
  //       0
  //     );

  //     console.log("sum", sum);

  //     const foodPrice = allPrice.totalPrice + sum;

  //     setAllPrice((prev) => {
  //       return {
  //         ...prev,
  //         totalPrice: foodPrice,
  //       };
  //     });
  //   }
  // }, [foodSelected]);

  useEffect(() => {
    applyDiscount();
  }, [applyDiscount, discount]);

  useEffect(() => {
    setDiscount({
      percentDiscount: 0,
      nameDiscount: "",
    });
  }, [seatSelected]);

  return (
    <PickSeatContext.Provider
      value={{
        foodSelected,
        setFoodSelected,
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
        discount,
        setDiscount,
        paymentMethod,
        setPaymentMethod,
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
