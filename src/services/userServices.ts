import axios from "../axios";

const userServices = {
  async handleRegister(informationUser: object) {
    const res = await axios.post("/api/v1/user/register", informationUser);
    return res.data;
  },
  async handleRegisterByAdmin(informationUser: object) {
    const res = await axios.post(
      `api/v1/user/register-by-admin?isAdmin=${true}`,
      informationUser
    );
    return res.data;
  },
  async getUserById(id: string) {
    const res = await axios.get(`/api/v1/user/${id}/info-user`);
    return res.data;
  },

  async deleteUserById(id: string) {
    const res = await axios.delete(`/api/v1/user/delete/${id}`);
    return res.data;
  },
  async getProfile() {
    const res = await axios.get(`/api/v1/authenticate/get-profile`);
    return res.data;
  },
  async updateProfile(informationUser: object, userId: string | undefined) {
    const res = await axios.patch(
      `/api/v1/user/${userId}/update`,
      informationUser
    );
    return res.data;
  },
  async updateProfileByAdmin(informationUser: object, userId: string) {
    const res = await axios.patch(
      `/api/v1/user/${userId}/update?isAdmin=${true}`,
      informationUser
    );
    return res.data;
  },
  async getAllUsersByRule(limit: number, page: number) {
    const res = await axios.get(
      `/api/v1/user/all-user?page=${page}&limit=${limit}`
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
