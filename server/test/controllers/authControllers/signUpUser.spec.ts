import { jest } from '@jest/globals';
import { Request, Response } from 'express';
import { signUpUser } from '../../../src/controllers/authControllers/signUpUser.controller';
import { createUser } from '../../../src/services/authServices/createUser';

jest.mock('../../../src/services/authServices/createUser');

const mockCreateUser = createUser as jest.Mock<typeof createUser>;

describe('signUpUser controller tests', () => {
  let res: Partial<Response>;
  let req: Partial<Request>;
  let json: jest.Mock;
  let status: jest.Mock;

  beforeEach(() => {
    req = {};
    json = jest.fn();
    status = jest.fn().mockReturnValue({ json });
    res = {
      status: status as unknown as Response['status'],
      json: json as unknown as Response['json'],
    };
  });

  it('should return 400 if any field is missing', async () => {
    req.body = {
      firstName: 'John',
      email: 'john.doe@example.com',
      password: 'password',
      confirmPassword: 'password',
    };

    await signUpUser(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'All fields are required: firstName, lastName, email, password, confirmPassword',
    });
  });

  it('should return 400 if passwords do not match', async () => {
    req.body = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password',
      confirmPassword: 'confirm',
    };

    await signUpUser(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Passwords do not match',
    });
  });

  it('should return 201 if input is valid', async () => {
    req.body = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password',
      confirmPassword: 'password',
    };

    mockCreateUser.mockResolvedValue({
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    } as never);

    await signUpUser(req as Request, res as Response);

    expect(mockCreateUser).toHaveBeenCalledWith({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    });
    expect(res.status).toHaveBeenCalledWith(201);
  });
});
