import express from 'express';
import AuthController from './controllers/AuthController';
import BoardController from './controllers/BoardController';
import ListController from './controllers/ListController';
import CardController from './controllers/CardController';
import LabelController from './controllers/LabelController';
import CommentController from './controllers/CommentController';
import AttachmentController from './controllers/AttachmentController';
import multerConfig from './config/multer';
import multer from 'multer';
import authMiddleware from './middlewares/auth.ts';

const routes = express.Router();
routes.use(authMiddleware);

const authController = new AuthController();
const boardController = new BoardController();
const listController = new ListController();
const cardController = new CardController();
const labelController = new LabelController();
const commentController = new CommentController();
const attachmentController = new AttachmentController();

routes.post('/auth/register', authController.register);
routes.post('/auth/authenticate', authController.authenticate);
routes.get('/auth/users', authController.findUser);
routes.put('/auth/users', authController.updateUser);

routes.get('/boards', boardController.index);
routes.post('/boards', boardController.create);
routes.get('/boards/:board_id', boardController.findById);
routes.get('/boards/:board_id/members', boardController.loadMembers);
routes.post('/boards/:board_id/members', boardController.addMember);

routes.get('/lists', listController.index);
routes.post('/lists', listController.create);
routes.put('/lists/updateTitle', listController.updateTitle);

routes.get('/cards', cardController.index);
routes.get('/cards/:card_id', cardController.findCard);
routes.get('/cards/:card_id/description', cardController.loadDescription);
routes.post('/cards', cardController.create);
routes.put('/cards', cardController.update);
routes.delete('/cards', cardController.delete);

routes.patch('/cards/description', cardController.updateDescription);
routes.patch('/cards/label', cardController.updateLabel);

routes.get('/labels', labelController.index);
routes.post('/labels', labelController.create);

routes.get('/cards/:card_id/comments', commentController.index);
routes.post('/cards/:card_id/comments', commentController.create);

routes.get('/cards/:card_id/files', attachmentController.index);
routes.post('/cards/:card_id/files', multer(multerConfig).single('file'), attachmentController.upload);
routes.delete('/cards/files/:id', attachmentController.delete);

export default routes;
