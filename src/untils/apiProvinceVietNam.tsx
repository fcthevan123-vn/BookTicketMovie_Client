import axios from "axios";
const host = "https://provinces.open-api.vn/api/";

const apiProvinceVietNam = {
  async callApiCity(api: string) {
    const res = await axios.get(`${host + api}`);
    return res.data;
  },
};

export default apiProvinceVietNam;
