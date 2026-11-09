import { defineRelations } from "drizzle-orm";
import * as auth from "./auth-schema";
import * as shop from "./shop-schema";
import { categories } from "./category-schema";
import { brands } from "./brand-schema";
import * as attribute from "./attribute-schema";
import { tags } from "./tags-schema";
import { taxRates } from "./tax-schema";
import * as products from "./products-schema";

const schema = {
    ...auth,
    ...shop,
    ...attribute,
    categories,
    brands,
    tags,
    taxRates,
    ...products,
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

        // Direct access to the junction rows (needed to read `value`)
        productAttributes: r.many.productAttributes(),
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
}));
