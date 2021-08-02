import User from '../UserEntity';
import IUsersRepository from './IUserRepository';
import prisma from '../../../database/client';

class PrismaUserRepository implements IUsersRepository {
  async create({ name, email, password }: User): Promise<User> {
    const user = prisma.user.create({
      data: {
        name,
        email,
        password,
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
}

export default new PrismaUserRepository();
