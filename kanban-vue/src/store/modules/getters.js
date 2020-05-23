import { getterTypes } from "../../commons/constants";

export default {
  // Auth
  [getterTypes.auth.IS_LOGGED_IN](state) {
    return state.auth.token ? true : false;
  },
  [getterTypes.auth.TOKEN](state) {
    return state.auth.token;
  },
  [getterTypes.app.GET_BOARDS](state) {
    return state.boards;
  },

  // User
  [getterTypes.user.GET_USER](state) {
    return state.user;
  },

  // App
  [getterTypes.app.GET_LISTS](state) {
    return state.lists;
  },
  [getterTypes.app.GET_CARDS](state, list_id) {
    console.log(list_id);
    let cards = [];
    state.lists.map((list) => {
      if (list._id === list_id) {
        cards = list.cards;
      }
    });
    return cards;
  },
};
