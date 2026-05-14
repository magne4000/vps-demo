import "dotenv/config";
import SQLite from "better-sqlite3";
import { Kysely, PostgresDialect, SqliteDialect } from "kysely";
import { Pool } from "pg";
import type { Database } from "./types";

export function dbKysely() {
  const dialect = process.env.DATABASE_URL?.includes("postgresql://")
    ? new PostgresDialect({
        pool: new Pool({
          connectionString: process.env.DATABASE_URL,
          max: 10,
        }),
      })
    : new SqliteDialect({
        database: new SQLite(process.env.DATABASE_URL),
      });
  return new Kysely<Database>({
    dialect,
  });
}
