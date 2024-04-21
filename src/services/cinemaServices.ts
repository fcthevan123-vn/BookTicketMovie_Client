import axios from "../axios";

type CinemaHaveShows = {
  city: string;
  district: string;
  selectedDate: Date;
};

const cinemaServices = {
  async createCinema(data: object) {
    const res = await axios.post("/api/v1/cinema/create", data);
    return res.data;
  },
  async getAllCinemas() {
    const res = await axios.get("/api/v1/cinema/get-all");
    return res.data;
  },
  async getLimitCinemas(page: number, limit: number) {
    const res = await axios.get(
      `api/v1/cinema/get-limit?page=${page}&limit=${limit}`
    );
    return res.data;
  },
  async getCinemaHaveShows(data: CinemaHaveShows) {
    const res = await axios.post("/api/v1/cinema/cinemas-have-shows", data);
    return res.data;
  },
};

export default cinemaServices;
