import axios from "axios";
const host = "https://vapi.vnappmob.com/api/province/";

const apiProvinceVietNam = {
  async callApiCity(api: string) {
    const res = await axios.get(`${host + api}`);
    return res.data;
  },
};

export default apiProvinceVietNam;
