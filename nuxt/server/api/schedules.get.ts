import { proxyAuthedGet } from '../utils/backend'
import { getQuery } from 'h3'
export default defineEventHandler((event) => {
  const query = getQuery(event)
  const year = query.year
  const month = query.month
  const qs =
    year != null && month != null
      ? `?year=${encodeURIComponent(String(year))}&month=${encodeURIComponent(String(month))}`
      : ''
  return proxyAuthedGet(event, `/schedules${qs}`)
})
