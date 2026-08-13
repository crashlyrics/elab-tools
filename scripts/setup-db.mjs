import { neon } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL fehlt.");
}

const sql = neon(databaseUrl);

await sql`
  CREATE TABLE IF NOT EXISTS pro_access (
    id BIGSERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    plan TEXT NOT NULL CHECK (plan IN ('monthly', 'annual')),
    status TEXT NOT NULL DEFAULT 'active',
    mollie_customer_id TEXT,
    mollie_subscription_id TEXT,
    valid_until TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
`;

console.log("Tabelle pro_access ist bereit.");
