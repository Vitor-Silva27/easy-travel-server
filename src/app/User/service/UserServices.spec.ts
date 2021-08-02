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
      email: 'test@test.com',
      password: '123456',
    };
    const user = await userService.createUser(userData);

    expect(user).toHaveProperty('id');
  });
});
