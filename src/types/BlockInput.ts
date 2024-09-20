import type { InferInsertModel } from "drizzle-orm";
import type { blocksTable } from "../db/schema.js";

export type BlockInput = InferInsertModel<typeof blocksTable>;
