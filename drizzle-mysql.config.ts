import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
    out: "./server/db/mysql/migrations",
    schema: "./server/db/mysql/schema.ts",
    dialect: "mysql",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});
