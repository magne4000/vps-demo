import { type Kysely, SqliteAdapter } from "kysely";
import type { Database } from "../types";

export async function up(db: Kysely<Database>): Promise<void> {
  const adapter = db.getExecutor().adapter;
  const isSqlite = adapter instanceof SqliteAdapter;

  await db.schema
    .createTable("todos")
    .addColumn("id", isSqlite ? "integer" : "serial", (col) => col.primaryKey())
    .addColumn("text", "text", (col) => col.notNull())
    .execute();
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.schema.dropTable("todos").execute();
}
