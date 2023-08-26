import {
  createStyles,
  SegmentedControl,
  rem,
  Container,
  ActionIcon,
  Center,
  Box,
  Divider,
} from "@mantine/core";
import { AiFillFire } from "react-icons/ai";
import { BiRocket } from "react-icons/bi";
import { RiSlideshow2Line } from "react-icons/ri";

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    boxShadow: theme.shadows.md,
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[1]
    }`,
  },

  indicator: {
    backgroundImage: theme.fn.gradient({ from: "pink", to: "orange" }),
  },

  control: {
    border: "0 !important",
  },

  label: {
    "&, &:hover": {
      "&[data-active]": {
        color: theme.white,
      },
    },
  },
}));

export function StatusMovie() {
  const { classes } = useStyles();
  return (
    <Container size="lg" className="mt-16">
      {/* <Center>
        <SegmentedControl
          radius="xl"
          size="md"
          data={[
            {
              value: "nowShowing",
              label: (
                <Center>
                  <RiSlideshow2Line size="1.125rem" />
                  <Box ml={10}>Now Showing</Box>
                </Center>
              ),
            },
            {
              value: "comingSoon",
              label: (
                <Center>
                  <AiFillFire size="1.125rem" />
                  <Box ml={10}>Coming Soon</Box>
                </Center>
              ),
            },
          ]}
          classNames={classes}
        />
      </Center> */}

      <Divider
        size="sm"
        my="xs"
        label={
          <SegmentedControl
            radius="xl"
            size="md"
            data={[
              {
                value: "nowShowing",
                label: (
                  <Center>
                    <RiSlideshow2Line size="1.125rem" />
                    <Box ml={10}>Now Showing</Box>
                  </Center>
                ),
              },
              {
                value: "comingSoon",
                label: (
                  <Center>
                    <BiRocket size="1.125rem" />
                    <Box ml={10}>Coming Soon</Box>
                  </Center>
                ),
              },
            ]}
            classNames={classes}
          />
        }
        labelPosition="center"
        className={"sm:px-8 px-3"}
      />
    </Container>
  );
}
