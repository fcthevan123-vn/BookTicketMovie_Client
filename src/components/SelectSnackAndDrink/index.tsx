import {
  UnstyledButton,
  Checkbox,
  Text,
  Image,
  SimpleGrid,
} from "@mantine/core";
import { useUncontrolled } from "@mantine/hooks";
import snackImg from "../../assets/Image/snack.png";
import classes from "./SelectSnackAndDrink.module.css";

interface ImageCheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?(checked: boolean): void;
  title: string;
  description: string;
  image: string;
}

const icons = {
  sea: snackImg,
  city: snackImg,
  mountain: snackImg,
  winter: snackImg,
};

export function ImageCheckbox({
  checked,
  defaultChecked,
  onChange,
  title,
  description,
  className,
  image,
  ...others
}: ImageCheckboxProps &
  Omit<React.ComponentPropsWithoutRef<"button">, keyof ImageCheckboxProps>) {
  const [value, handleChange] = useUncontrolled({
    value: checked,
    defaultValue: defaultChecked,
    finalValue: false,
    onChange,
  });

  return (
    <UnstyledButton
      {...others}
      onClick={() => handleChange(!value)}
      data-checked={value || undefined}
      className={classes.button}
    >
      <Image src={image} alt={title} width={40} height={40} />

      <div className={classes.body}>
        <Text c="dimmed" size="xs" lh={1} mb={5}>
          {description}
        </Text>
        <Text fw={500} size="sm" lh={1}>
          {title}
        </Text>
      </div>

      <Checkbox
        checked={value}
        onChange={() => {}}
        tabIndex={-1}
        styles={{ input: { cursor: "pointer" } }}
      />
    </UnstyledButton>
  );
}

const mockdata = [
  { description: "Bỏng ngô", title: "10.000 VND", image: icons.sea },
  { description: "7 Up", title: "20.000 VND", image: icons.city },
  { description: "Pepsi", title: "20.000 VND", image: icons.mountain },
  { description: "Couple Combo", title: "50.000 VND", image: icons.mountain },
];

export function SelectNackAndDrink() {
  const items = mockdata.map((item) => (
    <ImageCheckbox {...item} key={item.title} />
  ));
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 2 }} w={"100%"}>
      {items}
    </SimpleGrid>
  );
}
