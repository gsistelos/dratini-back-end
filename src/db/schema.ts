import { index, pgTable, text, uniqueIndex, uuid } from "drizzle-orm/pg-core";

export const usersTable = pgTable(
	"users",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		username: text("username").notNull(),
		email: text("email").unique().notNull(),
		password: text("password").notNull(),
	},
	(table) => {
		return {
			usernameIdx: index("username_idx").on(table.username),
			emailIdx: uniqueIndex("email_idx").on(table.email),
		};
	},
);
