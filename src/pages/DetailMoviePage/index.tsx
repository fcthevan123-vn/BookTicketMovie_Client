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
  const [relatedMovies, setRelatedMovies] = useState<DataTableMoviesProps[]>();

  const getMovieById = useCallback(async () => {
    try {
      const res = await movieServices.getMovieById(id as string);
      if (res.statusCode === 0) {
        setDataMovie(res.data);
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  async function getAllMovies() {
    try {
      const res = await movieServices.getAllMovies({ isCount: false });
      if (res.statusCode === 0) {
        const dataLength = res.data.length;

        // genareate random index of movies array
        const randomNumbers = Array.from({ length: dataLength }, (_, i) => i)
          .sort(() => Math.random() - 0.5)
          .slice(0, 4);

        const selectedMovies = randomNumbers.map((index) => res.data[index]);
        setRelatedMovies(selectedMovies);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllMovies();
    getMovieById();
  }, [getMovieById, id]);

  return (
    <div>
      <div>
        <div
          style={{
            backgroundImage: `linear-gradient(90deg, rgb(26, 26, 26) 24.97%, rgb(26, 26, 26) 38.3%, rgba(26, 26, 26, 0.04) 97.47%, rgb(26, 26, 26) 100%), url(${dataMovie?.images[0]})`,
            backgroundPosition: "right center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="p-8">
            <Container size={"xl"} className="">
              {dataMovie && <TopSecton dataMovie={dataMovie}></TopSecton>}
            </Container>
          </div>
        </div>
      </div>
      <Container py="xl" size={"xl"}>
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
          {dataMovie && relatedMovies && (
            <RelatedMovie dataMovie={relatedMovies}></RelatedMovie>
          )}
        </div>
      </Container>
    </div>
  );
}

export default DetailMoviePage;
