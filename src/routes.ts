import { Router } from 'express';
import userController from './app/User/controller/UserController';

const routes = Router();

routes.get('/', (req, res) => {
  res.json({ message: 'Hello' });
});

// user routes
routes.post('/users', userController.create);
routes.get('/users', userController.findAllUsers);
routes.get('/user/:id', userController.findUserById);
routes.delete('/user/:id', userController.deleteUser);

export default routes;
