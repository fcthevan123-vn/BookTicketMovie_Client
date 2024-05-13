import { TrendingMovie } from "../../components/Sections/TrendingMovie";
import { StatusMovie } from "../../components/Sections/StatusMovie";
import { useCallback, useEffect, useState } from "react";
import { movieServices } from "../../services";
import AllEvents from "../../components/Sections/AllEvents";
import { Container, Dialog, Group, Text, Transition } from "@mantine/core";
import FooterComponent from "../../components/FooterComponent";
import TopMovie from "./TopMovie";
import { useLocalStorage, useSetState } from "@mantine/hooks";
import { MovieTS } from "../../types";
import MoviePreviewNoSlide from "../../components/MovieSmallPreview/MoviePreviewNoSlide";
import { useAuthenticate } from "../../hooks";

function HomePage() {
  const [movieData, setMovieData] = useSetState<{
    dataTrendingMovies: MovieTS[];
    dataActiveMovies: MovieTS[];
    dataNextMovies: MovieTS[];
    topMovie:
      | {
          topBookMovie: MovieTS;
          topStarMovie: MovieTS;
        }
      | undefined;
    suggestMovie: MovieTS | undefined;
  }>({
    dataTrendingMovies: [],
    dataActiveMovies: [],
    dataNextMovies: [],
    topMovie: undefined,
    suggestMovie: undefined,
  });
  const [, , dataUser] = useAuthenticate();
  const [opened, setOpened] = useState(false);
  const [value, setValue] = useLocalStorage({
    key: "isSuggest",
    defaultValue: true,
  });

  const [isMount, setIsMount] = useState(false);

  const getActiveMovies = useCallback(
    async (userId: string) => {
      try {
        setIsMount(false);
        const res = await movieServices.getActiveMovies();
        if (userId) {
          setIsMount(false);

          const getSuggestMovie = await movieServices.suggestMovie(userId);

          if (getSuggestMovie.data.length > 0) {
            setOpened(true);
            setMovieData({
              suggestMovie: getSuggestMovie.data[0],
            });
          }
        }

        if (res.statusCode === 0) {
          setMovieData({
            dataTrendingMovies: res.data.trendingMovies,
            dataActiveMovies: res.data.activeMovies,
            dataNextMovies: res.data.nextMovies,
            topMovie: res.data.topMovie,
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsMount(true);
      }
    },
    [setMovieData]
  );

  useEffect(() => {
    getActiveMovies(dataUser.id);
  }, [dataUser.id, getActiveMovies]);

  return (
    <div className="overflow-x-hidden">
      {/* <HeroHome></HeroHome> */}
      <Transition
        mounted={isMount}
        transition="pop-top-left"
        duration={500}
        timingFunction="ease"
      >
        {(styles) => (
          <div style={styles}>
            {movieData.topMovie && (
              <TopMovie
                topBookMovie={movieData.topMovie?.topBookMovie}
                topStarMovie={movieData.topMovie?.topStarMovie}
              ></TopMovie>
            )}
          </div>
        )}
      </Transition>

      <Container size="xl">
        <Transition
          mounted={isMount}
          transition="slide-left"
          duration={1700}
          timingFunction="ease"
        >
          {(styles) => (
            <div style={styles}>
              <TrendingMovie
                dataMovies={movieData.dataTrendingMovies}
              ></TrendingMovie>
            </div>
          )}
        </Transition>

        <Transition
          mounted={isMount}
          transition="slide-right"
          duration={3000}
          timingFunction="ease"
        >
          {(styles) => (
            <div style={styles}>
              <StatusMovie
                dataActiveMovies={movieData.dataActiveMovies}
                dataNextMovies={movieData.dataNextMovies}
              ></StatusMovie>
            </div>
          )}
        </Transition>

        <Transition
          mounted={isMount}
          transition="slide-up"
          duration={4000}
          timingFunction="ease"
        >
          {(styles) => (
            <div style={styles}>
              <AllEvents></AllEvents>
            </div>
          )}
        </Transition>
      </Container>
      <FooterComponent></FooterComponent>

      {value && (
        <Dialog
          opened={opened}
          withCloseButton
          onClose={() => {
            setOpened(false);
            setValue(false);
          }}
          size="lg"
          position={{
            bottom: 15,
            left: 15,
          }}
          styles={{
            root: {
              border: "1px solid #ccc",
              background: "var(--mantine-color-gray-1)",
              borderRadius: "var(--mantine-radius-lg)",
            },
          }}
          withBorder
          w={330}
          h={390}
        >
          <Text c={"violet"} size="sm" mb="xs" fw={600}>
            Gợi ý dành cho bạn
          </Text>
          <Transition
            mounted={isMount}
            transition="slide-right"
            duration={2000}
            timingFunction="ease"
          >
            {(styles) => (
              <div style={styles}>
                <Group align="flex-end">
                  {movieData.suggestMovie && (
                    <MoviePreviewNoSlide
                      dataMovie={movieData?.suggestMovie as MovieTS}
                    ></MoviePreviewNoSlide>
                  )}
                </Group>
              </div>
            )}
          </Transition>
        </Dialog>
      )}
    </div>
  );
}

export default HomePage;
