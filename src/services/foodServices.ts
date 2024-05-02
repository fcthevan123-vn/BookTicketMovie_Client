import axios from "../axios";
import { MenuFoodTS } from "../types";

const foodServices = {
  async createFood(data: MenuFoodTS) {
    console.log(data);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price.toString());
    formData.append("status", data.status);
    if (data.imageFile) {
      formData.append(`images`, data.imageFile);
    }

    const res = await axios.post("/api/v1/food/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  async updateFood(data: MenuFoodTS) {
    console.log(data);
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.id) {
      formData.append("id", data.id);
    }
    formData.append("price", data.price.toString());
    formData.append("status", data.status);
    if (data.imageFile) {
      formData.append(`images`, data.imageFile);
    }

    const res = await axios.post("/api/v1/food/update", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  async getFood(status?: string) {
    const res = await axios.get(`/api/v1/food/all-food?status=${status}`);
    return res.data;
  },

  async changeStatus(status: string, id: string) {
    const res = await axios.get(
      `/api/v1/food/cancel-food?status=${status}&id=${id}`
    );
    return res.data;
  },
};

export default foodServices;
