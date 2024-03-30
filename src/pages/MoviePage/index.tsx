import { ActionIcon, Container, Select, TextInput, rem } from "@mantine/core";

import { IconSearch } from "@tabler/icons-react";
import ListMovie from "./ListMovie";
import { useCallback, useEffect, useState } from "react";
import { movieServices } from "../../services";
import { MovieTS } from "../../types";
import emptyMovie from "../../assets/Image/empty_movie.svg";
function MoviePage() {
  const [allMovies, setAllMovies] = useState<MovieTS[]>();
  const [valueSearch, setValueSearch] = useState<string>();
  const icon = (
    <div
      className="bg-pink-500 text-white cursor-pointer w-full h-full flex items-center justify-center rounded-r-md"
      style={{
        marginBottom: "1.2px",
      }}
    >
      <IconSearch style={{ width: rem(16), height: rem(16) }} />
    </div>
  );

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
    if (
      valueSearch &&
      valueSearch?.length > 0 &&
      allMovies &&
      allMovies.length > 0
    ) {
      const dataFilter = allMovies.filter((movie) =>
        movie.title.toLowerCase().includes(valueSearch.toLowerCase())
      );

      setAllMovies(dataFilter);
    } else {
      getAllMovies();
    }
  }, [valueSearch]);

  useEffect(() => {
    getAllMovies();
  }, [getAllMovies]);

  return (
    <Container size={"xl"}>
      <section>
        <div className="mx-auto px-4 py-2 mt-5">
          <header>
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
              Tất cả phim
            </h2>

            <p className="mt-4 max-w-md text-gray-500">
              Hãy cùng Show Booking trải nghiệm dịch vụ một cách thoải mái và
              vui vẻ nhất nhé.
            </p>
          </header>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex rounded border border-gray-100">
              <button className="inline-flex h-10 w-10 items-center justify-center border-e text-gray-600 transition hover:bg-gray-50 hover:text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                  />
                </svg>
              </button>

              <button className="inline-flex h-10 w-10 items-center justify-center text-gray-600 transition hover:bg-gray-50 hover:text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                  />
                </svg>
              </button>
            </div>

            <TextInput
              rightSectionPointerEvents="auto"
              rightSection={icon}
              radius={"md"}
              onChange={(e) => setValueSearch(e.target.value)}
              placeholder="Tìm tên phim"
            />
          </div>

          <div className="mt-4">
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
        </div>
      </section>
    </Container>
  );
}

export default MoviePage;
