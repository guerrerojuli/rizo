import { feedTable } from "./schema";

export type SelectFeed = typeof feedTable.$inferSelect;
export type InsertFeed = typeof feedTable.$inferInsert;