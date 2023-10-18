import axios from "../axios";

const movieHallServices = {
  async createMovieHall(data: object) {
    const res = await axios.post("/api/v1/movie-hall/create", data);
    return res.data;
  },
  async getAllMovieHall() {
    const res = await axios.get("/api/v1/movie-hall/get-all");
    return res.data;
  },
};

export default movieHallServices;
