const { Router } = require('express');
const PendenciaController = require('./controllers/PendenciaController');
const BoardController = require('./controllers/BoardController');
const UserController = require('./controllers/UserController');
const ListController = require('./controllers/ListController');
const CardController = require('./controllers/CardController');

const routes = Router();

routes.get('/pendencias', PendenciaController.index);
routes.post('/pendencias', PendenciaController.store);

routes.get('/boards', BoardController.index);
routes.post('/boards', BoardController.store);

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

routes.get('/lists', ListController.index);
routes.post('/lists', ListController.store);

routes.get('/cards', CardController.index);
routes.post('/cards', CardController.store);
routes.delete('/cards', CardController.delete);
routes.post('/cards/added', CardController.added);
routes.put('/cards', CardController.update);

module.exports = routes;