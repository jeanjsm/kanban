import api from './api';

export default class AuthService {
  static authenticate(user) {
    return api.post('/auth/authenticate', user)
  }

  static findUser(param, idsUserAdded) {
    return api.get('/auth/users?param=' + param + '&added=' + idsUserAdded);
  }

  static register(user) {
    return api.post('/auth/register', user);
  }

  static updateUser(user) {
    return api.put('/auth/users', user);
  }
}
