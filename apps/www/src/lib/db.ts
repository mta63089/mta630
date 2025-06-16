import Database from "better-sqlite3"
import { drizzle } from "drizzle-orm/better-sqlite3"
import { sqliteTable, text } from "drizzle-orm/sqlite-core"

export const images = sqliteTable("images", {
  id: text("id").primaryKey(),
  url: text("url").notNull(),
  name: text("name"),
  tags: text("tags"),
  description: text("description"),
})

const sqlite = new Database("mydb.sqlite")
export const db = drizzle(sqlite)
