import { actionTypes } from '../../commons/constants';
import BoardService from "@/services/board.service";
import ListService from "@/services/list.service";
import CardService from "@/services/card.service";

export default {
  [actionTypes.auth.LOGIN]({ commit }, payload) {
    commit('login', payload);
  },
  [actionTypes.auth.LOGOUT]({ commit }) {
    commit('logout');
  },

  [actionTypes.user.SET_USER]({ commit }, user) {
    commit("setUser", user);
  },
  [actionTypes.user.SET_TOKEN]({ commit }, token) {
    commit("setToken", token);
  },

  async [actionTypes.app.LOAD_BOARDS]({ commit }, user_id) {
    const { data } = await BoardService.loadBoards(user_id);
    commit("addBoards", data);
  },
  async [actionTypes.app.CREATE_BOARD](context, board) {
    const { data } = await BoardService.createBoard(this.state.user._id, board);
    context.commit("addBoard", data);
  },
  async [actionTypes.app.CREATE_BOARD]({ commit }, boardId) {
    commit("clearLists");
    const { data: listsBoard } = await ListService.findListsByBoard(boardId);
    commit("addLists", listsBoard);
    if (listsBoard) {
      listsBoard.map(async (list) => {
        list.cards = [];
        const { data: cards } = await CardService.loadCards(list._id);
        // list.cards = cards;
        commit("addCardsToList", { list_id: list._id, cards });
      });
    }
  },
  [actionTypes.app.ADD_LIST]({ commit }, payload) {
    commit("addList", payload);
  },
  [actionTypes.app.ADD_CARDS_TO_LIST]({ commit }, payload) {
    commit("addCardsToList", payload);
  },
  [actionTypes.app.ADD_CARD_TO_LIST]({ commit }, payload) {
    commit("addCardToList", payload);
  },
  [actionTypes.app.REMOVE_CARD_FROM_LIST]({ commit }, payload) {
    commit("removeCardFromList", payload);
  },
};
