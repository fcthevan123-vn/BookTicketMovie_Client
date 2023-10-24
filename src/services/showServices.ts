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
};

export default showServices;
