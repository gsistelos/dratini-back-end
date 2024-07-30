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
