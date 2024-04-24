import {
  ActionIcon,
  Button,
  Divider,
  LoadingOverlay,
  MultiSelect,
  NumberInput,
  Pagination,
  ScrollArea,
  Select,
  TextInput,
  ThemeIcon,
} from "@mantine/core";

import {
  IconChevronLeft,
  IconChevronRight,
  IconSearch,
  IconStarFilled,
} from "@tabler/icons-react";
import ListMovie from "./ListMovie";
import { useCallback, useEffect, useState } from "react";
import { movieServices } from "../../services";
import emptyMovie from "../../assets/Image/empty_movie.svg";
import { DataTableMoviesProps } from "../../components/Provider/MovieProvider/MovieProvider";
import { useSetState, useToggle } from "@mantine/hooks";
import { dataSelectOfMovie } from "../../untils/helper";
import { ErrToast } from "../../components/AllToast/NormalToast";

type QueryData = {
  title: string;
  ageRequire: string | null;
  country: string[] | [];
  genre: string[] | [];
  subtitle: string[] | [];
  status: string | null;
  rating: string | number | undefined;
  page: number;
  limit: number;
  isLoading: boolean;
  totalPage?: number;
  totalMovie?: number;
};

const dataFilter = {
  ...dataSelectOfMovie,
  ageRequired: [
    {
      label: "Nhi đồng < 12 tuổi",
      value: "12",
    },
    {
      label: "Thiếu niên < 18 tuổi",
      value: "17",
    },
    {
      label: "Người lớn > 17 tuổi",
      value: "18",
    },
  ],
};

const intinialData = {
  title: "",
  ageRequire: null,
  country: [],
  genre: [],
  subtitle: [],
  status: "all",
  rating: undefined,
  page: 1,
  totalPage: 1,
  limit: 8,
  isLoading: false,
};

