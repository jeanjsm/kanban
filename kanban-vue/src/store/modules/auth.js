function state() {
  return {
    auth: JSON.parse(window.localStorage.getItem("auth_data")) || ""
  };
}

const mutations = {
  login(state, payload) {
    state.auth = payload;
    window.localStorage.setItem("auth_data", JSON.stringify(payload));
  },
  logout(state) {
    state.auth = {};
    window.localStorage.removeItem("auth_data");
  },
  clear() {
    state.auth = {};
    localStorage.removeItem("auth_data");
  }
};

const actions = {
  login({ commit }, payload) {
    commit("login", payload);
  },
  logout({ commit }) {
    commit("logout");
  }
};

const getters = {
  isLoggedIn(state) {
    return state.auth.token ? true : false;
  },
  token(state) {
    return state.auth.token;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
};
