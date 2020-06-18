import api from './api';

export default class AuthService {
  static authenticate(user) {
    return api.post('/auth/authenticate', user)
  }

  static findUser(param) {
    return api.get('/auth/users?param=' + param);
  }
}
