import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

type DbInstance = ReturnType<typeof drizzle>;

let dbInstance: DbInstance | null = null;

export function getDb(): DbInstance {
  if (dbInstance) {
    return dbInstance;
  }

  const connectionString = process.env.POSTGRES_URL;
  if (!connectionString) {
    throw new Error("POSTGRES_URL environment variable is not set");
  }

  dbInstance = drizzle(postgres(connectionString), { schema });
  return dbInstance;
}

// Backward-compatible lazy export: existing `import { db }` callers keep working,
// but the connection is still created only when first used.
export const db = new Proxy({} as DbInstance, {
  get(_target, prop, receiver) {
    return Reflect.get(getDb() as object, prop, receiver);
  },
}) as DbInstance;
