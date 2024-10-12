import "@/drizzle/envConfig";

import { defineConfig } from "drizzle-kit";

import "dotenv/config";

if (!process.env.POSTGRES_URL) {
  throw new Error("DATABASE_URL is missing");
}

export default defineConfig({
  schema: "./drizzle/schema",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.POSTGRES_URL,
  },
});
