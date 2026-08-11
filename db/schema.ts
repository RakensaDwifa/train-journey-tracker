import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const journeys = sqliteTable("journeys", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  date: text("date").notNull(),
  origin: text("origin").notNull(),
  destination: text("destination").notNull(),
  train_name: text("train_name").notNull(),
  class_type: text("class_type").notNull(),
  price: integer("price").notNull(),
  status: text("status").notNull(),
});

export type Journey = typeof journeys.$inferSelect;
export type NewJourney = typeof journeys.$inferInsert;
