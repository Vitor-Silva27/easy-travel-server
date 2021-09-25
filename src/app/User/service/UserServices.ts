/* eslint-disable camelcase */
/* eslint-disable object-curly-newline */
import { compare } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import { PassengerOnTrip } from '.prisma/client';
import IUsersRepository from '../repositories/IUserRepository';
import User from '../UserEntity';

interface UserData {
  username: string;
  id: string;
  is_admin: boolean;
}

interface AuthResponse {
  user: UserData;
  token: string;
}
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

  async findOneUser(username: string): Promise<UserData | Error> {
    const user = await this.repository.findOneUser(username);
    const userData: UserData = {
      id: user.id,
      username: user.username,
      is_admin: user.is_admin,
    };
    if (!user) return new Error('User does not exists!');

    return userData;
  }

  async deleteUser(username: string): Promise<User> {
    const user = await this.repository.deleteUser(username);
    return user;
  }

  async updateUser(id: string, name: string, username: string, email: string): Promise<User> {
    const res = await this.repository.updateUser(id, name, username, email);
    return res;
  }

  async authenticate(username: string, password: string): Promise<AuthResponse | Error> {
    const userExists = await this.repository.exists(username);

    if (!userExists) return new Error('username or password is wrong!');

    const user = await this.repository.findOneUser(username);
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) return new Error('username or password is wrong!');

    const token = await this.signToken(user.username, user.id);
    return {
      user: {
        username: user.username,
        id: user.id,
        is_admin: user.is_admin,
      },
      token,
    };
  }

  async recoverUserInfo(token: string): Promise<UserData | Error> {
    const data = verify(token, process.env.TOKEN_KEY);
    const user = this.findOneUser(data.sub.toString());
    return user;
  }

  async buyTrip(tripId: string, userId: string): Promise<PassengerOnTrip> {
    const res = await this.repository.buyTrip(tripId, userId);

    return res;
  }

  private async signToken(username: string, id: string) {
    const token = sign({
      id,
    }, process.env.TOKEN_KEY, {
      subject: username,
      expiresIn: '3600s',
    });

    return token;
  }
}

export default UserService;
