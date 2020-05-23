import api from './api';

export default class AuthService {
  static authenticate(user) {
    return api.post('/auth/authenticate', user)
  }
}