import { Router } from 'express';
import userController from './app/User/controller/UserController';

const routes = Router();

routes.get('/', (req, res) => {
  res.json({ message: 'Hello' });
});

routes.post('/users', userController.create);

export default routes;
