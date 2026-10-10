import { getQuery } from 'h3'
import { proxyAuthedGet } from '~/server/utils/backend'
export default defineEventHandler((event) => {
  const query = getQuery(event)
  const raw = query.range
  const range = typeof raw === 'string' && raw ? raw : '1w'
  return proxyAuthedGet(
    event,
    `/flight-hours/summary?range=${encodeURIComponent(range)}`,
  )
})
