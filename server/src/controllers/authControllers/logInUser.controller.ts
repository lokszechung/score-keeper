import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import { prisma } from '../../db/prisma';
import generateToken from '../../utils/generateToken';

const logInUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const passwordMatch = await bcryptjs.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    generateToken(user.id, res);

    res.status(200).json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error('Error in login controller', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default logInUser;
