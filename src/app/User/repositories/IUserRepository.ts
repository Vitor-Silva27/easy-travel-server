/* eslint-disable no-unused-vars */
import User from '../UserEntity';

interface IUsersRepository {
  create(user: User): Promise<User>;
  findAllUsers(): Promise<User[]>;
  findOneUser(identifier: string): Promise<User>;
  updateUser(id: string, name: string, username: string, email: string): Promise<User>;
  deleteUser(id: string): Promise<User>;
  exists(identifier: string): Promise<boolean>;
}

export default IUsersRepository;
