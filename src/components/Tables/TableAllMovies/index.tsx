import { useEffect, useState } from "react";
import {
  createStyles,
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  rem,
  LoadingOverlay,
  Tooltip,
  Button,
  Box,
} from "@mantine/core";
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";
import ModalDetailMovie from "../../Modals/ModalDetailMovie";

const useStyles = createStyles((theme) => ({
  th: {
    padding: "0 !important",
  },

  control: {
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  icon: {
    width: rem(21),
    height: rem(21),
    borderRadius: rem(21),
  },
}));

interface RowData {
  id: string;
  title: string;
  description: string;
  directors: string[];
  actors: string[];
  language: string;
  country: string;
  subtitle: string;
  releaseDate: string;
  endDate: string;
  images: { imageName: string; imageUrl: string }[];
  genre: string[];
  duration: string;
  ageRequire: string;
  price: string;
  countBooked: number;
  createdAt: string;
  updatedAt: string;
}

interface TableAllMoviesProps {
  data: RowData[];
  isLoading: boolean;
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const { classes } = useStyles();
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position="apart">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size="0.9rem" stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  );
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return data;
  }

  return [...data].sort((a, b) => {
    if (payload.reversed) {
      return b[sortBy].localeCompare(a[sortBy]);
    }

    return a[sortBy].localeCompare(b[sortBy]);
  });
}

export function TableAllMovies({ data, isLoading }: TableAllMoviesProps) {
  const [sortedData, setSortedData] = useState<RowData[]>([]);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const { classes } = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const [movieToView, setMovieToView] = useState<RowData>();

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed }));
  };

  const rows = sortedData.map((row) => (
    <tr key={row.title}>
      <td>{row.title}</td>
      <td>{Intl.NumberFormat("vi-VN").format(parseInt(row.price)) + " VND"}</td>

      <td>
        <Tooltip position="top-start" label={row.directors?.join("-")}>
          <Text truncate>
            <span> {row.directors?.join("-")}</span>
          </Text>
        </Tooltip>
      </td>
      <td>
        <Tooltip position="top-start" label={row.actors?.join("-")}>
          <Text truncate>
            <span> {row.actors?.join("-")}</span>
          </Text>
        </Tooltip>
      </td>
      <td>
        <Tooltip position="top-start" label={row.genre?.join("-")}>
          <Text truncate>
            <span> {row.genre?.join("-")}</span>
          </Text>
        </Tooltip>
      </td>
      <td>{row.language}</td>
      <td>
        <Text truncate>
          <span>{row.description}</span>
        </Text>
      </td>
      <td>
        <Group position="center">
          <Button
            radius="lg"
            size="xs"
            compact
            onClick={() => {
              setMovieToView(row);
              setOpenModal(true);
            }}
          >
            Sửa <IconEdit className="mb-1 ms-1" size="1rem"></IconEdit>
          </Button>
          <Button color="red" radius="lg" size="xs" compact>
            Xoá <IconTrash className="mb-1 ms-1" size="1rem"></IconTrash>
          </Button>
        </Group>
      </td>
    </tr>
  ));

  useEffect(() => {
    setSortedData(data);
  }, [data]);

  return (
    <ScrollArea>
      {movieToView && (
        <ModalDetailMovie
          opened={openModal}
          onClose={() => setOpenModal(false)}
          dataMovie={movieToView}
        ></ModalDetailMovie>
      )}

      <Box>
        <LoadingOverlay visible={isLoading} overlayBlur={2} />
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <Table
            striped
            horizontalSpacing="md"
            verticalSpacing="xs"
            sx={{ tableLayout: "fixed" }}
          >
            <thead>
              <tr>
                <Th
                  sorted={sortBy === "title"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("title")}
                >
                  Tên phim
                </Th>
                <Th
                  sorted={sortBy === "price"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("price")}
                >
                  Giá
                </Th>

                <th className={classes.th}>
                  <UnstyledButton className={classes.control}>
                    <Group position="apart">
                      <Text fw={500} fz="sm">
                        Đạo diễn
                      </Text>
                    </Group>
                  </UnstyledButton>
                </th>

                <th className={classes.th}>
                  <UnstyledButton className={classes.control}>
                    <Group position="apart">
                      <Text fw={500} fz="sm">
                        Diễn viên
                      </Text>
                    </Group>
                  </UnstyledButton>
                </th>

                <th className={classes.th}>
                  <UnstyledButton className={classes.control}>
                    <Group position="apart">
                      <Text fw={500} fz="sm">
                        Thể loại
                      </Text>
                    </Group>
                  </UnstyledButton>
                </th>

                <th className={classes.th}>
                  <UnstyledButton className={classes.control}>
                    <Group position="apart">
                      <Text fw={500} fz="sm">
                        Ngôn ngữ
                      </Text>
                    </Group>
                  </UnstyledButton>
                </th>

                <th className={classes.th}>
                  <UnstyledButton className={classes.control}>
                    <Group position="apart">
                      <Text fw={500} fz="sm">
                        Mô tả
                      </Text>
                    </Group>
                  </UnstyledButton>
                </th>

                <th className={classes.th}>
                  <UnstyledButton className={classes.control}>
                    <Group position="apart">
                      <Text fw={500} fz="sm">
                        #
                      </Text>
                    </Group>
                  </UnstyledButton>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.length > 0 ? (
                rows
              ) : (
                <tr>
                  <td colSpan={Object.keys(data[0]).length}>
                    <Text weight={500} align="center">
                      Nothing found
                    </Text>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Box>
    </ScrollArea>
  );
}
