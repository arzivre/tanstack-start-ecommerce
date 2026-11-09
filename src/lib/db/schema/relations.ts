import { defineRelations } from "drizzle-orm";
import * as auth from "./auth-schema";
import * as shop from "./shop-schema";
import { categories } from "./category-schema";
import { brands } from "./brand-schema";
import * as attribute from "./attribute-schema";
import { tags } from "./tags-schema";

const schema = { ...auth, ...shop, ...attribute, categories, brands, tags };

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
    },

    brands: {
        shop: r.one.shops({
            from: r.brands.shopId,
            to: r.shops.id,
            optional: false,
        }),
    },

    attributes: {
        shop: r.one.shops({
            from: r.attributes.shopId,
            to: r.shops.id,
            optional: false,
        }),
        values: r.many.attributeValues(),
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
    },
}));
