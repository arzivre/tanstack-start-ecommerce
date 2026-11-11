/**
 * Reviews Schema
 *
 * Database schema for product reviews in the multi-vendor marketplace.
 * Only customers who have purchased and paid for a product can leave a review.
 *
 * Real-world scenario:
 * - Reviews are tied to order items (proof of purchase)
 * - One review per order item
 * - Reviews require payment to be completed (paymentStatus: 'paid')
 */

import {
    boolean,
    integer,
    pgEnum,
    pgTable,
    text,
    timestamp,
    unique,
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema";
import { orderItems, orders } from "./order-schema";
import { products } from "./products-schema";
import { shops } from "./shop-schema";

// ============================================================================
// Enums
// ============================================================================

export const reviewStatusEnum = pgEnum("review_status", [
    "pending", // Awaiting moderation
    "approved", // Visible to public
    "rejected", // Rejected by admin/vendor
]);

// ============================================================================
// Product Reviews Table
// ============================================================================

export const productReviews = pgTable(
    "product_reviews",
    {
        id: text("id").primaryKey(),

        // Who left the review
        userId: text("user_id")
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),

        // Which product was reviewed
        productId: text("product_id")
            .notNull()
            .references(() => products.id, { onDelete: "cascade" }),

        // Which shop the product belongs to (denormalized for easier querying)
        shopId: text("shop_id")
            .notNull()
            .references(() => shops.id, { onDelete: "cascade" }),

        // Proof of purchase - links to the order item
        orderId: text("order_id")
            .notNull()
            .references(() => orders.id, { onDelete: "cascade" }),
        orderItemId: text("order_item_id")
            .notNull()
            .references(() => orderItems.id, { onDelete: "cascade" }),

        // Review content
        rating: integer("rating").notNull(), // 1-5 stars
        title: text("title").notNull(),
        comment: text("comment").notNull(),

        // Status for moderation
        status: reviewStatusEnum("status").notNull().default("approved"),

        // Helpful votes
        helpfulCount: integer("helpful_count").notNull().default(0),

        // Vendor response
        vendorResponse: text("vendor_response"),
        vendorRespondedAt: timestamp("vendor_responded_at"),

        // Verification badge
        isVerifiedPurchase: boolean("is_verified_purchase")
            .notNull()
            .default(true),

        // Timestamps
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at")
            .defaultNow()
            .$onUpdate(() => /* @__PURE__ */ new Date())
            .notNull(),
    },
    (table) => [unique("review_order_item_unique").on(table.orderItemId)],
);

// ============================================================================
// Review Helpful Votes Table
// ============================================================================

/**
 * Tracks which users found reviews helpful
 * Prevents duplicate voting
 */
export const reviewHelpfulVotes = pgTable(
    "review_helpful_votes",
    {
        id: text("id").primaryKey(),
        reviewId: text("review_id")
            .notNull()
            .references(() => productReviews.id, { onDelete: "cascade" }),
        userId: text("user_id")
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
        createdAt: timestamp("created_at").defaultNow().notNull(),
    },
    (table) => [unique("review_vote_unique").on(table.reviewId, table.userId)],
);

// ============================================================================
// Type Exports
// ============================================================================

export type ProductReview = typeof productReviews.$inferSelect;
export type NewProductReview = typeof productReviews.$inferInsert;
export type ReviewHelpfulVote = typeof reviewHelpfulVotes.$inferSelect;
export type NewReviewHelpfulVote = typeof reviewHelpfulVotes.$inferInsert;
