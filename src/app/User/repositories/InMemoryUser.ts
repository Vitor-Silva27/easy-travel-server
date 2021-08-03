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

    async exists(username: string): Promise<boolean> {
      const user = this.users.some((existingUser) => existingUser.username === username);
      return user;
    }

    async findAllUsers(): Promise<User[]> {
      return this.users;
    }

    async findOneUser(username: string): Promise<User> {
      return this.users.find((user) => user.username === username);
    }

    async deleteUser(username: string): Promise<User> {
      const userSelected = this.users.find((user) => user.username === username);
      const index = this.users.indexOf(userSelected);
      const user = this.users.splice(index, 1);
      return user[0];
    }

    async updateUser(name:string, username: string, email: string): Promise<User> {
      const userSelected = this.users.find((user) => user.username === username);
      const index = this.users.indexOf(userSelected);
      this.users[index].email = email;
      this.users[index].name = name;
      const user = this.users[index];
      return user[0];
    }
}

export default UserRepository;
