import axios from "../axios";

interface MovieFormValuesProps {
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
  images: File[] | string[] | { imageName: string; imageUrl: string }[];
  imagesDelete?: string | string[];
  id?: string;
}

const movieServices = {
  async createMovie({
    title,
    description,
    directors,
    actors,
    ageRequire,
    releaseDate,
    endDate,
    duration,
    language,
    price,
    country,
    subtitle,
    genre,
    images,
  }: MovieFormValuesProps) {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("ageRequire", ageRequire.toString());
    formData.append("price", price.toString());
    formData.append("releaseDate", releaseDate.toString());
    formData.append("endDate", endDate.toString());
    formData.append("duration", duration.toString());
    formData.append("language", language.toString());
    formData.append("country", country.toString());
    formData.append("subtitle", subtitle);

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      if (image instanceof File) {
        formData.append(`images`, image);
      }
    }

    for (let i = 0; i < directors.length; i++) {
      formData.append("directors[]", directors[i].toString());
    }

    for (let i = 0; i < actors.length; i++) {
      formData.append("actors[]", actors[i].toString());
    }

    for (let i = 0; i < genre.length; i++) {
      formData.append("genre", genre[i]);
    }

    const res = await axios.post("/api/v1/movie/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  async getAllMovies({ isCount }: { isCount: boolean }) {
    const res = await axios.get(`/api/v1/movie/all-movies?isCount=${isCount}`);
    return res.data;
  },

  async getLimitMovie({ page, limit }: { page: number; limit: number }) {
    const res = await axios.get(
      `/api/v1/movie/all-limit-movies?page=${page}&limit=${limit}`
    );
    return res.data;
  },

  async searchMoviesByTitle({
    title,
    page,
    limit,
  }: {
    title: string;
    page: number;
    limit: number;
  }) {
    const res = await axios.get(
      `/api/v1/movie/search-movies-by-title?title=${title}&page=${page}&limit=${limit}`
    );
    return res.data;
  },

  async editMovie(
    {
      title,
      description,
      directors,
      actors,
      ageRequire,
      releaseDate,
      endDate,
      duration,
      language,
      price,
      country,
      subtitle,
      genre,
      images,
      imagesDelete,
    }: MovieFormValuesProps,
    id: string
  ) {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("ageRequire", ageRequire.toString());
    formData.append("price", price.toString());
    formData.append("releaseDate", releaseDate.toString());
    formData.append("endDate", endDate.toString());
    formData.append("duration", duration.toString());
    formData.append("language", language);
    formData.append("country", country);
    formData.append("subtitle", subtitle);

    if (imagesDelete) {
      for (let i = 0; i < imagesDelete.length; i++) {
        formData.append(`imagesDelete[]`, imagesDelete[i]);
      }
    }

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      if (image instanceof File && !image.name.includes("AwsS3Storage")) {
        formData.append(`images`, image);
      }
    }

    for (let i = 0; i < directors.length; i++) {
      formData.append("directors[]", directors[i].toString());
    }

    for (let i = 0; i < actors.length; i++) {
      formData.append("actors[]", actors[i].toString());
    }

    for (let i = 0; i < genre.length; i++) {
      formData.append("genre", genre[i]);
    }

    const res = await axios.patch(`api/v1/movie/edit/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  async deleteMovie({ id }: { id: string }) {
    const res = await axios.delete(`api/v1/movie/delete/${id}`);
    return res.data;
  },

  async getTrendingMovies() {
    const res = await axios.get(`api/v1/movie/trending-movies`);
    return res.data;
  },

  async getActiveMovies() {
    const res = await axios.get(`api/v1/movie/active-movies`);
    return res.data;
  },
};

export default movieServices;
