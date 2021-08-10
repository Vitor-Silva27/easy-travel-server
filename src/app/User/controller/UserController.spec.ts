import request from 'supertest';
import app from '../../../app';
import prisma from '../../../database/client';

describe('Create User Controller', () => {
  afterEach(async () => {
    const deleteUsers = prisma.user.deleteMany();

    await prisma.$transaction([
      deleteUsers,
    ]);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('Should be able to create a new user', async () => {
    const response = await request(app).post('/users').send({
      name: 'Test Integration',
      username: 'test-integration',
      email: 'testIntegration@test.com.br',
      password: '1234567',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('Should not be able to create a user with the same email', async () => {
    await request(app).post('/users').send({
      name: 'Test Integration',
      username: 'test-integration',
      email: 'testIntegration@test.com.br',
      password: '1234567',
    });

    const response = await request(app).post('/users').send({
      name: 'Test Integration',
      username: 'test-integration',
      email: 'testIntegration@test.com.br',
      password: '1234567',
    });

    expect(response.status).toBe(409);
  });

  it('Should find all users', async () => {
    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
  });
});
