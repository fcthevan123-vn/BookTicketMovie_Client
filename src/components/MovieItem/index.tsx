import { Paper, Text, Title, Button, Rating, Box } from "@mantine/core";

import classes from "./MovieItem.module.css";

// const useStyles = createStyles((theme) => ({
//   card: {
//     height: rem(420),
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     [theme.fn.smallerThan("md")]: {
//       height: rem(350),
//     },

//     "&:hover": {
//       backdropFilter: "blur(12px)",
//     },
//   },

//   title: {
//     fontWeight: 900,
//     color: theme.white,
//     lineHeight: 1.2,
//     fontSize: rem(18),
//     marginTop: theme.spacing.xs,
//     [theme.fn.smallerThan("md")]: {
//       fontSize: rem(16),
//     },
//   },

//   category: {
//     color: theme.white,
//     opacity: 0.7,
//     fontWeight: 700,
//     textTransform: "uppercase",
//   },
// }));

interface Props {
  image: string;
  title: string;
  category: string;
}

const MotiveItem = ({ image, title, category }: Props) => {
  return (
    <Box
      style={{
        overflow: "hidden",
        borderRadius: "var(--mantine-radius-md)",
      }}
    >
      <Paper
        style={{
          backgroundImage: `url(${image})`,
        }}
        shadow="md"
        p="xl"
        radius="md"
        className={classes.card}
      >
        <div className="backdrop-blur-sm bg-black/10 py-10 px-5 h-full w-full absolute top-0 left-0 right-0">
          <div>
            <Text className={classes.category} size="xs">
              {category}
            </Text>
            <Title order={3} className={classes.title}>
              {title}
            </Title>
            <Rating
              className="mt-2"
              size="xs"
              value={4}
              fractions={1}
              readOnly
            />
          </div>
          <Button variant="white" radius="lg" color="dark">
            Đặt ngay
          </Button>
        </div>
      </Paper>
    </Box>
  );
};

export default MotiveItem;
