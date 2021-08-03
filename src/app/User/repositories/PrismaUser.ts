import { hashSync } from 'bcryptjs';
import User from '../UserEntity';
import IUsersRepository from './IUserRepository';
import prisma from '../../../database/client';

class PrismaUserRepository implements IUsersRepository {
  async create({ name, email, password }: User): Promise<User> {
    const passwordHash = await this.hashPassword(password);
    const user = prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash,
      },
    });
    return user;
  }

  async exists(email: string): Promise<boolean> {
    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return !!userExists;
  }

  async findAllUsers(): Promise<User[]> {
    const users = await prisma.user.findMany();
    return users;
  }

  async findUserById(id: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  }

  async deleteUser(id: string): Promise<User> {
    const user = await prisma.user.delete({
      where: {
        id,
      },
    });
    return user;
  }

  async updateUser(id: string, name: string, email: string): Promise<User> {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
      },
    });
    return user;
  }

  async authenticate() {

  }

  private async hashPassword(password: string): Promise<string> {
    const hash = hashSync(password, 10);
    return hash;
  }
}

export default new PrismaUserRepository();
