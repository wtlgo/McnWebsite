import { drizzle } from "drizzle-orm/mysql2";
import * as schema from "../db/mysql/schema";
import * as relations from "../db/mysql/relations";

export const mysqlTables = { ...schema, ...relations };
export const useMysqlDb = () =>
    drizzle(useRuntimeConfig().mysqlConnectionString, {
        schema: mysqlTables,
        mode: "default",
    });
