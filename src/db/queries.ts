import "server-only";
import { db } from "./index";
import { feedTable } from "./schema";
import { InsertFeed } from "./types";
import { eq } from "drizzle-orm";

export async function addFeedToDatabase(newFeed: InsertFeed) {
  await db.insert(feedTable).values(newFeed).returning();
  return newFeed;
}

export async function getFeedsByUserId(userId: string) {
  return await db.select().from(feedTable).where(eq(feedTable.userId, userId));
}
