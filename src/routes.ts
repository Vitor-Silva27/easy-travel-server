import { Router } from 'express';
import userController from './app/User/controller/UserController';

const routes = Router();

routes.get('/', (req, res) => {
  res.json({ message: 'Hello' });
});

// user routes
routes.post('/users', userController.create);
routes.get('/users', userController.findAllUsers);
routes.get('/user/:username', userController.findOneUser);
routes.delete('/user/:username', userController.deleteUser);
routes.put('/user/:id', userController.updateUser);
routes.post('/users/login', userController.authenticate);

export default routes;
