import { Router } from 'express';

import userController from '../app/User/controller/UserController';
import auth from '../middleware/Authentication';

const userRoutes = Router();

userRoutes.post('/users', userController.create);
userRoutes.get('/users', userController.findAllUsers);
userRoutes.post('/users/login', userController.authenticate);

userRoutes.use(auth);

userRoutes.get('/user/:username', userController.findOneUser);
userRoutes.delete('/user/:username', userController.deleteUser);
userRoutes.put('/user/:id', userController.updateUser);

export default userRoutes;
