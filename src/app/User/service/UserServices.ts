import { hashSync } from 'bcryptjs';
import PrismaUserRepository from '../repositories/PrismaUser';
import User from '../UserEntity';

class UserService {
<<<<<<< HEAD
  // eslint-disable-next-line no-useless-constructor
  constructor(private repository: IUsersRepository) {
    this.repository = repository;
  }

  async createUser({ name, email, password }: User): Promise<User | string> {
    const userAlreadyExists = await this.repository.exists(email);

    if (userAlreadyExists) {
      return 'User already exists!';
    }
    const passwordHash = await this.hashPassword(password);

    const user = await this.repository.create({ name, email, password: passwordHash });
=======
  async createUser({ name, email, password }: User): Promise<User> {
    const passwordHash = await this.hashPassword(password);

    const userAlreadyExists = PrismaUserRepository.exists(email);

    if (userAlreadyExists) {
      throw new Error('User already exists!');
    }

    const user = PrismaUserRepository.create({ name, email, password: passwordHash });
>>>>>>> parent of e613704 (passed test for create a user)
    return user;
  }

  public async hashPassword(password: string): Promise<string> {
    const hash = hashSync(password, 10);
    return hash;
  }
}

export default new UserService();
