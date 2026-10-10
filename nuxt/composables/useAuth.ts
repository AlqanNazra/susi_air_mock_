import { storeToRefs } from 'pinia'
import type { LoginRequest } from '~/types/auth'
export function useAuth() {
  const store = useAuthStore()
  const { token, status, error, isAuthenticated } = storeToRefs(store)
  const isLoading = computed(() => store.status === 'loading')
  async function login(
    credentials: LoginRequest,
  ): Promise<{ ok: true } | { ok: false; message: string }> {
    try {
      await store.login(credentials)
      return { ok: true }
    } catch {
      return {
        ok: false,
        message: store.error ?? 'Something went wrong. Please try again.',
      }
    }
  }

  function logout() {
    store.logout()
  }

  function clearError() {
    store.clearError()
  }

  return {
    token,
    status,
    error,
    isAuthenticated,
    isLoading,
    login,
    logout,
    clearError,
  }
}
