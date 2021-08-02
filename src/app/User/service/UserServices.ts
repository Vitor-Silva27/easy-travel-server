import { hashSync } from 'bcryptjs';
import IUsersRepository from '../repositories/IUserRepository';
import User from '../UserEntity';

class UserService {
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
    return user;
  }

  async findUsers(): Promise<User[]> {
    const users = await this.repository.findAllUsers();
    return users;
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.repository.findUserById(id);
    return user;
  }

  async deleteUser(id: string): Promise<User> {
    const user = await this.repository.deleteUser(id);
    return user;
  }

  private async hashPassword(password: string): Promise<string> {
    const hash = hashSync(password, 10);
    return hash;
  }
}

export default UserService;
