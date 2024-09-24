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
	following: many(followsTable),
	followers: many(followsTable),
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

export const followsTable = pgTable("follows", {
	id: uuid("id").primaryKey().defaultRandom(),
	followerId: uuid("follower_id")
		.references(() => usersTable.id, { onDelete: "cascade" })
		.notNull(),
	followedId: uuid("followed_id")
		.references(() => usersTable.id, { onDelete: "cascade" })
		.notNull(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const followsRelations = relations(followsTable, ({ one }) => ({
	follower: one(usersTable, {
		fields: [followsTable.followerId],
		references: [usersTable.id],
	}),
	followed: one(usersTable, {
		fields: [followsTable.followedId],
		references: [usersTable.id],
	}),
}));
