import { execSync } from "child_process";
import dotenv from "dotenv";
dotenv.config();

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
console.log("FIRST:::::: ", process.env.NODE_ENV);
console.log("HERE:::::: ", process.env.DATABASE_URL);

execSync("npx prisma db push", { stdio: "inherit", env: process.env });
