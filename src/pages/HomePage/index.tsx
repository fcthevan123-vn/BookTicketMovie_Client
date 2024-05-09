import { TrendingMovie } from "../../components/Sections/TrendingMovie";
import { StatusMovie } from "../../components/Sections/StatusMovie";
import { useCallback, useEffect, useState } from "react";
import { movieServices } from "../../services";
import AllEvents from "../../components/Sections/AllEvents";
import { Container, Transition } from "@mantine/core";
import FooterComponent from "../../components/FooterComponent";
import TopMovie from "./TopMovie";
import { useSetState } from "@mantine/hooks";
import { MovieTS } from "../../types";

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
  }>({
    dataTrendingMovies: [],
    dataActiveMovies: [],
    dataNextMovies: [],
    topMovie: undefined,
  });

  const [isMount, setIsMount] = useState(false);

  const getActiveMovies = useCallback(async () => {
    try {
      setIsMount(false);
      const res = await movieServices.getActiveMovies();
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
  }, [setMovieData]);

  useEffect(() => {
    getActiveMovies();
  }, [getActiveMovies]);

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
    </div>
  );
}

export default HomePage;
