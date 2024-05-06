import axios from "../axios";

type queryDataTS = {
  cinema: string | null;
  movie: string | null;
  movieHall: string | null;
  timeType: string | null;
};

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

  async advanceStatistic(data: queryDataTS) {
    const res = await axios.get(
      `/api/v1/user/statistic-admin?cinemaId=${data.cinema}&movieHallId=${data.movieHall}&movieId=${data.movie}&timeType=${data.timeType}`
    );
    return res.data;
  },

  async dailyStatistic(data: Date) {
    const res = await axios.get(`/api/v1/user/statistic-by-day?date=${data}`);
    return res.data;
  },

  async getUserStatistic(id: string) {
    const res = await axios.get(`/api/v1/user/get-statistic/${id}`);
    return res.data;
  },

  async getUserMoneyStatistic(id: string) {
    const res = await axios.get(`/api/v1/user/get-money-statistic/${id}`);
    return res.data;
  },

  async getStatistic() {
    const res = await axios.get(`/api/v1/user/statistic`);
    return res.data;
  },

  async getStatisticRegister() {
    const res = await axios.get(`/api/v1/user/statistic/register`);
    return res.data;
  },

  async getAdminDashboard() {
    const res = await axios.get(`/api/v1/user/dashboard`);
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
  async searchUserByAdmin(name: string, page: number, limit: number) {
    const res = await axios.get(
      `api/v1/user/search-by-admin?name=${name}&page=${page}&limit=${limit}`
    );
    return res.data;
  },

  async getUserByType(type: string) {
    const res = await axios.get(`api/v1/user/search?type=${type}`);
    return res.data;
  },

  async statisticCinema(cinemaId: string) {
    const res = await axios.get(
      `/api/v1/user/statistic-cinema?cinemaId=${cinemaId}`
    );
    return res.data;
  },
};

export default userServices;
