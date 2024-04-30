import axios from "../axios";

const seatServices = {
  async getAllSeatsByShowId(showid: string) {
    const res = await axios.get(`/api/v1/seat/all-seats-by-show/${showid}`);
    return res.data;
  },

  async getAllSeatType(staffId: string) {
    const res = await axios.get(
      `/api/v1/seat/all-seatTypes?staffId=${staffId}`
    );
    return res.data;
  },

  async createSeatType(data: object) {
    const res = await axios.post(`/api/v1/seat/create-seatType`, data);
    return res.data;
  },
};

export default seatServices;
