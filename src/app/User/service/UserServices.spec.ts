/* eslint-disable no-undef */
import IUsersRepository from '../repositories/IUserRepository';
import UserServices from './UserServices';
import UserRepository from '../repositories/InMemoryUser';
import User from '../UserEntity';

describe('User Services', () => {
  let usersRepository: IUsersRepository;
  let userService: UserServices;

  beforeAll(() => {
    usersRepository = new UserRepository();
    userService = new UserServices(usersRepository);
  });

  it('should be able to create a user', async () => {
    const userData: User = {
      name: 'test name',
      username: 'testuser',
      email: 'test@test.com',
      password: '123456',
    };
    const user = await userService.createUser(userData);

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a user', async () => {
    const userData: User = {
      name: 'test name',
      username: 'testuser',
      email: 'test@test.com',
      password: '123456',
    };
    await userService.createUser(userData);

    expect(await userService.createUser(userData)).toEqual(new Error('User already exists!'));
  });

  it('should return an array of users', async () => {
    const users = userService.findUsers();
    expect(typeof (users)).toEqual('object');
  });

  it('should find a user', async () => {
    const userData: User = {
      name: 'test name',
      username: 'testuser',
      email: 'test@test.com',
      password: '123456',
    };
    await userService.createUser(userData);
    const users = await userService.findOneUser(userData.username);
    expect(users.name).toEqual(userData.name);
  });

  it('should delete a user', async () => {
    const userData: User = {
      name: 'test name',
      username: 'testuser',
      email: 'test@test.com',
      password: '123456',
    };
    await userService.createUser(userData);
    const users = await userService.deleteUser(userData.username);
    const usersDeleted = await userService.findOneUser(users.username);
    expect(usersDeleted).toEqual(new Error('User does not exists!'));
  });
});
