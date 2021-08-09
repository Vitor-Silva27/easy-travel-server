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

  async exists(username: string): Promise<boolean> {
    const userExists = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    return !!userExists;
  }

  async findAllUsers(): Promise<User[]> {
    const users = await prisma.user.findMany();
    return users;
  }

  async findOneUser(username: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: {
        username,
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

  // modify this method later
  async updateUser(name: string, username: string, email: string): Promise<User> {
    const user = await prisma.user.update({
      where: {
        username,
      },
      data: {
        name,
        email,
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
