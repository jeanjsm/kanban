import { mutationTypes } from '../../commons/constants';

export default {
  [mutationTypes.auth.LOGIN](state, payload) {
    state.auth = payload;
    window.localStorage.setItem('auth_data', JSON.stringify(payload));
  },
  [mutationTypes.auth.LOGOUT](state) {
    state.auth = {};
    window.localStorage.removeItem('auth_data');
  },

  [mutationTypes.user.SET_USER](state, user) {
    state.user = user;
  },
  [mutationTypes.user.SET_TOKEN](state, token) {
    state.token = token;
  },

  [mutationTypes.app.CLEAR_LISTS](state) {
    state.lists = [];
  },
  [mutationTypes.app.ADD_BOARD](state, board) {
    state.boards.push(board);
  },
  [mutationTypes.app.ADD_BOARDS](state, boards) {
    state.boards = boards;
  },
  [mutationTypes.app.ADD_LISTS](state, payload) {
    state.lists = payload;
  },
  [mutationTypes.app.ADD_LIST](state, payload) {
    payload.cards = [];
    state.lists.push(payload);
  },
  [mutationTypes.app.UPDATE_LIST](state, payload) {
    state.lists.map((list) => {
      if (list._id === payload._id) {
        console.log(payload);
      }
    });
  },
  [mutationTypes.app.ADD_CARDS_TO_LIST](state, { list_id, cards }) {
    state.lists.map((list) => {
      if (list._id === list_id) {
        list.cards = cards;
      }
    });
  },
  [mutationTypes.app.ADD_CARD_TO_LIST](state, { list_id, card }) {
    state.lists.map((list) => {
      if (list._id === list_id) {
        list.cards.push(card);
      }
    });
  },
  [mutationTypes.app.REMOVE_CARD_FROM_LIST](state, card) {
    state.lists.map((list) => {
      if (list._id === card.list) {
        list.cards = list.cards.filter((card) => card._id !== card._id);
      }
    });
  },
}