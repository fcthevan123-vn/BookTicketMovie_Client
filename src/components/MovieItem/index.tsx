import {
  createStyles,
  Paper,
  Text,
  Title,
  Button,
  rem,
  Group,
  Rating,
  Box,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    height: rem(420),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundSize: "cover",
    backgroundPosition: "center",
    [theme.fn.smallerThan("md")]: {
      height: rem(350),
    },

    "&:hover": {
      backdropFilter: "blur(12px)",
    },
  },

  title: {
    fontWeight: 900,
    color: theme.white,
    lineHeight: 1.2,
    fontSize: rem(18),
    marginTop: theme.spacing.xs,
    [theme.fn.smallerThan("md")]: {
      fontSize: rem(16),
    },
  },

  category: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: "uppercase",
  },
}));

interface Props {
  image: string;
  title: string;
  category: string;
}

const MotiveItem = ({ image, title, category }: Props) => {
  const { classes } = useStyles();

  return (
    <Box>
      <Paper
        sx={{ backgroundImage: `url(${image})` }}
        shadow="md"
        p="xl"
        radius="md"
        className={classes.card}
      >
        <div className="">
          <Text className={classes.category} size="xs">
            {category}
          </Text>
          <Title order={3} className={classes.title}>
            {title}
          </Title>
          <Rating className="mt-2" size="xs" value={4} fractions={1} readOnly />
          {/* <Group position="center">
        </Group> */}
        </div>
        <Button variant="white" radius="lg" color="dark">
          Book Now
        </Button>
      </Paper>
    </Box>
  );
};

export default MotiveItem;
