import api from '../services/api';

export default class CommentService {
  static findByCard(card_id) {
    return api.get(`/cards/${card_id}/comments`)
  }
  static create(card, comment, user) {
    return api.post(`/cards/${card._id}/comments`, comment, {
      headers: {
        user_id: user._id
      }
    });
  }
  static delete(comment) {
    return api.delete('/cards/comments/' + comment._id);
  }
}
