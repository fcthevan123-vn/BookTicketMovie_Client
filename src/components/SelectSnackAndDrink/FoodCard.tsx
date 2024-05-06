import { Card, Group, NumberFormatter, NumberInput, Text } from "@mantine/core";
import { MenuFoodTS } from "../../types";
import { PreviewImages } from "../PreviewImage";
import { usePickSeatContext } from "../Provider/PickSeatProvider";
import { useCallback, useEffect, useState } from "react";

type Props = {
  data: MenuFoodTS;
};

function FoodCard({ data }: Props) {
  const { dataTotal, foodSelected, setFoodSelected } = usePickSeatContext();
  const [price, setPrice] = useState<number>();

  function handleSetValue(e: number, dataFood: MenuFoodTS) {
    // setPrice(e as number);
    const filterFood = foodSelected.filter(
      (food) => food.menuFoodId != dataFood.id
    );

    const dataPass = {
      menuFoodId: dataFood.id as string,
      quantity: e,
      totalPrice: e * dataFood.price,
      price: dataFood.price,
      name: dataFood.name,
    };

    const dataPass2 = filterFood.concat(dataPass);

    setFoodSelected(dataPass2);
  }

  const reSetValue = useCallback(
    (dataFood: MenuFoodTS) => {
      const filterFood = foodSelected.filter(
        (food) => food.menuFoodId === dataFood.id
      );

      if (filterFood.length > 0) {
        console.log("filterFood", filterFood);

        setPrice(foodSelected[0].quantity);
      }
    },
    [foodSelected]
  );

  //   useEffect(() => {
  //     handleSetValue(price as number, data);
  //   }, [data, price]);

  useEffect(() => {
    reSetValue(data);
  }, [data, reSetValue]);

  return (
    <div>
      <Card shadow="sm" padding="sm" radius="md" withBorder>
        <Card.Section>
          <PreviewImages
            img={data.image}
            width={"auto"}
            height={160}
          ></PreviewImages>
        </Card.Section>

        <Group justify="space-between" mt="md" mb="xs">
          <Text size="sm" fw={500}>
            {data.name}
          </Text>
          <Text size="sm" c="dimmed">
            <NumberFormatter
              thousandSeparator
              value={data.price}
              suffix=" VND"
            />
          </Text>
        </Group>

        {(price as number) > 0 && (
          <Text size="xs" mb={"xs"} c="dimmed">
            x {price}
            {" | "}
            <NumberFormatter
              thousandSeparator
              value={data.price * (price as number)}
              suffix=" VND"
            />
          </Text>
        )}

        <NumberInput
          size="xs"
          radius={"md"}
          min={0}
          clampBehavior="strict"
          max={20}
          //   value={price}
          onChange={(e) => {
            handleSetValue(e as number, data);
          }}
          placeholder="Nhập số lượng"
        />
      </Card>
    </div>
  );
}

export default FoodCard;
