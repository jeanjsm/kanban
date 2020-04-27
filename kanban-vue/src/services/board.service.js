import api from './api';

export default class BoardService {

  static loadBoards(user_id) {
    return api.get('/boards', { headers: { user_id } });
  }

}