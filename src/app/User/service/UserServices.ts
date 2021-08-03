import IUsersRepository from '../repositories/IUserRepository';
import User from '../UserEntity';

class UserService {
  constructor(private repository: IUsersRepository) {
    this.repository = repository;
  }

  async createUser({
    name, username, email, password,
  }: User): Promise<User | string> {
    const userAlreadyExists = await this.repository.exists(email);

    if (userAlreadyExists) {
      return 'User already exists!';
    }

    const user = await this.repository.create({
      name, username, email, password,
    });
    return user;
  }

  async findUsers(): Promise<User[]> {
    const users = await this.repository.findAllUsers();
    return users;
  }

  async findOneUser(username: string): Promise<User> {
    const user = await this.repository.findOneUser(username);
    return user;
  }

  async deleteUser(username: string): Promise<User> {
    const user = await this.repository.deleteUser(username);
    return user;
  }

  async updateUser({ name, username, email }: User): Promise<User> {
    const res = await this.repository.updateUser(name, username, email);
    return res;
  }

/*   async authenticate(username: string, password: string): Promise<User> {
    const userExists = await this.repository.exists();
  } */
}

export default UserService;
