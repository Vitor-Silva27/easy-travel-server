/* eslint-disable object-curly-newline */
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import IUsersRepository from '../repositories/IUserRepository';
import User from '../UserEntity';

class UserService {
  constructor(private repository: IUsersRepository) {
    this.repository = repository;
  }

  async createUser({ name, username, email, password }: User): Promise<User | Error> {
    const userAlreadyExists = await this.repository.exists(email);

    if (userAlreadyExists) return new Error('User already exists!');

    const user = await this.repository.create({
      name, username, email, password,
    });
    return user;
  }

  async findUsers(): Promise<User[]> {
    const users = await this.repository.findAllUsers();
    return users;
  }

  async findOneUser(username: string): Promise<User | Error> {
    const user = await this.repository.findOneUser(username);

    if (!user) return new Error('User does not exists!');

    return user;
  }

  async deleteUser(username: string): Promise<User> {
    const user = await this.repository.deleteUser(username);
    return user;
  }

  async updateUser(id: string, name: string, username: string, email: string): Promise<User> {
    const res = await this.repository.updateUser(id, name, username, email);
    return res;
  }

  async authenticate(username: string, password: string): Promise<string | Error> {
    const userExists = await this.repository.exists(username);

    if (!userExists) return new Error('username or password is wrong!');

    const user = await this.repository.findOneUser(username);
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) return new Error('username or password is wrong!');

    const token = this.signToken(user.username, user.id, user.isAdmin);

    return token;
  }

  private async signToken(username: string, id: string, isAdmin: boolean) {
    const token = sign({
      username,
      id,
      isAdmin,
    }, process.env.TOKEN_KEY, {
      subject: username,
      expiresIn: '60s',
    });

    return token;
  }
}

export default UserService;
