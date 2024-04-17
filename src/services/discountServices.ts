import axios from "../axios";
import { DiscountTS } from "../types";

const discountServices = {
  async createDiscount(data: DiscountTS) {
    const res = await axios.post("/api/v1/discount/create", data);
    return res.data;
  },
  async getAllDiscount() {
    const res = await axios.get("/api/v1/discount/get-all-discount");
    return res.data;
  },
  async getDiscountById(id: string) {
    const res = await axios.get(`/api/v1/discount/get-discount/${id}`);
    return res.data;
  },
  async deleteDiscount(id: string) {
    const res = await axios.delete(`/api/v1/discount/delete-discount/${id}`);
    return res.data;
  },
  async updateDiscount(data: DiscountTS) {
    const res = await axios.post(`/api/v1/discount/update`, data);
    return res.data;
  },
  async checkValidDiscount(nameDiscount: string) {
    const res = await axios.get(
      `/api/v1/discount/validate-discount?nameDiscount=${nameDiscount}`
    );
    return res.data;
  },
};

export default discountServices;
