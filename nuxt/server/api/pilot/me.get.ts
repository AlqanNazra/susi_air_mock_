import { proxyAuthedGet } from '~/server/utils/backend'
export default defineEventHandler((event) => {
  return proxyAuthedGet(event, '/pilot/me')
})
