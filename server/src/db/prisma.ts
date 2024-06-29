import { PrismaClient } from "@prisma/client";

const environment = process.env.NODE_ENV || "development";

let databaseUrl;

switch (environment) {
	case "development":
		databaseUrl = process.env.DATABASE_URL_DEVELOPMENT;
		break;
	case "testing":
		databaseUrl = process.env.DATABASE_URL_TESTING;
		break;
	case "production":
		databaseUrl = process.env.DATABASE_URL_PRODUCTION;
		break;
	default:
		throw new Error("Unknown environment");
}

process.env.DATABASE_URL = databaseUrl;

//! Try omit option later, didn't work on 28/06/24 despite updating
//! to latest version of prisma and prisma client
// const prisma = new PrismaClient({ omit: { user: { password: true } } });
const prisma = new PrismaClient();

export default prisma;
