import type { PilotProfile } from '~/types/dashboard'
export function usePilotProfile() {
  return useFetch<PilotProfile>('/api/pilot/me', {
    key: 'pilot-profile',
  })
}
