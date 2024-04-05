import { SimpleGrid } from "@mantine/core";
import MovieSmallPreview from "../MovieSmallPreview";
import { DataTableMoviesProps } from "../Provider/MovieProvider/MovieProvider";
import { Link } from "react-router-dom";

type Props = {
  dataMovie: DataTableMoviesProps[];
};

function RelatedMovie({ dataMovie }: Props) {
  return (
    <div className="px-5">
      <div className="flex justify-end">
        <Link to={"/movie"}>
          <p className="text-sm italic text-violet-500 cursor-pointer hover:underline hover:text-violet-800">
            Xem tất cả
          </p>
        </Link>
      </div>
      <SimpleGrid cols={4} mt="xl">
        {dataMovie.map((movie) => (
          <MovieSmallPreview
            dataMovie={movie}
            key={movie.id}
          ></MovieSmallPreview>
        ))}
      </SimpleGrid>
    </div>
  );
}

export default RelatedMovie;
