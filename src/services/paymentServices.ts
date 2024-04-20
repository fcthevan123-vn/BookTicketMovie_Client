import axios from "../axios";

const paymentServices = {
  async createPaymentURL(data: object) {
    const res = await axios.post("/api/v1/payment/create_payment_url", data);
    return res.data;
  },
  async returnURL(data: string) {
    const res = await axios.post(`/api/v1/payment/return_url?${data}`);
    return res.data;
  },
};

export default paymentServices;
