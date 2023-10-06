import { TrendingMovie } from "../../components/Sections/TrendingMovie";
import { StatusMovie } from "../../components/Sections/StatusMovie";
import { useCallback, useEffect, useState } from "react";
import { movieServices } from "../../services";
import { DataTableMoviesProps } from "../../components/Provider/MovieProvider/MovieProvider";

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

  useEffect(() => {
    getTrendingMovie();
    getActiveMovies();
  }, [getActiveMovies, getTrendingMovie]);

  return (
    <div className="">
      <TrendingMovie dataMovies={movieData.dataTrendingMovies}></TrendingMovie>
      <StatusMovie
        dataTrendingMovies={movieData.dataTrendingMovies}
      ></StatusMovie>
    </div>
  );
}

export default HomePage;
