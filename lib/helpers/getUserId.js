import { generateUserId } from "./generateUserId"

export function getUserId() {
  const userId = window.localStorage.getItem('sentinela-userid')

  if (!userId) {
    const uuid = generateUserId()
    window.localStorage.setItem('sentinela-userid', uuid)
    return uuid
  }

  return userId;
}