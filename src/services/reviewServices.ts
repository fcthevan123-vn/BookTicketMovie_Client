import axios from "../axios";
import { ReviewTS } from "../types";

const reviewServices = {
  async createReview(data: ReviewTS) {
    const res = await axios.post(`/api/v1/review/create`, data);
    return res.data;
  },

  async updateReview(data: ReviewTS) {
    const res = await axios.post(`/api/v1/review/update`, data);
    return res.data;
  },

  async deleteReview(id: string) {
    const res = await axios.post(`/api/v1/review/delete/${id}`);
    return res.data;
  },

  async getALLReview(id: string) {
    const res = await axios.get(`/api/v1/review/get-all/${id}`);
    return res.data;
  },

  async getUserReview(movieId: string, userId: string) {
    const res = await axios.post(
      `/api/v1/review//get-user-review?movieId=${movieId}&userId=${userId}`
    );
    return res.data;
  },
};

export default reviewServices;
