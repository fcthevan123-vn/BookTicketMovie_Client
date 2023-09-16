import { useState, useEffect, useCallback, useRef } from "react";
import { TableAllMovies } from "../../../components/Tables/TableAllMovies";
import { Pagination, Text, TextInput } from "@mantine/core";
import { movieServices } from "../../../services";
import { IconSearch, IconX } from "@tabler/icons-react";
import { useDebouncedValue } from "@mantine/hooks";
import { useMountEffect } from "../../../hooks";

type DataTableProps = {
  images: string[];
  ageRequire: string;
  duration: string;
  subtitle: string;
  releaseDate: string;
  endDate: string;
  id: string;
  title: string;
  description: string;
  price: string;
  actors: string[];
  country: string;
  directors: string[];
  genre: string[];
  language: string;
};

const UseFocus = () => {
  const htmlElRef = useRef<HTMLInputElement | null>(null);
  const setFocus = () => {
    htmlElRef.current && htmlElRef.current.focus();
  };

  return [htmlElRef, setFocus];
};

function AllMoviesPage() {
  const [activePage, setPage] = useState(1);
  const [totalPagination, setTotalPagination] = useState(1);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [valueSearch, setValueSearch] = useState("");
  const [debouncedSearch] = useDebouncedValue(valueSearch, 500);
  const [searchInputRef, setSearchInputRef] = UseFocus();

  useMountEffect(() => setSearchInputRef);

  const getLimitMovies = useCallback(async (atPage: number) => {
    setIsLoading(true);
    try {
      const res = await movieServices.getLimitMovie({
        page: atPage,
        limit: 10,
      });
      if (res.statusCode === 0) {
        const dataConvert = res.data.map(
          (movie: { price: { toString: () => unknown } }) => ({
            ...movie,
            price: movie.price.toString(),
          })
        );
        setTotalPagination(
          (res.rows / 10) % 1 === 0 ? res.rows / 10 : res.rows / 10 + 1
        );
        setData(dataConvert);
        setIsLoading(false);
      }
    } catch (error) {
      return error;
    }
  }, []);

  const searchMoviesByTitle = useCallback(
    async (title: string, page: number) => {
      setIsLoading(true);
      try {
        const res = await movieServices.searchMoviesByTitle({
          title,
          page,
          limit: 10,
        });
        if (res.statusCode === 0 && res.rows > 0) {
          const dataConvert = res.data.map((movie: DataTableProps) => {
            return {
              id: movie.id,
              title: movie?.title,
              description: movie?.description,
              price: movie?.price.toString(),
              directors: movie?.directors,
              actors: movie?.actors,
              language: movie?.language,
              genre: movie?.genre,
              country: movie?.country,
              releaseDate: movie?.releaseDate,
              endDate: movie?.endDate,
              ageRequire: movie?.ageRequire,
              duration: movie?.duration,
              subtitle: movie?.subtitle,
              images: movie?.images,
            };
          });
          setTotalPagination(
            (res.rows / 10) % 1 === 0 ? res.rows / 10 : res.rows / 10 + 1
          );
          setData(dataConvert);
          setIsLoading(false);
        } else {
          setTotalPagination(1);
          setData([]);
          setIsLoading(false);
        }
      } catch (error) {
        return error;
      }
    },
    []
  );

  useEffect(() => {
    if (debouncedSearch.length > 0) {
      searchMoviesByTitle(debouncedSearch, activePage);
    } else {
      getLimitMovies(activePage);
    }
  }, [activePage, debouncedSearch, getLimitMovies, searchMoviesByTitle]);

  return (
    <div className="flex flex-col py-5 gap-2 justify-center items-center">
      <TextInput
        ref={searchInputRef}
        rightSection={
          <IconX
            size="1rem"
            className="text-gray-400 cursor-pointer"
            onClick={() => setValueSearch("")}
          ></IconX>
        }
        type="text"
        w={"50%"}
        placeholder="Tìm tên phim"
        radius="lg"
        disabled={isLoading}
        value={valueSearch}
        onChange={(event) => setValueSearch(event.currentTarget.value)}
        icon={<IconSearch size="0.9rem" stroke={1.5} />}
      />

      <div className="p-5 ">
        {data.length > 0 ? (
          <TableAllMovies data={data} isLoading={isLoading}></TableAllMovies>
        ) : (
          <Text>
            <span>Không có phim nào được tìm thấy...</span>
          </Text>
        )}
      </div>
      <div>
        <Pagination
          disabled={isLoading}
          radius="md"
          value={activePage}
          withEdges
          onChange={setPage}
          total={totalPagination}
        />
      </div>
    </div>
  );
}

export default AllMoviesPage;
