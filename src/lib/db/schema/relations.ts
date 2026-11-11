import { defineRelations } from "drizzle-orm";
import { customerAddresses } from "./address-schema";
import * as attribute from "./attribute-schema";
import * as auth from "./auth-schema";
import { brands } from "./brand-schema";
import * as cart from "./cart-schema";
import { categories } from "./category-schema";
import * as coupons from "./coupon-schema";
import { emailDeliveries } from "./email-schema";
import { notifications } from "./notification-schema";
import * as order from "./order-schema";
import * as products from "./products-schema";
import * as review from "./review-schema";
import { shippingMethods } from "./shipping-schema";
import * as shop from "./shop-schema";
import { tags } from "./tags-schema";
import { taxRates } from "./tax-schema";
import { wishlistItems } from "./wishlist-schema";

const schema = {
    ...auth,
    ...shop,
    ...attribute,
    categories,
    brands,
    tags,
    taxRates,
    ...products,
    ...coupons,
    ...cart,
    customerAddresses,
    wishlistItems,
    shippingMethods,
    ...order,
    notifications,
    emailDeliveries,
    ...review,
};

export const relations = defineRelations(schema, (r) => ({
    user: {
        sessions: r.many.session(),
        accounts: r.many.account(),
        twoFactor: r.many.twoFactor(),
        // The vendor profile this user owns (0 or 1)
        vendor: r.one.vendors({
            from: r.user.id,
            to: r.vendors.userId,
            alias: "vendor_owner",
        }),
        // Vendors this user approved (admin side)
        approvedVendors: r.many.vendors({
            alias: "vendor_approver",
        }),
        couponUsages: r.many.couponUsage(),
        cartSessions: r.many.cartSessions(),
        addresses: r.many.customerAddresses(),
        wishlistItems: r.many.wishlistItems(),
        orders: r.many.orders(),
        reviews: r.many.productReviews(),
        reviewHelpfulVotes: r.many.reviewHelpfulVotes(),
    },

    session: {
        user: r.one.user({
            from: r.session.userId,
            to: r.user.id,
        }),
    },

    account: {
        user: r.one.user({
            from: r.account.userId,
            to: r.user.id,
        }),
    },

    twoFactor: {
        user: r.one.user({
            from: r.twoFactor.userId,
            to: r.user.id,
        }),
    },

    vendors: {
        user: r.one.user({
            from: r.vendors.userId,
            to: r.user.id,
            optional: false,
            alias: "vendor_owner",
        }),
        approver: r.one.user({
            from: r.vendors.approvedBy,
            to: r.user.id,
            alias: "vendor_approver",
        }),
        shops: r.many.shops(),
    },

    shops: {
        vendor: r.one.vendors({
            from: r.shops.vendorId,
            to: r.vendors.id,
            optional: false,
        }),
        categories: r.many.categories(),
        brands: r.many.brands(),
        attributes: r.many.attributes(),
        tags: r.many.tags(),
        taxRates: r.many.taxRates(),
        products: r.many.products(),
        coupons: r.many.coupons(),
        shippingMethods: r.many.shippingMethods(),
        orders: r.many.orders(),
        notifications: r.many.notifications(),
        reviews: r.many.productReviews(),
    },

    notifications: {
        shop: r.one.shops({
            from: r.notifications.shopId,
            to: r.shops.id,
            optional: false,
        }),
    },

    customerAddresses: {
        user: r.one.user({
            from: r.customerAddresses.userId,
            to: r.user.id,
            optional: false,
        }),
    },

    categories: {
        shop: r.one.shops({
            from: r.categories.shopId,
            to: r.shops.id,
        }),
        parent: r.one.categories({
            from: r.categories.parentId,
            to: r.categories.id,
            alias: "categoryHierarchy",
        }),
        children: r.many.categories({
            alias: "categoryHierarchy",
        }),
        products: r.many.products(),
        coupons: r.many.coupons({
            from: r.categories.id.through(r.couponCategories.categoryId),
            to: r.coupons.id.through(r.couponCategories.couponId),
        }),
    },

    brands: {
        shop: r.one.shops({
            from: r.brands.shopId,
            to: r.shops.id,
            optional: false,
        }),
        products: r.many.products(),
    },

    attributes: {
        shop: r.one.shops({
            from: r.attributes.shopId,
            to: r.shops.id,
            optional: false,
        }),
        values: r.many.attributeValues(),
        products: r.many.products({
            from: r.attributes.id.through(r.productAttributes.attributeId),
            to: r.products.id.through(r.productAttributes.productId),
        }),
        productAttributes: r.many.productAttributes(),
    },

    attributeValues: {
        attribute: r.one.attributes({
            from: r.attributeValues.attributeId,
            to: r.attributes.id,
            optional: false,
        }),
    },

    tags: {
        shop: r.one.shops({
            from: r.tags.shopId,
            to: r.shops.id,
            optional: false,
        }),
        products: r.many.products({
            from: r.tags.id.through(r.productTags.tagId),
            to: r.products.id.through(r.productTags.productId),
        }),
    },

    taxRates: {
        shop: r.one.shops({
            from: r.taxRates.shopId,
            to: r.shops.id,
            optional: false,
        }),
    },

    products: {
        shop: r.one.shops({
            from: r.products.shopId,
            to: r.shops.id,
            optional: false,
        }),
        category: r.one.categories({
            from: r.products.categoryId,
            to: r.categories.id,
        }),
        brand: r.one.brands({
            from: r.products.brandId,
            to: r.brands.id,
        }),
        taxRate: r.one.taxRates({
            from: r.products.taxId,
            to: r.taxRates.id,
        }),
        images: r.many.productImages(),

        // Many-to-many through the junction tables
        tags: r.many.tags({
            from: r.products.id.through(r.productTags.productId),
            to: r.tags.id.through(r.productTags.tagId),
        }),
        attributes: r.many.attributes({
            from: r.products.id.through(r.productAttributes.productId),
            to: r.attributes.id.through(r.productAttributes.attributeId),
        }),
        shippingMethods: r.many.shippingMethods({
            from: r.products.id.through(r.productShippingMethods.productId),
            to: r.shippingMethods.id.through(
                r.productShippingMethods.shippingMethodId,
            ),
        }),

        // Direct access to junction rows
        productAttributes: r.many.productAttributes(), // needed to read `value`
        productShippingMethods: r.many.productShippingMethods(),

        coupons: r.many.coupons({
            from: r.products.id.through(r.couponProducts.productId),
            to: r.coupons.id.through(r.couponProducts.couponId),
        }),
        cartItems: r.many.cartItems(),
        wishlistItems: r.many.wishlistItems(),
        orderItems: r.many.orderItems(),
        reviews: r.many.productReviews(),
    },

    productShippingMethods: {
        product: r.one.products({
            from: r.productShippingMethods.productId,
            to: r.products.id,
            optional: false,
        }),
        shippingMethod: r.one.shippingMethods({
            from: r.productShippingMethods.shippingMethodId,
            to: r.shippingMethods.id,
            optional: false,
        }),
    },

    productImages: {
        product: r.one.products({
            from: r.productImages.productId,
            to: r.products.id,
            optional: false,
        }),
    },

    productTags: {
        product: r.one.products({
            from: r.productTags.productId,
            to: r.products.id,
            optional: false,
        }),
        tag: r.one.tags({
            from: r.productTags.tagId,
            to: r.tags.id,
            optional: false,
        }),
    },

    productAttributes: {
        product: r.one.products({
            from: r.productAttributes.productId,
            to: r.products.id,
            optional: false,
        }),
        attribute: r.one.attributes({
            from: r.productAttributes.attributeId,
            to: r.attributes.id,
            optional: false,
        }),
    },

    coupons: {
        shop: r.one.shops({
            from: r.coupons.shopId,
            to: r.shops.id,
            optional: false,
        }),
        // Many-to-many through the junction tables
        products: r.many.products({
            from: r.coupons.id.through(r.couponProducts.couponId),
            to: r.products.id.through(r.couponProducts.productId),
        }),
        categories: r.many.categories({
            from: r.coupons.id.through(r.couponCategories.couponId),
            to: r.categories.id.through(r.couponCategories.categoryId),
        }),
        usages: r.many.couponUsage(),
    },

    couponProducts: {
        coupon: r.one.coupons({
            from: r.couponProducts.couponId,
            to: r.coupons.id,
            optional: false,
        }),
        product: r.one.products({
            from: r.couponProducts.productId,
            to: r.products.id,
            optional: false,
        }),
    },

    couponCategories: {
        coupon: r.one.coupons({
            from: r.couponCategories.couponId,
            to: r.coupons.id,
            optional: false,
        }),
        category: r.one.categories({
            from: r.couponCategories.categoryId,
            to: r.categories.id,
            optional: false,
        }),
    },

    couponUsage: {
        coupon: r.one.coupons({
            from: r.couponUsage.couponId,
            to: r.coupons.id,
            optional: false,
        }),
        user: r.one.user({
            from: r.couponUsage.userId,
            to: r.user.id,
            optional: false,
        }),
    },

    cartSessions: {
        // Nullable: guest carts have no userId (identified by sessionId)
        user: r.one.user({
            from: r.cartSessions.userId,
            to: r.user.id,
        }),
        items: r.many.cartItems(),
    },

    cartItems: {
        cartSession: r.one.cartSessions({
            from: r.cartItems.cartSessionId,
            to: r.cartSessions.id,
            optional: false,
        }),
        product: r.one.products({
            from: r.cartItems.productId,
            to: r.products.id,
            optional: false,
        }),
    },

    shippingMethods: {
        shop: r.one.shops({
            from: r.shippingMethods.shopId,
            to: r.shops.id,
            optional: false,
        }),
        products: r.many.products({
            from: r.shippingMethods.id.through(
                r.productShippingMethods.shippingMethodId,
            ),
            to: r.products.id.through(r.productShippingMethods.productId),
        }),
    },

    wishlistItems: {
        user: r.one.user({
            from: r.wishlistItems.userId,
            to: r.user.id,
            optional: false,
        }),
        product: r.one.products({
            from: r.wishlistItems.productId,
            to: r.products.id,
            optional: false,
        }),
    },

    orders: {
        // Nullable: userId is nullable (guest checkout, or user deleted)
        user: r.one.user({
            from: r.orders.userId,
            to: r.user.id,
        }),
        shop: r.one.shops({
            from: r.orders.shopId,
            to: r.shops.id,
            optional: false,
        }),
        items: r.many.orderItems(),
        payments: r.many.payments(),
        emailDeliveries: r.many.emailDeliveries(),
        reviews: r.many.productReviews(),
    },

    orderItems: {
        order: r.one.orders({
            from: r.orderItems.orderId,
            to: r.orders.id,
            optional: false,
        }),
        // Nullable: the product may be deleted later (snapshot fields remain)
        product: r.one.products({
            from: r.orderItems.productId,
            to: r.products.id,
        }),
        reviews: r.many.productReviews(),
    },

    payments: {
        order: r.one.orders({
            from: r.payments.orderId,
            to: r.orders.id,
            optional: false,
        }),
    },

    emailDeliveries: {
        // Nullable: orderId is nullable (future email types may not be order-related)
        order: r.one.orders({
            from: r.emailDeliveries.orderId,
            to: r.orders.id,
        }),
    },

    productReviews: {
        user: r.one.user({
            from: r.productReviews.userId,
            to: r.user.id,
            optional: false,
        }),
        product: r.one.products({
            from: r.productReviews.productId,
            to: r.products.id,
            optional: false,
        }),
        shop: r.one.shops({
            from: r.productReviews.shopId,
            to: r.shops.id,
            optional: false,
        }),
        order: r.one.orders({
            from: r.productReviews.orderId,
            to: r.orders.id,
            optional: false,
        }),
        orderItem: r.one.orderItems({
            from: r.productReviews.orderItemId,
            to: r.orderItems.id,
            optional: false,
        }),
        helpfulVotes: r.many.reviewHelpfulVotes(),
    },

    reviewHelpfulVotes: {
        review: r.one.productReviews({
            from: r.reviewHelpfulVotes.reviewId,
            to: r.productReviews.id,
            optional: false,
        }),
        user: r.one.user({
            from: r.reviewHelpfulVotes.userId,
            to: r.user.id,
            optional: false,
        }),
    },
}));
