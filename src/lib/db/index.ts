import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import { relations } from "./schema/relations";

config({ path: [".env"] });
const connectionString = process.env.DATABASE_URL!;

const sql = neon(connectionString);
export const db = drizzle({ client: sql, relations });
