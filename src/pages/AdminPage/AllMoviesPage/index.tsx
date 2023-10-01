import { useState, useEffect, useCallback, useRef } from "react";
import { TableAllMovies } from "../../../components/Tables/TableAllMovies";
import { Pagination, Select, Text, TextInput } from "@mantine/core";
import { movieServices } from "../../../services";
import { IconSearch, IconX } from "@tabler/icons-react";
import { useDebouncedValue, useElementSize } from "@mantine/hooks";
import { useMountEffect } from "../../../hooks";
import { useMovie } from "../../../components/Provider/MovieProvider/MovieProvider";

type DataTableProps = {
  images: { imageName: string; imageUrl: string }[];
  ageRequire: string;
  duration: string;
  subtitle: string;
  releaseDate: string;
  endDate: string;
  id: string;
  title: string;
  description: string;
  price: number;
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
  const [valueSearch, setValueSearch] = useState("");
  const [debouncedSearch] = useDebouncedValue(valueSearch, 500);
  const [searchInputRef, setSearchInputRef] = UseFocus();

  const { ref, width, height } = useElementSize();

  const {
    setLimitRow,
    isLoading,
    data,
    activePage,
    setActivePage,
    totalPagination,
    setTotalPagination,
    getLimitMovies,
    setData,
    setIsLoading,
  } = useMovie();

  useMountEffect(() => setSearchInputRef);

  const searchMoviesByTitle = useCallback(
    async (title: string, page: number) => {
      setIsLoading(true);
      try {
        const res = await movieServices.searchMoviesByTitle({
          title,
          page,
          limit: 10,
        });
        if (res.statusCode === 0) {
          const dataConvert = res.data.map(
            (movie: DataTableProps, index: number) => {
              return {
                stt: index + 1 + (activePage - 1) * 10,
                ...movie,
              };
            }
          );
          const totalResults = res.rows;
          const totalPages = Math.ceil(totalResults / 10);
          const safeTotalResults = Math.max(totalPages, 1); // Tính tổng số trang
          setTotalPagination(safeTotalResults);
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
    [activePage, setData, setIsLoading, setTotalPagination]
  );

  useEffect(() => {
    if (debouncedSearch.length > 0) {
      // Nếu đang ở trang lớn hơn tổng số trang hiện có, hãy điều chỉnh activePage
      if (activePage > totalPagination) {
        searchMoviesByTitle(debouncedSearch, totalPagination);
      } else {
        searchMoviesByTitle(debouncedSearch, activePage);
      }
    } else {
      getLimitMovies(activePage);
    }
  }, [
    activePage,
    debouncedSearch,
    getLimitMovies,
    searchMoviesByTitle,
    totalPagination,
  ]);

  return (
    <div
      className="flex flex-col py-5 gap-2 justify-center items-center"
      ref={ref}
    >
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
        leftSection={<IconSearch size="0.9rem" stroke={1.5} />}
      />
      <div
        className="p-5"
        style={{
          maxWidth: width,
        }}
      >
        {data.length > 0 ? (
          <>
            <TableAllMovies data={data} isLoading={isLoading}></TableAllMovies>
          </>
        ) : (
          <Text>
            <span>Không có phim nào được tìm thấy...</span>
          </Text>
        )}
      </div>
      <div className="flex justify-center items-center w-full px-6 gap-28">
        <div>
          <Text mb={"4px"} size="sm">
            Trang hiện tại
          </Text>
          <Pagination
            disabled={isLoading}
            radius="md"
            value={activePage}
            withEdges
            onChange={setActivePage}
            total={totalPagination}
          />
        </div>
        <div className="flex-none">
          <Text mb={"4px"} size="sm">
            Số dòng
          </Text>
          <Select
            data={["5", "10", "20", "30", "50"]}
            defaultValue="10"
            allowDeselect={false}
            radius={"md"}
            onChange={(e) => setLimitRow(e as unknown as number)}
          />
        </div>
      </div>
    </div>
  );
}

export default AllMoviesPage;
