import axios from "../axios";

const authenticateServices = {
  async handleLogin(email: string, password: string) {
    const res = await axios.post("/api/v1/authenticate/login", {
      email,
      password,
    });
    return res.data;
  },
  async handleLogout() {
    const res = await axios.post("/api/v1/authenticate/logout");
    return res.data;
  },
  async handleVerifyEmail(userId: string) {
    const res = await axios.post(`/api/v1/authenticate/verify-email/${userId}`);
    return res.data;
  },

  async handleConfirmEmail(token: string, userId: string) {
    const res = await axios.post(
      `/api/v1/authenticate/confirm-email/${token}?user=${userId}`
    );
    return res.data;
  },
};

export default authenticateServices;
