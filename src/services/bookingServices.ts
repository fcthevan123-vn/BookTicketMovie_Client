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
};

export default bookingServices;
