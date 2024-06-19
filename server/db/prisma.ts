import { PrismaClient } from '@prisma/client';

const environment = process.env.NODE_ENV || 'development';

let databaseUrl;

switch (environment) {
  case 'development':
    databaseUrl = process.env.DATABASE_URL_DEVELOPMENT;
    break;
  case 'testing':
    databaseUrl = process.env.DATABASE_URL_TESTING;
    break;
  case 'production':
    databaseUrl = process.env.DATABASE_URL_PRODUCTION;
    break;
  default:
    throw new Error('Unknown environment');
}

process.env.DATABASE_URL = databaseUrl;

export const prisma = new PrismaClient();
