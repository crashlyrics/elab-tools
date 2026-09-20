import "server-only";

import { auth } from "@/lib/auth/server";
import { sql } from "@/lib/db";

export async function getProAccess() {
  const { data: authSession } = await auth.getSession();
  const user = authSession?.user;

  if (!user?.id) {
    return {
      isLoggedIn: false,
      isPro: false,
      user: null,
      access: null,
    };
  }

  const rows = await sql`
    SELECT
      plan,
      status,
      valid_until
    FROM pro_access
    WHERE auth_user_id = ${user.id}
      AND status = 'active'
      AND valid_until > NOW()
    LIMIT 1
  `;

  const access = rows[0] ?? null;

  return {
    isLoggedIn: true,
    isPro: Boolean(access),
    user,
    access,
  };
}
