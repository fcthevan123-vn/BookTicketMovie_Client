import axios from "../axios";

interface dataSelectProps {
  value: string;
  label: string;
  disabled?: boolean;
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
  }: {
    title: string;
    description: string;
    directors: never[] | dataSelectProps[];
    actors: never[] | dataSelectProps[];
    ageRequire: string | number;
    releaseDate: Date;
    endDate: Date;
    duration: string | number;
    language: string | dataSelectProps[];
    country: string | dataSelectProps[];
    subtitle: string | string[];
    genre: string[] | never[];
    images: never[] | File[];
  }) {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("ageRequire", ageRequire.toString());
    formData.append("releaseDate", releaseDate.toISOString());
    formData.append("endDate", endDate.toISOString());
    formData.append("duration", duration.toString());
    formData.append("language", language[0].toString());
    formData.append("country", country[0].toString());
    formData.append("subtitle", subtitle[0]);

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
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
};

export default movieServices;
