/* eslint-disable object-curly-newline */
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import IUsersRepository from '../repositories/IUserRepository';
import User from '../UserEntity';

class UserService {
  constructor(private repository: IUsersRepository) {
    this.repository = repository;
  }

  async createUser({ name, username, email, password }: User): Promise<User | string> {
    const userAlreadyExists = await this.repository.exists(username);

    if (userAlreadyExists) return 'User already exists!';

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

  async updateUser(name: string, username: string, email: string): Promise<User> {
    const res = await this.repository.updateUser(name, username, email);
    return res;
  }

  async authenticate(username: string, password: string): Promise<string> {
    const userExists = await this.repository.exists(username);

    if (!userExists) return 'username or password is wrong!';

    const user = await this.repository.findOneUser(username);
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) return 'username or password is wrong!';

    const token = this.signToken(user.username);

    return token;
  }

  private async signToken(username: string) {
    const token = sign({}, process.env.TOKEN_KEY, {
      subject: username,
      expiresIn: '20s',
    });

    return token;
  }
}

export default UserService;
