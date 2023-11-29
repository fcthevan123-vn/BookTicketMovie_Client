import {  Grid, SimpleGrid } from "@mantine/core";
import { DataTableMoviesProps } from "../../../components/Provider/MovieProvider/MovieProvider";
import MovieSmallPreview from "../../../components/MovieSmallPreview";
type Props = {
  dataMovies: DataTableMoviesProps[];
};

function ListMovie({ dataMovies }: Props) {
  return (
    <div className="mt-8 relative">
      <Grid>
        <Grid.Col span={12}>
          <SimpleGrid cols={4} spacing={"xl"}>
            {dataMovies.map((movie, index) => (
              <MovieSmallPreview
                key={index}
                dataMovie={movie}
              ></MovieSmallPreview>
            ))}
          </SimpleGrid>
        </Grid.Col>
      </Grid>
    </div>
  );
}

export default ListMovie;
