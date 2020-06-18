import api from "./api";

export default class CardService {
  static loadCards(list_id) {
    return api.get("/cards?list_id=" + list_id);
  }

  static findCard(card_id) {
    return api.get("/cards/" + card_id);
  }

  static createCard(card, user_id) {
    return api.post("/cards", { list_id: card.list_id, title: card.title }, { headers: { user_id } });
  }

  static delete(card) {
    return api.delete('/cards?id=' + card._id);
  }

  static added(card) {
    return api.post('/cards/added', card);
  }

  static update(card) {
    return api.put('/cards', card);
  }

  static updateDescription(card_id, description) {
    return api.patch('/cards/description', { card_id, description });
  }

  static updateLabel(card_id, label_id) {
    return api.patch('/cards/label', { card_id, label_id });
  }

  static loadDescription(card_id) {
    return api.get(`/cards/${card_id}/description`);
  }
}
