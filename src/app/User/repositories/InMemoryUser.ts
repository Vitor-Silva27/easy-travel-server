import { v4 as uuid } from 'uuid';
import User from '../UserEntity';

class UserRepository {
    private users: User[] = [];

    async create(user: User): Promise<User> {
      Object.assign(user, {
        id: uuid(),
      });

      this.users.push(user);
      return user;
    }

    async exists(email: string): Promise<boolean> {
      const userExists = this.users.some((user) => user.email === email);
      return userExists;
    }
}

export default UserRepository;
