/* eslint-disable no-unused-vars */
import User from '../UserEntity';

interface IUsersRepository {
  create(user: User): Promise<User>;
  exists(email: string): Promise<boolean>;
  findAllUsers(): Promise<User[]>
  findUserById(id: string): Promise<User>
}

export default IUsersRepository;
