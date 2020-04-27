import api from './api';

export default class ListService {
  static findListsByBoard(board_id) {
    return api.get('/lists?board_id=' + board_id);
  }

  static createList(list, user_id) {
    return api.post("/lists", { board_id: list.board_id, title: list.title }, { headers: { user_id } });
  }
}