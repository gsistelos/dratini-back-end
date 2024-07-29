import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import type { usersTable } from "../db/schema.js";

export type User = InferSelectModel<typeof usersTable>;
export type UserInput = InferInsertModel<typeof usersTable>;
