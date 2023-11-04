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
    <Container my="xl" size={"xl"}>
      {dataMovie && <TopSecton dataMovie={dataMovie}></TopSecton>}
      <Divider mx={10} my={40} size={"sm"} label="Thông tin chi tiết" />

      <div className="">
        {dataMovie && <MidSection dataMovie={dataMovie}></MidSection>}
      </div>

      <Divider
        my={40}
        mx={70}
        size={"sm"}
        label="Những phim bạn có thể thích"
        labelPosition="center"
      />

      <div className="">
        {dataMovie && <RelatedMovie dataMovie={dataMovie}></RelatedMovie>}
      </div>
    </Container>
  );
}

export default DetailMoviePage;
