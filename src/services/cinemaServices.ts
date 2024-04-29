import axios from "../axios";
import { Cinema } from "../types";

type CinemaHaveShows = {
  city: string;
  district: string;
  selectedDate: Date;
};

const cinemaServices = {
  async createCinema(data: Cinema) {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("detailLocation", data.detailLocation);
    if (data.location) {
      for (let i = 0; i < data.location.length; i++) {
        formData.append("location[]", data.location[i]);
      }
    }
    formData.append("userId", data.userId);
    formData.append("hotline", data.hotline);
    formData.append("status", data.status);
    if (data.imageFile) {
      formData.append("image", data.imageFile);
    }

    const res = await axios.post("/api/v1/cinema/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },
  async updateCinema(data: Cinema) {
    const formData = new FormData();
    formData.append("name", data.name);

    formData.append("detailLocation", data.detailLocation);
    if (data.location) {
      for (let i = 0; i < data.location.length; i++) {
        formData.append("location[]", data.location[i]);
      }
    }
    formData.append("userId", data.userId);
    formData.append("hotline", data.hotline);
    formData.append("status", data.status);
    if (data.imageFile) {
      formData.append("image", data.imageFile);
    }
    if (data.id) {
      formData.append("id", data.id);
    }

    const res = await axios.post("/api/v1/cinema/update", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
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
  async searchCinema(data: object) {
    const res = await axios.post("/api/v1/cinema/search", data);
    return res.data;
  },
};

export default cinemaServices;
