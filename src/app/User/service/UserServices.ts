import { hashSync } from 'bcryptjs';
import PrismaUserRepository from '../repositories/PrismaUser';
import User from '../UserEntity';

class UserService {
  async createUser({ name, email, password }: User): Promise<User> {
    const passwordHash = await this.hashPassword(password);

    const userAlreadyExists = PrismaUserRepository.exists(email);

    if (userAlreadyExists) {
      throw new Error('User already exists!');
    }

    const user = PrismaUserRepository.create({ name, email, password: passwordHash });
    return user;
  }

  public async hashPassword(password: string): Promise<string> {
    const hash = hashSync(password, 10);
    return hash;
  }
}

export default new UserService();
