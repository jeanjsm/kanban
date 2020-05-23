const { Router } = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');
const authMiddleware = require("./middlewares/auth");
const PendenciaController = require('./controllers/PendenciaController');
const BoardController = require('./controllers/BoardController');
const ListController = require('./controllers/ListController');
const CardController = require('./controllers/CardController');
const CommentController = require('./controllers/CommentController');
const AttachmentController = require('./controllers/AttachmentController');
const LabelController = require('./controllers/LabelController');

const routes = Router();
// routes.use(authMiddleware);

routes.get('/pendencias', PendenciaController.index);
routes.post('/pendencias', PendenciaController.store);

routes.get('/boards', BoardController.index);
routes.get(`/boards/:board_id`, BoardController.findById);
routes.post('/boards', BoardController.store);

routes.get('/lists', ListController.index);
routes.post('/lists', ListController.store);

routes.get('/cards', CardController.index);
routes.get('/cards/:card_id', CardController.findCard);
routes.post('/cards', CardController.store);
routes.delete('/cards', CardController.delete);
routes.post('/cards/added', CardController.added);
routes.put('/cards', CardController.update);

routes.get('/labels', LabelController.index);
routes.post('/labels', LabelController.store);

routes.get('/cards/:card_id/comments', CommentController.index);
routes.post('/cards/:card_id/comments', CommentController.store);
routes.delete('/cards/:card_id/comments/:comment_id', CommentController.delete);
routes.put('/cards/:card_id/comments', CommentController.update);

routes.get('/cards/:card_id/files', AttachmentController.index);
routes.post('/cards/:card_id/files', multer(multerConfig).single('file'), AttachmentController.upload);
routes.delete('/cards/files/:id', AttachmentController.delete);

module.exports = routes;