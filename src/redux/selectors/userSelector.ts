interface userI {
  user: {
    isLoggedIn: boolean;
    userData: object | [];
  };
}

const isLoginSelector = (state: userI) => {
  return state.user.isLoggedIn;
};

const dataUser = (state: userI) => {
  return state.user.userData;
};

export default { isLoginSelector, dataUser };
