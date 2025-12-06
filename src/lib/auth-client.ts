import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  // Use empty string for same-origin requests (works regardless of port)
  baseURL: typeof window !== "undefined" ? "" : (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
})

export const {
  signIn,
  signOut,
  signUp,
  useSession,
  getSession,
} = authClient