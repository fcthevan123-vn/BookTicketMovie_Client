import axios from "../axios";

const notificationServices = {
  async getAllNoti(userId: string) {
    const res = await axios.get(
      `/api/v1/notification/all-noti?userId=${userId}`
    );
    return res.data;
  },
  //   async getAllLayout() {
  //     const res = await axios.get("/api/v1/layout/get-all");
  //     return res.data;
  //   },
};

export default notificationServices;
