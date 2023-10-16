import { createFormContext } from "@mantine/form";

interface MovieFormValues {
  title: string;
  description: string;
  directors: string[];
  actors: string[];
  ageRequire: string;
  releaseDate: Date | string;
  endDate: Date | string;
  duration: string;
  language: string;
  country: string;
  subtitle: string;
  price: number;
  genre: string[];
  images: File[] | string[];
  imagesDelete?: string | string[];
}

export const [MovieFormProvider, useMovieFormContext, useMovieForm] =
  createFormContext<MovieFormValues>();
