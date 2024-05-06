import React, { useCallback, useEffect, useMemo, useState } from "react";
import { usePickSeatContext } from "../Provider/PickSeatProvider";
import { foodServices } from "../../services";
import FoodCard from "./FoodCard";
import { MenuFoodTS } from "../../types";
import { Text } from "@mantine/core";

type Props = {};

function SelectNackAndDrink({}: Props) {
  const { dataTotal } = usePickSeatContext();
  const [dataFood, setDataFood] = useState<MenuFoodTS[]>();

  const getFood = useCallback(async () => {
    try {
      const res = await foodServices.getFood("open");

      setDataFood(res.data);
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  const items = useMemo(() => {
    if (dataFood && dataFood.length > 0) {
      return dataFood.map((item) => (
        <FoodCard key={item.id} data={item}></FoodCard>
      ));
    } else {
      return <Text ta={"center"}>Không tìm thấy dữ liệu </Text>;
    }
  }, [dataFood]);

  useEffect(() => {
    getFood();
  }, [getFood]);

  return <div className="grid grid-cols-4 gap-8">{items}</div>;
}

export default SelectNackAndDrink;
