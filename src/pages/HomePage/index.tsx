import { TrendingMovie } from "../../components/Sections/TrendingMovie";
import { StatusMovie } from "../../components/Sections/StatusMovie";
import { useCallback, useEffect, useState } from "react";
import { movieServices } from "../../services";
import { DataTableMoviesProps } from "../../components/Provider/MovieProvider/MovieProvider";
import AllEvents from "../../components/Sections/AllEvents";
import { Container } from "@mantine/core";
import HeroHome from "../../components/HeroHome";

function HomePage() {
  const [movieData, setMovieData] = useState<{
    dataTrendingMovies: DataTableMoviesProps[];
    dataActiveMovies: DataTableMoviesProps[];
    dataNextMovies: DataTableMoviesProps[];
  }>({
    dataTrendingMovies: [],
    dataActiveMovies: [],
    dataNextMovies: [],
  });

  const getTrendingMovie = useCallback(async () => {
    try {
      const res = await movieServices.getTrendingMovies();
      if (res.statusCode === 0) {
        setMovieData((prevState) => ({
          ...prevState,
          dataTrendingMovies: res.data,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getActiveMovies = useCallback(async () => {
    try {
      const res = await movieServices.getActiveMovies();
      if (res.statusCode === 0) {
        setMovieData((prevState) => ({
          ...prevState,
          dataActiveMovies: res.data,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getNextMovies = useCallback(async () => {
    try {
      const res = await movieServices.getNextMovies();
      if (res.statusCode === 0) {
        setMovieData((prevState) => ({
          ...prevState,
          dataNextMovies: res.data,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getTrendingMovie();
    getActiveMovies();
    getNextMovies();
  }, [getActiveMovies, getNextMovies, getTrendingMovie]);

  return (
    <div className="">
      <HeroHome></HeroHome>
      <Container size="xl">
        <TrendingMovie
          dataMovies={movieData.dataTrendingMovies}
        ></TrendingMovie>
        <StatusMovie
          dataActiveMovies={movieData.dataActiveMovies}
          dataNextMovies={movieData.dataNextMovies}
        ></StatusMovie>
        <AllEvents></AllEvents>
      </Container>
    </div>
  );
}

export default HomePage;
