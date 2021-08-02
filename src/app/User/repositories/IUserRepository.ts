/* eslint-disable no-unused-vars */
import User from '../UserEntity';

interface IUsersRepository {
  create(user: User): Promise<User>;
  exists(email: string): Promise<boolean>;
}

export default IUsersRepository;
