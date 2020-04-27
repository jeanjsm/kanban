const axios = require('axios');
const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = {
  async index(request, response) {
    const users = await User.find();

    return response.json(users);
  },

  async store(request, response) {
    const { login, password,  } = request.body;

    const salt = 10;
    const hash = await bcrypt.hash(password, salt);

    let user = await User.findOne({ login: login })

    if (user) {
      return response.status(400).json({ error: 'Login is already in use.' })
    }

    user = await User.create({ login, password: hash });
    return response.json(user);
  }
}