import { Router } from 'express';

import userController from '../app/User/controller/UserController';
import auth from '../middleware/Authentication';

const userRoutes = Router();

userRoutes.post('/users/login', userController.authenticate);
userRoutes.post('/users', userController.create);
userRoutes.get('/users', userController.findAllUsers);
userRoutes.get('/user/:username', auth, userController.findOneUser);
userRoutes.get('/user', userController.recoverUserInfo);

userRoutes.delete('/user/:username', auth, userController.deleteUser);
userRoutes.put('/user/:id', auth, userController.updateUser);

userRoutes.post('/user/buy', userController.buyTrip);

export default userRoutes;
