import axios from "../axios";

const userServices = {
  async handleRegister(informationUser: object) {
    const res = await axios.post("/api/v1/user/register", informationUser);
    return res.data;
  },
  async getUserById(id: string) {
    const res = await axios.get(`/api/v1/user/${id}/info-user`);
    return res.data;
  },
  async getProfile() {
    const res = await axios.get(`/api/v1/authenticate/get-profile`);
    return res.data;
  },
  async updateProfile(informationUser: object, userId: string) {
    const res = await axios.patch(
      `/api/v1/user/${userId}/update`,
      informationUser
    );
    return res.data;
  },
  async changePassword(passwordData: object, userId: string) {
    const res = await axios.patch(
      `/api/v1/user/${userId}/update-password`,
      passwordData
    );
    return res.data;
  },
};

export default userServices;
