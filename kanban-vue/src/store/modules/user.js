function state() {
  return {
    user: JSON.parse(localStorage.getItem("user")) || {},
    token: JSON.parse(localStorage.getItem("token")) || ""
  };
}

const mutations = {
  setUser(state, user) {
    state.user = user;
    localStorage.setItem("user", JSON.stringify(user));
  },
  setToken(state, token) {
    state.token = token;
    localStorage.setItem("token", JSON.stringify(token));
  },
  clear(state) {
    state.user = {};
    state.token = "";
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }
};

const actions = {
  setUser({ commit }, user) {
    commit("setUser", user);
  },
  setToken({ commit }, token) {
    commit("setToken", token);
  }
};

const getters = {
  getUser: state => {
    return state.user;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
