import axios from "../axios";

const seatServices = {
  async getAllSeatsByShowId(showid: string) {
    const res = await axios.get(`/api/v1/seat/all-seats-by-show/${showid}`);
    return res.data;
  },
};

export default seatServices;
