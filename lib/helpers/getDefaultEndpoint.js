export function getDefaultEndpoint() {
  console.log(import.meta.env.VITE_APP_ENDPOINT)
  return import.meta.env.VITE_APP_ENDPOINT
}