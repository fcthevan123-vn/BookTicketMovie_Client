import { Container } from "@mantine/core";
import TopSecton from "./TopSection";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { movieServices } from "../../services";
import { DataTableMoviesProps } from "../../components/Provider/MovieProvider/MovieProvider";
import MidSection from "./MidSection";

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
      <MidSection></MidSection>
    </Container>
  );
}

export default DetailMoviePage;
