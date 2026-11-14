import { db } from "../db";

export async function getShopBySlug(slug: string) {
    const shop = await db.query.shops.findFirst({
        where: { slug },
    });
    if (!shop) {
        throw new Error("Shop not found");
    }
    return shop;
}
