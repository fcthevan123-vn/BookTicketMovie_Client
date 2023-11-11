import { useEffect, useState } from "react";
import {
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  LoadingOverlay,
  Tooltip,
  Button,
} from "@mantine/core";
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";
import ModalDetailMovie from "../../Modals/ModalDetailMovie";
import classes from "./TableAllMovies.module.css";
import moment from "moment";
import { modals } from "@mantine/modals";
import { movieServices } from "../../../services";
import { loadingApi } from "../../../untils/loadingApi";
import { useMovie } from "../../Provider/MovieProvider/MovieProvider";

interface RowData {
  stt?: number;
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
  createdAt?: string;
  updatedAt?: string;
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
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
  return (
    <UnstyledButton onClick={onSort} className={classes.control}>
      <Group justify="apart">
        <Text ta="center" fw={500} fz="sm">
          {children}
        </Text>
        <Center className={classes.icon}>
          <Icon size="0.9rem" stroke={1.5} />
        </Center>
      </Group>
    </UnstyledButton>
  );
}

// function sortData(
//   data: RowData[],
//   payload: { sortBy: keyof RowData | null; reversed: boolean }
// ) {
//   const { sortBy } = payload;

//   if (!sortBy) {
//     return data;
//   }

//   return [...data].sort((a, b) => {
//     if (payload.reversed) {
//       return String(b[sortBy]).localeCompare(String(a[sortBy]));
//     }

//     return String(a[sortBy]).localeCompare(String(b[sortBy]));
//   });
// }

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return data;
  }

  return [...data].sort((a, b) => {
    const valueA = a[sortBy];
    const valueB = b[sortBy];

    if (typeof valueA === "number" && typeof valueB === "number") {
      if (payload.reversed) {
        return valueB - valueA;
      }
      return valueA - valueB;
    }

    if (payload.reversed) {
      return String(valueB).localeCompare(String(valueA));
    }

    return String(valueA).localeCompare(String(valueB));
  });
}

