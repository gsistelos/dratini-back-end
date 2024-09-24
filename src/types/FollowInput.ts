import type { InferInsertModel } from "drizzle-orm";
import type { followsTable } from "../db/schema.js";

export type FollowInput = InferInsertModel<typeof followsTable>;
