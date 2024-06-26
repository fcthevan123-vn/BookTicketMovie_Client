import axios from "../axios";

interface MovieFormValuesProps {
  title: string;
  description: string;
  directors: string[];
  actors: string[];
  ageRequire: string;
  releaseDate: Date | string;
  endDate: Date | string;
  duration: number;
  language: string;
  country: string;
  subtitle: string;
  genre: string[];
  images: File[] | string[] | { imageName: string; imageUrl: string }[];
  trailerLink: string;
  imagesDelete?: string | string[];
  id?: string;
  trailerFile?: File | null;
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
    country,
    subtitle,
    genre,
    images,
    trailerLink,
    trailerFile,
  }: MovieFormValuesProps) {
    console.log("trailerFile", trailerFile);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("ageRequire", ageRequire.toString());
    formData.append("releaseDate", releaseDate.toString());
    formData.append("endDate", endDate.toString());
    formData.append("duration", duration.toString());
    formData.append("language", language.toString());
    formData.append("country", country.toString());
    formData.append("subtitle", subtitle);
    formData.append("trailerLink", trailerLink);

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      if (image instanceof File) {
        formData.append(`images`, image);
      }
    }

    if (trailerFile) {
      formData.append("trailerFile", trailerFile);
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
      country,
      subtitle,
      genre,
      images,
      trailerLink,
      imagesDelete,
      trailerFile,
    }: MovieFormValuesProps,
    id: string,
    isUpdateTrailer: string
  ) {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("ageRequire", ageRequire.toString());
    formData.append("releaseDate", releaseDate.toString());
    formData.append("endDate", endDate.toString());
    formData.append("duration", duration.toString());
    formData.append("language", language);
    formData.append("country", country);
    formData.append("subtitle", subtitle);
    formData.append("trailerLink", trailerLink);

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

    if (trailerFile) {
      formData.append("trailerFile", trailerFile);
    }

    formData.append("isUpdateTrailer", isUpdateTrailer);

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

  async getNextMovies() {
    const res = await axios.get(`api/v1/movie/next-movies`);
    return res.data;
  },

  async getMovieById(id: string) {
    // console.log("id", id);
    const res = await axios.get(`api/v1/movie/${id}`);
    return res.data;
  },

  async getAllShowByMovie(staffId?: string) {
    const res = await axios.get(`api/v1/movie/get-shows?staffId=${staffId}`);
    return res.data;
  },

  async advanceSearch(data: object) {
    const res = await axios.post(`api/v1/movie/search`, data);
    return res.data;
  },

  async suggestMovie(userId: string) {
    const res = await axios.get(`api/v1/user/suggest-movie?userId=${userId}`);
    return res.data;
  },
};

export default movieServices;