export function TableAllMovies({ data, isLoading }: TableAllMoviesProps) {
  const [sortedData, setSortedData] = useState<RowData[]>([]);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [movieToView, setMovieToView] = useState<RowData>();
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const { activePage, getLimitMovies } = useMovie();

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed }));
  };

  const modalDeleteMovie = (id: string) =>
    modals.openConfirmModal({
      title: (
        <Text c={"red"} fw={"bold"}>
          Xoá phim
        </Text>
      ),
      children: <Text size="sm">Bạn có chắc chắn xoá phim này vĩnh viễn?</Text>,
      centered: true,
      confirmProps: {
        color: "red",
        radius: "md",
        size: "xs",
        loading: isLoadingDelete,
      },
      cancelProps: {
        radius: "md",
        size: "xs",
      },
      lockScroll: false,
      radius: "lg",
      labels: {
        confirm: "Đồng ý",
        cancel: "Huỷ",
      },
      onConfirm: () => handleDeleteMovie(id),
    });

  async function handleDeleteMovie(id: string) {
    setIsLoadingDelete(true);
    const api = movieServices.deleteMovie({ id });
    const res = await loadingApi(api, "Xoá phim");
    if (res === true) {
      getLimitMovies(activePage);
    }
    setIsLoadingDelete(false);
    return res;
  }

  const rows = sortedData.map((row) => (
    <Table.Tr key={row.title}>
      <Table.Td>
        <Text ta="center">{row.stt}</Text>
      </Table.Td>
      <Table.Td>
        <Text ta="center">{row.title}</Text>
      </Table.Td>

      <Table.Td>
        <Tooltip position="top-start" label={row.directors?.join("-")}>
          <Text ta="center" w={"120px"} truncate="end">
            <span> {row.directors?.join("-")}</span>
          </Text>
        </Tooltip>
      </Table.Td>
      <Table.Td>
        <Tooltip position="top-start" label={row.actors?.join("-")}>
          <Text ta="center" w={"120px"} truncate="end">
            <span> {row.actors?.join("-")}</span>
          </Text>
        </Tooltip>
      </Table.Td>
      <Table.Td>
        <Tooltip position="top-start" label={row.genre?.join("-")}>
          <Text ta="center" w={"120px"} truncate="end">
            <span> {row.genre?.join("-")}</span>
          </Text>
        </Tooltip>
      </Table.Td>
      <Table.Td>
        <Text ta="center">{moment(row.releaseDate).format("LL")}</Text>
      </Table.Td>
      <Table.Td>
        <Text ta="center">{row.language}</Text>
      </Table.Td>
      <Table.Td>
        <Text ta="center" w={"120px"} truncate="end">
          <span>{row.description}</span>
        </Text>
      </Table.Td>
      <Table.Td>
        <Group justify="center">
          <Button
            radius="lg"
            size="compact-xs"
            onClick={() => {
              setMovieToView(row);
              setOpenModal(true);
            }}
          >
            Sửa <IconEdit className="mb-1 ms-1" size="1rem"></IconEdit>
          </Button>
          <Button
            color="red"
            radius="lg"
            size="compact-xs"
            onClick={() => modalDeleteMovie(row.id)}
          >
            Xoá <IconTrash className="mb-1 ms-1" size="1rem"></IconTrash>
          </Button>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  useEffect(() => {
    setSortedData(data);
  }, [data]);

  return (
    <>
      <ScrollArea type="auto" className={classes.scrollArea}>
        {movieToView && (
          <ModalDetailMovie
            opened={openModal}
            onClose={() => setOpenModal(false)}
            dataMovie={movieToView}
          ></ModalDetailMovie>
        )}

        <LoadingOverlay visible={isLoading} overlayProps={{ blur: 3 }} />
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <Table verticalSpacing={"sm"} w={"100%"}>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>
                  <Th
                    sorted={sortBy === "stt"}
                    reversed={reverseSortDirection}
                    onSort={() => setSorting("stt")}
                  >
                    STT
                  </Th>
                </Table.Th>
                <Table.Th>
                  <Th
                    sorted={sortBy === "title"}
                    reversed={reverseSortDirection}
                    onSort={() => setSorting("title")}
                  >
                    Tên phim
                  </Th>
                </Table.Th>

                <Table.Th>
                  <UnstyledButton className={classes.control}>
                    <Group justify="apart">
                      <Text ta="center" fw={500} fz="sm">
                        Đạo diễn
                      </Text>
                    </Group>
                  </UnstyledButton>
                </Table.Th>

                <Table.Th>
                  <UnstyledButton className={classes.control}>
                    <Group justify="apart">
                      <Text ta="center" fw={500} fz="sm">
                        Diễn viên
                      </Text>
                    </Group>
                  </UnstyledButton>
                </Table.Th>

                <Table.Th>
                  <UnstyledButton className={classes.control}>
                    <Group justify="apart">
                      <Text ta="center" fw={500} fz="sm">
                        Thể loại
                      </Text>
                    </Group>
                  </UnstyledButton>
                </Table.Th>

                <Table.Th>
                  <UnstyledButton className={classes.control}>
                    <Group justify="apart">
                      <Text ta="center" fw={500} fz="sm">
                        Ngày phát hành
                      </Text>
                    </Group>
                  </UnstyledButton>
                </Table.Th>

                <Table.Th>
                  <UnstyledButton className={classes.control}>
                    <Group justify="apart">
                      <Text ta="center" fw={500} fz="sm">
                        Ngôn ngữ
                      </Text>
                    </Group>
                  </UnstyledButton>
                </Table.Th>

                <Table.Th>
                  <UnstyledButton className={classes.control}>
                    <Group justify="apart">
                      <Text ta="center" fw={500} fz="sm">
                        Mô tả
                      </Text>
                    </Group>
                  </UnstyledButton>
                </Table.Th>

                <Table.Th>
                  <UnstyledButton className={classes.control}>
                    <Group justify="apart">
                      <Text ta="center" fw={500} fz="sm">
                        Chỉnh sửa
                      </Text>
                    </Group>
                  </UnstyledButton>
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </div>
      </ScrollArea>
    </>
  );
}
