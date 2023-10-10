import { Container, Divider } from "@mantine/core";
import TopSecton from "./TopSection";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { movieServices } from "../../services";
import { DataTableMoviesProps } from "../../components/Provider/MovieProvider/MovieProvider";
import MidSection from "./MidSection";
import RelatedMovie from "../../components/RelatedMovie";

function DetailMoviePage() {
  const { id } = useParams();
  const [dataMovie, setDataMovie] = useState<DataTableMoviesProps>();

  const getMovieById = useCallback(async () => {
    try {
      const res = await movieServices.getMovieById(id as string);
      if (res.statusCode === 0) {
        setDataMovie(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    getMovieById();
  }, [getMovieById, id]);

  return (
    <Container my="md" fluid>
      {dataMovie && <TopSecton dataMovie={dataMovie}></TopSecton>}
      <Divider
        my={40}
        mx={70}
        size={"sm"}
        label="Đánh giá và thống kê"
        labelPosition="center"
      />
      <MidSection></MidSection>

      <Divider
        my={40}
        mx={70}
        size={"sm"}
        label="Những phim bạn có thể thích"
        labelPosition="center"
      />

      {dataMovie && <RelatedMovie dataMovie={dataMovie}></RelatedMovie>}
    </Container>
  );
}

export default DetailMoviePage;
