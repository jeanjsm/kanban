import express from 'express';
import AuthController from './controllers/AuthController';
const routes = express.Router();

const authController = new AuthController();

routes.post('/auth/register', authController.register);
routes.post('/auth/authenticate', authController.authenticate);

export default routes;
