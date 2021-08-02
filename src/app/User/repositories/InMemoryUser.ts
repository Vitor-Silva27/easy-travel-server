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
      const user = this.users.some((existingUser) => existingUser.email === email);
      return user;
    }
}

export default UserRepository;
