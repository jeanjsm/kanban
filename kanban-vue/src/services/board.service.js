import api from './api';

export default class BoardService {

  static findById(id) {
    return api.get('/boards/' + id);
  }

  static loadBoards(user_id) {
    return api.get('/boards', { headers: { user_id } });
  }

  static createBoard(user_id, board) {
    return api.post('/boards', { title: board.title, private: false }, { headers: { user_id } });
  }

  static loadMembers(board_id) {
    return api.get(`/boards/${board_id}/members`);
  }

  static addMember(board_id, member_id) {
    return api.post(`/boards/${board_id}/members`, { id_member: member_id });
  }

}
