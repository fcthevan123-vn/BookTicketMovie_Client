import axios from "../axios";

const showServices = {
  async getAllShowBeforePickSeat(
    movieId: string,
    roomTypeId: string,
    date: string,
    locationCode: string
  ) {
    const res = await axios.get(
      `/api/v1/show/before-pick-seat?movieId=${movieId}&roomTypeId=${roomTypeId}&date=${date}&locationCode=${locationCode}`
    );
    return res.data;
  },

  async deleteShow(showId: string) {
    const res = await axios.delete(`/api/v1/show/${showId}`);
    return res.data;
  },

  async createShow(data: object) {
    const res = await axios.post(`/api/v1/show/create`, data);
    return res.data;
  },
};

export default showServices;
