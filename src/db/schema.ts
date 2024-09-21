import { relations } from "drizzle-orm";
import {
	index,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
	uuid,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable(
	"users",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		username: text("username").notNull(),
		email: text("email").unique().notNull(),
		password: text("password").notNull(),
		createdAt: timestamp("created_at").notNull().defaultNow(),
		updatedAt: timestamp("updated_at").notNull().defaultNow(),
	},
	(table) => {
		return {
			usernameIdx: index("username_idx").on(table.username),
			emailIdx: uniqueIndex("email_idx").on(table.email),
		};
	},
);

export const usersRelations = relations(usersTable, ({ many }) => ({
	blocking: many(blocksTable),
	blockedBy: many(blocksTable),
}));

export const blocksTable = pgTable("blocks", {
	id: uuid("id").primaryKey().defaultRandom(),
	blockerId: uuid("blocker_id")
		.references(() => usersTable.id, { onDelete: "cascade" })
		.notNull(),
	blockedId: uuid("blocked_id")
		.references(() => usersTable.id, { onDelete: "cascade" })
		.notNull(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const blocksRelations = relations(blocksTable, ({ one }) => ({
	blocker: one(usersTable, {
		fields: [blocksTable.blockerId],
		references: [usersTable.id],
	}),
	blocked: one(usersTable, {
		fields: [blocksTable.blockedId],
		references: [usersTable.id],
	}),
}));
