/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import UserService from '../service/UserServices';
import prismaUser from '../repositories/PrismaUser';

const userService = new UserService(prismaUser);
class UserController {
  async create(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const { name, email, password } = req.body;

    const user = await userService.createUser({
      name,
      email,
      password,
    });

    return res.json(user);
  }

  async findAllUsers(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const users = await userService.findUsers();

    return res.json(users);
  }

  async findUserById(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const { id } = req.params;
    const user = await userService.findUserById(id);

    return res.json(user);
  }

  async deleteUser(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const { id } = req.params;
    const user = await userService.deleteUser(id);

    return res.json(user);
  }
}

export default new UserController();
