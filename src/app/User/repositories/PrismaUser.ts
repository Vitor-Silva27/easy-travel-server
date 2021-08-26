import { hashSync } from 'bcryptjs';
import User from '../UserEntity';
import IUsersRepository from './IUserRepository';
import prisma from '../../../database/client';

class PrismaUserRepository implements IUsersRepository {
  async create({ name, username, email, password }: User): Promise<User> {
    const passwordHash = await this.hashPassword(password);

    const user = prisma.user.create({
      data: {
        name,
        username,
        email,
        password: passwordHash,
      },
    });
    return user;
  }

  async exists(identifier: string): Promise<boolean> {
    const userExists = await prisma.user.findFirst({
      where: {
        OR: [
          {
            email: identifier,
          },
          {
            username: identifier,
          },
        ],
      },
    });
    return !!userExists;
  }

  async findAllUsers(): Promise<User[]> {
    const users = await prisma.user.findMany();
    return users;
  }

  async findOneUser(identifier: string): Promise<User> {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          {
            email: identifier,
          },
          {
            username: identifier,
          },
        ],
      },
    });
    return user;
  }

  async deleteUser(username: string): Promise<User> {
    const user = await prisma.user.delete({
      where: {
        username,
      },
    });
    return user;
  }

  async updateUser(id:string, name: string, username: string, email: string): Promise<User> {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        username,
      },
    });
    return user;
  }

  private async hashPassword(password: string): Promise<string> {
    const hash = hashSync(password, 10);
    return hash;
  }
}

export default new PrismaUserRepository();
