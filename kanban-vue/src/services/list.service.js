import api from './api';

export default class ListService {
  static findListsByBoard(board_id) {
    return api.get('/lists?board_id=' + board_id);
  }

  static createList(list, user_id) {
    return api.post("/lists", { board_id: list.board_id, title: list.title, order: list.order }, { headers: { user_id } });
  }

  static updateListTitle(_id, title, user_id) {
    return api.put('/lists/updateTitle', { _id, title }, { headers: { user_id } });
  }
}