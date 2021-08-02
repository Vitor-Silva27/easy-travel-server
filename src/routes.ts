import { Router } from 'express';
import userController from './app/User/controller/UserController';

const routes = Router();

routes.get('/', (req, res) => {
  res.json({ message: 'Hello' });
});

routes.get('/users', userController.findAllUsers);
routes.post('/users', userController.create);
routes.get('/users', userController.findUserById);

export default routes;
