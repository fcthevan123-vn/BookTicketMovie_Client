import { SimpleGrid, Text } from "@mantine/core";
import { DataTableMoviesProps } from "../Provider/MovieProvider/MovieProvider";
import MovieSmallPreview from "../MovieSmallPreview";

type Props = {
  dataMovie: DataTableMoviesProps;
};

function RelatedMovie({ dataMovie }: Props) {
  return (
    <div className="px-5">
      <div className="flex justify-between">
        <Text fw={500}>Thể loại: HÀNH ĐỘNG - HÀI KỊCH - KỊCH TÍNH</Text>
        <Text c={"blue"} fw={500} td={"underline"}>
          Xem tất cả
        </Text>
      </div>
      <SimpleGrid cols={5} mt="xl">
        <MovieSmallPreview dataMovie={dataMovie}></MovieSmallPreview>
        <MovieSmallPreview dataMovie={dataMovie}></MovieSmallPreview>

        <MovieSmallPreview dataMovie={dataMovie}></MovieSmallPreview>

        <MovieSmallPreview dataMovie={dataMovie}></MovieSmallPreview>
        <MovieSmallPreview dataMovie={dataMovie}></MovieSmallPreview>
      </SimpleGrid>
    </div>
  );
}

export default RelatedMovie;
