import type { FlightHoursSummary, FlightRange } from '~/types/dashboard'
export function useFlightHours(range: Ref<FlightRange>) {
  return useFetch<FlightHoursSummary>(
    () => `/api/flight-hours/summary?range=${range.value}`,
    { key: () => `flight-hours-summary-${range.value}` },
  )
}
