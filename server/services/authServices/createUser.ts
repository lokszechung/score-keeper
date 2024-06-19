import { prisma } from '../../db/prisma';
import bcryptjs from 'bcryptjs';

type CreateUserData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export const createUser = async (createUserData: CreateUserData) => {
  const { password } = createUserData;

  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);

  console.log('hashedPassword', hashedPassword);

  const createdUser = await prisma.user.create({
    data: {
      ...createUserData,
      password: hashedPassword,
    },
  });

  const { password: _, ...user } = createdUser;

  return user;
};