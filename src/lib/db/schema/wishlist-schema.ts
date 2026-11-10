/**
 * Wishlist Schema
 *
 * Database schema for user wishlists.
 * Links users to products they want to save for later.
 */

import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";
import { products } from "./products-schema";

/**
 * Wishlist Items Table
 * Stores products added to user wishlists.
 */
export const wishlistItems = pgTable("wishlist_items", {
    id: text("id").primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    productId: text("product_id")
        .notNull()
        .references(() => products.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Type exports
export type WishlistItem = typeof wishlistItems.$inferSelect;
export type NewWishlistItem = typeof wishlistItems.$inferInsert;
