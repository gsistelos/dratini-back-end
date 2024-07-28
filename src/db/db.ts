import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

const { Client } = pg;

const client = new Client({
	connectionString: process.env.POSTGRES_URL || "",
});

await client.connect();

const db = drizzle(client);

export default db;
