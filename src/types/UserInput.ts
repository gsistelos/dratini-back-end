import type { InferInsertModel } from "drizzle-orm";
import type { usersTable } from "../db/schema.js";

export type UserInput = InferInsertModel<typeof usersTable>;
