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
}

export default new PrismaUserRepository();
