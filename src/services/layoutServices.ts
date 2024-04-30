import axios from "../axios";

const layoutServices = {
  async createLayout(data: object) {
    const res = await axios.post("/api/v1/layout/create", data);
    return res.data;
  },
  async getAllLayout() {
    const res = await axios.get("/api/v1/layout/get-all");
    return res.data;
  },
  async getLayoutByStaff(staffId: string) {
    console.log("staffId", staffId);
    const res = await axios.get(
      `/api/v1/layout/layout-by-staff?staffId=${staffId}`
    );
    return res.data;
  },
};

export default layoutServices;
