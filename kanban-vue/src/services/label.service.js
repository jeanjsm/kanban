import api from './api';

export default class LabelService {

  static findAllLabels() {
    return api.get('/labels');
  }

  static createLabel(label) {
    return api.post('/labels', label);
  }

}
