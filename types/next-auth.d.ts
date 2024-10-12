// The `JWT` interface can be found in the `next-auth/jwt` submodule
import { type DefaultSession, type DefaultUser } from "next-auth";

import "next-auth/jwt";

// Define a role enum
export type Role = "user" | "admin" | "super_admin" | null;

// common interface for JWT and Session
interface ExtendedUser extends DefaultUser {
  role?: Role;
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `auth`, contains information about the active session.
   */

  interface User extends ExtendedUser {}

  interface Session {
    user: User & DefaultSession;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    id: string;
    role?: Role;
  }
}
