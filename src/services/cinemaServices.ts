import axios from "../axios";

const cinemaServices = {
  async createCinema(data: object) {
    const res = await axios.post("/api/v1/cinema/create", data);
    return res.data;
  },
};

export default cinemaServices;
