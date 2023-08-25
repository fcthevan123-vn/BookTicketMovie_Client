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
};

export default authenticateServices;
