import axios from "../axios";

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
};

export default cinemaServices;
