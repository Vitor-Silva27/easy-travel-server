import IUsersRepository from '../repositories/IUserRepository';
import User from '../UserEntity';

class UserService {
  constructor(private repository: IUsersRepository) {
    this.repository = repository;
  }

  async createUser({ name, email, password }: User): Promise<User | string> {
    const userAlreadyExists = await this.repository.exists(email);

    if (userAlreadyExists) {
      return 'User already exists!';
    }

    const user = await this.repository.create({ name, email, password });
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

  async updateUser({ id, name, email }: User): Promise<User> {
    const res = await this.repository.updateUser(id, name, email);
    return res;
  }
}

export default UserService;
