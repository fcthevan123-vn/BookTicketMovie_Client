import axios from "../axios";

// import axios from "axios";

const bookingServices = {
  async createBooking(data: object) {
    const res = await axios.post("/api/v1/booking/create", data);
    return res.data;
  },
  async getBookingByUserId(userId: string) {
    const res = await axios.get(`/api/v1/booking/by-user/${userId}`);
    return res.data;
  },

  async deleteBooking(userId: string) {
    const res = await axios.delete(`/api/v1/booking/${userId}`);
    return res.data;
  },

  async getBookingByStatus(status: string) {
    const res = await axios.post(`/api/v1/booking/by-status?status=${status}`);
    return res.data;
  },

  async getBookingByStaff(staffId: string) {
    const res = await axios.get(`/api/v1/booking/by-staff?staffId=${staffId}`);
    return res.data;
  },

  async updateBooking(data: object) {
    const res = await axios.post(`/api/v1/booking/update`, data);
    return res.data;
  },

  async getStatistic() {
    const res = await axios.get(`/api/v1/booking/statistic`);
    return res.data;
  },
};

export default bookingServices;
