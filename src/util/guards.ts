import { User } from "oceanic.js"

export const isUser = (v: unknown): v is User => {
  return v instanceof User
}
