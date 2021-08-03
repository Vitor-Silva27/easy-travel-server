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

    expect(await userService.createUser(userData)).toEqual('User already exists!');
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
    expect(users.email).toEqual(userData.email);
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
    expect(usersDeleted).toEqual(undefined);
  });

  it('should update a user', async () => {
    const userData: User = {
      name: 'test name',
      username: 'testuser',
      email: 'test@test.com',
      password: '123456',
    };
    await userService.createUser(userData);
    await userService.updateUser('outro-nome', userData.username, userData.email);
    const updatedUser = await userService.findOneUser(userData.username);
    expect(updatedUser.name).toEqual('outro-nome');
  });
});
