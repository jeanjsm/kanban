import Vue from 'vue'
import Vuex from 'vuex'
import ListService from '../services/list.service';
import CardService from '../services/card.service';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lists:[]
  },
  mutations: {
    addLists(state, payload) {
      state.lists = payload;
    },
    addList(state, payload) {
      payload.cards = [];
      state.lists.push(payload);
    },
    updateList(state, payload) {
      state.lists.map(list => {
        if (list._id === payload._id) {
          console.log(payload);
        }
      })
    },
    addCardsToList(state, {list_id, cards}) {
      state.lists.map(list => {
        if (list._id === list_id) {
          list.cards = cards;
        }
      })
    },
    addCardToList(state, {list_id, card}) {
      state.lists.map(list => {
        if (list._id === list_id) {
          list.cards.push(card);
        }
      })
    },
    removeCardFromList(state, card) {
      state.lists.map(list => {
        if (list._id === card.list) {
          list.cards = list.cards.filter(card => card._id !== card._id);
        }
      })
    }
  },
  actions: {
    async loadBoard({ commit }, board) {
      const { data: lists } = await ListService.findListsByBoard(board._id);
      if (lists) {
        lists.map(async list => {
          list.cards = [];
          const { data: cards } = await CardService.loadCards(list._id);
          list.cards = cards;
        })
      }
      commit("addLists", lists);
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
  },
  getters: {
    getCards: state => list_id => {
      let cards = [];
      state.lists.map(list => {
        if(list._id === list_id) {
          cards = list.cards;
        }
      })
      return cards;
    }
  },
  modules: {
  }
})
