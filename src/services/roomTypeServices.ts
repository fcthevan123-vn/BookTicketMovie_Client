import axios from "../axios";

const roomTypeServices = {
  async createRoomType(data: object) {
    const res = await axios.post("/api/v1/roomType/create", data);
    return res.data;
  },
  async updateRoomType(data: object) {
    const res = await axios.post("/api/v1/roomType/update", data);
    return res.data;
  },
  async getAllRoomType(staffId: string) {
    const res = await axios.get(`/api/v1/roomType/get-all?staffId=${staffId}`);
    return res.data;
  },
};

export default roomTypeServices;
