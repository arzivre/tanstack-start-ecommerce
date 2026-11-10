import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { relations } from "./schema/relations";

import type { NeonHttpDatabase } from "drizzle-orm/neon-http";
import type { NeonQueryFunction } from "@neondatabase/serverless";

// const connectionString = process.env.DATABASE_URL!;

// const sql = neon(connectionString);
// export const db = drizzle({ client: sql, relations });

let sqlClient: NeonQueryFunction<false, false> | null = null;
let dbClient: NeonHttpDatabase<typeof relations> | null = null;

function getSql() {
    if (!sqlClient) {
        const url = process.env.DATABASE_URL;
        if (!url) throw new Error("DATABASE_URL is not set");
        sqlClient = neon(url);
    }
    return sqlClient;
}

function getDb() {
    if (!dbClient) {
        dbClient = drizzle({
            client: getSql(),
            relations,
        });
    }
    return dbClient;
}

// Export getters that lazily initialize
export const sql = new Proxy(
    function () {} as unknown as NeonQueryFunction<false, false>,
    {
        get(_, prop) {
            return Reflect.get(getSql(), prop);
        },
        apply(_, thisArg, args) {
            return Reflect.apply(getSql(), thisArg, args);
        },
    },
);

export const db = new Proxy({} as NeonHttpDatabase<typeof relations>, {
    get(_, prop) {
        const real = getDb();
        const value = Reflect.get(real, prop, real);
        return typeof value === "function" ? value.bind(real) : value;
    },
});
