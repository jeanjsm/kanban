import api from "./api";

export default class AttachmentService {
  static findByCard(card_id) {
    return api.get(`/cards/${card_id}/files`);
  }

  static upload(card_id, form) {
    return api.post(`/cards/${card_id}/files`, form);
  }

  static delete(attachment) {
    return api.delete('/cards/files/' + attachment._id);
  }
}
