import type { SchedulesResponse } from '~/types/schedule'
export function useSchedules(year: Ref<number>, month: Ref<number>) {
  return useFetch<SchedulesResponse>(
    () => `/api/schedules?year=${year.value}&month=${month.value}`,
    { key: () => `schedules-${year.value}-${month.value}` },
  )
}
