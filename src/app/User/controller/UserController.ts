/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import UserService from '../service/UserServices';
import PrismaUser from '../repositories/PrismaUser';

const userService = new UserService(PrismaUser);
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
}

export default new UserController();
