/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import UserService from '../service/UserServices';
import prismaUser from '../repositories/PrismaUser';

const userService = new UserService(prismaUser);
class UserController {
  async create(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const { name, username, email, password } = req.body;

    const user = await userService.createUser({
      name,
      username,
      email,
      password,
    });

    if (user instanceof Error) {
      return res.status(409).json({ error: user.message });
    }
    return res.json(user);
  }

  async findAllUsers(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const users = await userService.findUsers();

    return res.json(users);
  }

  async findOneUser(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const { username } = req.params;
    const user = await userService.findOneUser(username);

    return res.json(user);
  }

  async deleteUser(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const { username } = req.params;
    const user = await userService.deleteUser(username);

    return res.json(user);
  }

  async updateUser(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const { id } = req.params;
    const { name, username, email } = req.body;
    const user = await userService.updateUser(id, name, username, email);

    return res.json(user);
  }

  async authenticate(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const { username, password } = req.body;

    const response = await userService.authenticate(username, password);

    if (response instanceof Error) {
      return res.status(401).json({ error: response.message });
    }
    return res.json(response);
  }

  async recoverUserInfo(req: Request, res:Response): Promise<Response<any, Record<string, any>>> {
    const authHeader = req.headers.authorization;

    const [, token] = authHeader.split(' ');

    const user = await userService.recoverUserInfo(token);

    if (user) {
      return res.json(user);
    }
    return res.status(401).json({ err: 'token is invalid' });
  }

  async buyTrip(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const { tripId, userId } = req.body;

    const response = await userService.buyTrip(tripId, userId);

    return res.json(response);
  }
}

export default new UserController();
