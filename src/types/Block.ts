import type { InferSelectModel } from "drizzle-orm";
import type { blocksTable } from "../db/schema.js";

export type Block = InferSelectModel<typeof blocksTable>;
