import { index, pgTable, text, uniqueIndex, uuid } from "drizzle-orm/pg-core";

export const users = pgTable(
	"users",
	{
		id: uuid("id").primaryKey(),
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
