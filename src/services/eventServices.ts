import axios from "../axios";
import { EventTS } from "../types";

const movieServices = {
  async createEvent({
    content,
    discount,
    title,
    startDate,
    endDate,
    imageFile,
  }: EventTS) {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (discount) {
      formData.append("discount", discount);
    }
    formData.append("startDate", startDate.toString());
    formData.append("endDate", endDate.toString());
    if (imageFile) {
      formData.append(`images`, imageFile);
    }

    const res = await axios.post("/api/v1/event/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  async updateEvent({
    id,
    content,
    discount,
    title,
    startDate,
    endDate,
    imageFile,
    thumbnail,
  }: EventTS) {
    const formData = new FormData();
    formData.append("title", title);

    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    formData.append("content", content);
    if (discount) {
      formData.append("discount", discount);
    }
    formData.append("startDate", startDate.toString());
    formData.append("endDate", endDate.toString());
    if (imageFile) {
      formData.append(`images`, imageFile);
    }

    const res = await axios.post(`/api/v1/event/update/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  async getAllEvents() {
    const res = await axios.get("/api/v1/event/get-all-events");

    return res.data;
  },

  async deleteEvent(id: string) {
    const res = await axios.delete(`/api/v1/event/delete-event/${id}`);

    return res.data;
  },
};

export default movieServices;
