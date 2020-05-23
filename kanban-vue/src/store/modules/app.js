import BoardService from "@/services/board.service";
import ListService from "@/services/list.service";
import CardService from "../../services/card.service";
import _ from 'lodash';

function state() {
  return {
    boards: [],
    lists: [],
    test: []
  };
}
const mutations = {
  addTest(state, payload) {
    state.test.push(payload);
  },
  clearLists(state) {
    state.lists = [];
  },
  addBoard(state, board) {
    state.boards.push(board);
  },
  addBoards(state, boards) {
    state.boards = boards;
  },
  addLists(state, payload) {
    state.lists = payload;
  },
  addList(state, payload) {
    payload.cards = [];
    state.lists.push(payload);
  },
  replaceCardsList(state, { list_id, cards }) {
    state.lists.map(list => {
      if (list._id === list_id) {
        list.cards = cards;
      }
    })
  },
  updateList(state, payload) {
    state.lists.map(list => {
      if (list._id === payload._id) {
        console.log(payload);
      }
    });
  },
  addCardsToList(state, { list_id, cards }) {
    state.lists.map(list => {
      if (list._id === list_id) {
        list.cards = cards;
      }
    });
  },
  addCardToList(state, { list_id, card }) {
    state.lists.map(list => {
      if (list._id === list_id) {
        list.cards.push(card);
      }
    });
  },
  removeCardFromList(state, card) {
    state.lists.map(list => {
      if (list._id === card.list) {
        list.cards = list.cards.filter(card => card._id !== card._id);
      }
    });
  },
  updateCard(state, cardChanged) {
    state.lists.map(list => {
      if (list._id === cardChanged.list) {
        list.cards.map(card => {
          if (card._id === cardChanged._id) {
            card = _.cloneDeep(cardChanged);
          }
        })
      }
    })
  }
};
const actions = {
  async loadBoards({ commit }, user_id) {
    const { data } = await BoardService.loadBoards(user_id);
    commit("addBoards", data);
  },
  async createBoard(context, board) {
    const { data } = await BoardService.createBoard(this.state.user._id, board);
    context.commit("addBoard", data);
  },
  async loadBoard({ commit, dispatch }, boardId) {
    commit("clearLists");
    const { data: listsBoard } = await ListService.findListsByBoard(boardId);
    if (listsBoard) {
      await listsBoard.map(async list => {
        list.cards = [];
      });
      commit("addLists", listsBoard);
      await listsBoard.map(async list => {
        // list.cards = [];
        dispatch("loadCards", list._id);
      });
    }
  },
  async loadCards({ commit }, list_id) {
    const { data: cards } = await CardService.loadCards(list_id);
    commit("addCardsToList", { list_id, cards });
  },

  async updateCardList({ commit }, { list_id, cards }) {
    let newCards = [];
    cards.map(async card =>{
      let cardChanged = _.cloneDeep(card);
      cardChanged.list = list_id;
      cardChanged = await CardService.update(cardChanged);
      newCards.push(cardChanged);
    });
    commit('replaceCardsList', { list_id, cards })
  },

  async updateCard({ commit, dispatch }, card) {
    const { data } = await CardService.update(card);
    commit('updateCard', data);
    dispatch("loadCards", data.list);
  },

  addList({ commit }, payload) {
    commit("addList", payload);
  },
  addCardsToList({ commit }, payload) {
    commit("addCardsToList", payload);
  },
  addCardToList({ commit }, payload) {
    commit("addCardToList", payload);
  },
  removeCardFromList({ commit }, payload) {
    commit("removeCardFromList", payload);
  }
};
const getters = {
  getCards: state => list_id => {
    console.log(list_id);
    state.lists.map(list => {
      if (list._id === list_id) return list.cards;
    });
    return [];
  },
  getBoards: state => {
    return state.boards;
  },
  getLists: state => {
    return state.lists;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
};