function MoviePage() {
  const [allMovies, setAllMovies] = useState<DataTableMoviesProps[]>();
  const [isOpenSearch, toggle] = useToggle([true, false]);
  const [page, setPage] = useState(1);
  const [queryData, setQueryData] = useSetState<QueryData>({
    title: "",
    ageRequire: null,
    country: [],
    genre: [],
    subtitle: [],
    status: "all",
    rating: undefined,
    page: 1,
    totalPage: 1,
    limit: 8,
    isLoading: false,
    totalMovie: 1,
  });

  const handleFilterMovie = useCallback(
    async (data: QueryData) => {
      try {
        setQueryData({
          isLoading: true,
        });
        const res = await movieServices.advanceSearch(data);

        if (res.statusCode == 0) {
          setAllMovies(res.data);
        }

        const pagination = Math.ceil(res.rows / 8);

        setTimeout(() => {
          setQueryData({
            isLoading: false,
            totalPage: pagination,
            totalMovie: res.rows,
          });
        }, 400);
      } catch (error) {
        ErrToast(error as Error, "Tìm kiếm phim bị lỗi");
      }
    },
    [setQueryData]
  );

  useEffect(() => {
    handleFilterMovie(queryData);
  }, [handleFilterMovie]);

  return (
    <div className="px-3 py-4">
      <div
        className={`flex flex-col gap-3 ms-3 w-[240px] ${
          isOpenSearch
            ? "fixed z-10 slide-in-blurred-left "
            : "slide-out-blurred-left hidden"
        }`}
      >
        <ScrollArea
          h={550}
          offsetScrollbars
          scrollHideDelay={550}
          scrollbarSize={4}
        >
          <div className="flex flex-col gap-3 me-1">
            <TextInput
              label="Tên phim"
              radius="md"
              placeholder="Tìm kiếm tên phim"
              leftSection={<IconSearch stroke={1.5} />}
              value={queryData.title}
              onChange={(e) => {
                setQueryData({
                  title: e.currentTarget.value,
                });
              }}
            />

            <MultiSelect
              label="Thể loại"
              radius="md"
              clearable
              searchable
              maxDropdownHeight={200}
              placeholder="Chọn thể loại phim"
              data={dataFilter.genre}
              value={queryData.genre}
              onChange={(e) => setQueryData({ genre: e })}
            />

            <MultiSelect
              label="Quốc gia"
              radius="md"
              clearable
              searchable
              maxDropdownHeight={200}
              placeholder="Chọn quốc gia"
              data={dataFilter.country}
              value={queryData.country}
              onChange={(e) => setQueryData({ country: e })}
            />

            <MultiSelect
              label="Phụ đề"
              radius="md"
              clearable
              searchable
              maxDropdownHeight={200}
              placeholder="Chọn phụ đề"
              data={dataFilter.country}
              value={queryData.subtitle}
              onChange={(e) => setQueryData({ subtitle: e })}
            />

            <Select
              label="Độ tuổi yêu cầu"
              radius="md"
              clearable
              data={dataFilter.ageRequired}
              searchable
              maxDropdownHeight={200}
              placeholder="Chọn độ tuổi"
              value={queryData.ageRequire}
              onChange={(e) => setQueryData({ ageRequire: e })}
            />

            <Select
              label="Trạng thái phim"
              radius="md"
              clearable
              data={["Phim đang chiếu", "Phim sắp chiếu"]}
              searchable
              maxDropdownHeight={200}
              placeholder="Phim đang chiếu, sắp chiếu"
              value={queryData.status}
              onChange={(e) => setQueryData({ status: e })}
            />

            <NumberInput
              radius="md"
              label="Đánh giá"
              min={1}
              max={5}
              clampBehavior="strict"
              placeholder="Chọn theo số sao"
              value={queryData.rating}
              onChange={(e) => setQueryData({ rating: e })}
              leftSection={
                <ThemeIcon variant="white" size="md" color="yellow">
                  <IconStarFilled style={{ width: "80%", height: "80%" }} />
                </ThemeIcon>
              }
            />
          </div>
        </ScrollArea>

        <Divider my={"xs"} size={"sm"}></Divider>

        <div className=" flex gap-3 bottom-4">
          <Button
            size="compact-sm"
            onClick={() => handleFilterMovie(queryData)}
          >
            Áp dụng
          </Button>
          <Button
            size="compact-sm"
            variant="light"
            onClick={() => {
              setQueryData(intinialData);
              handleFilterMovie(intinialData);
            }}
          >
            Khôi phục
          </Button>
        </div>
      </div>

      <div
        className={`${
          isOpenSearch
            ? "ms-[180px] slide-right mr-[100px]"
            : "px-44 slide-left w-full ms-[100px] "
        } mt-5 relative`}
      >
        <header>
          <div className="flex gap-2">
            <h2 className="text-xl font-bold text-gray-9Fgl00 sm:text-3xl">
              Tất cả phim
            </h2>
          </div>
          <p className="mt-4 max-w-md text-gray-500">
            Hãy cùng Show Booking trải nghiệm dịch vụ một cách thoải mái và vui
            vẻ nhất nhé.
          </p>
        </header>

        <ActionIcon
          onClick={() => toggle()}
          className="mt-2"
          variant="light"
          color="violet"
          size="lg"
          aria-label="Settings"
        >
          {isOpenSearch ? (
            <IconChevronLeft
              style={{ width: "70%", height: "70%" }}
              stroke={1.5}
            />
          ) : (
            <IconChevronRight
              style={{ width: "70%", height: "70%" }}
              stroke={1.5}
            />
          )}
        </ActionIcon>

        <div className="">
          {allMovies && allMovies.length > 0 ? (
            <ListMovie dataMovies={allMovies}></ListMovie>
          ) : (
            <div className="flex gap-6 justify-center flex-col items-center">
              <p className="font-base italic text-gray-400 text-md">
                Không có phim phù hợp
              </p>
              <img src={emptyMovie} alt="empty movie" className="w-72" />
            </div>
          )}
        </div>

        <Pagination
          disabled={queryData.isLoading}
          withEdges
          onChange={(e) => {
            const convertData = {
              ...queryData,
              page: e,
            };
            setPage(e);
            handleFilterMovie(convertData);
          }}
          radius={"md"}
          className="flex justify-center mt-12 mb-20"
          value={page}
          total={queryData.totalPage ? queryData.totalPage : 1}
        />

        <LoadingOverlay
          visible={queryData.isLoading}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
      </div>
    </div>
  );
}

export default MoviePage;
