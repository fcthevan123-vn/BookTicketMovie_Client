import {
  ActionIcon,
  Container,
  Select,
  TextInput,
  TextInputProps,
  rem,
} from "@mantine/core";

import {
  IconAdjustments,
  IconArrowRight,
  IconSearch,
} from "@tabler/icons-react";
import ListMovie from "./ListMovie";
import { useCallback, useEffect, useState } from "react";
import { movieServices } from "../../services";

function MoviePage(props: TextInputProps) {
  const [allMovies, setAllMovies] = useState();
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  const getAllMovies = useCallback(async () => {
    try {
      const res = await movieServices.getLimitMovie({ page: 1, limit: 50 });
      if (res.statusCode === 0) {
        setAllMovies(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getAllMovies();
  }, [getAllMovies]);

  return (
    <Container fluid mt={"lg"}>
      <div className="flex items-center w-full gap-3 justify-between px-4 rounded-xl py-2">
        <ActionIcon variant="light" size="xl" radius="lg" aria-label="Settings">
          <IconAdjustments
            style={{ width: "70%", height: "70%" }}
            stroke={1.5}
          />
        </ActionIcon>

        <TextInput
          className="grow"
          radius="lg"
          size="md"
          placeholder="Tìm tên phim"
          rightSectionWidth={42}
          leftSection={
            <IconSearch
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          }
          rightSection={
            <ActionIcon size={32} radius="xl" color={"blue"} variant="filled">
              <IconArrowRight
                style={{ width: rem(18), height: rem(18) }}
                stroke={1.5}
              />
            </ActionIcon>
          }
          {...props}
        />

        <Select
          radius={"lg"}
          size="md"
          placeholder="Bộ lọc"
          data={["Phim 1", "Phim 2", "Phim 3", "Phim 4"]}
        />
      </div>
      <div>{allMovies && <ListMovie dataMovies={allMovies}></ListMovie>}</div>
    </Container>
  );
}

export default MoviePage;
