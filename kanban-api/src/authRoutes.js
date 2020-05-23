const { Router } = require('express');
const AuthController = require('./controllers/AuthController');

const routes = Router();

routes.post('/auth/register', AuthController.register);
routes.post('/auth/authenticate', AuthController.authencicate);

module.exports = routes;