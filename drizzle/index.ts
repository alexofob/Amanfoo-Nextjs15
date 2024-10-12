import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";

import * as AuthSchema from "./schema/auth";

export const db = drizzle(sql, { schema: { ...AuthSchema } });
