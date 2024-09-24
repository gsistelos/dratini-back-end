import type { InferSelectModel } from "drizzle-orm";
import type { followsTable } from "../db/schema.js";

export type Follow = InferSelectModel<typeof followsTable>;
