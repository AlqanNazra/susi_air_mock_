import { defineStore } from 'pinia'
import type { LoginRequest, LoginResponse } from '~/types/auth'
const TOKEN_COOKIE = 'sa_pilot_token'

export const useAuthStore = defineStore('auth', () => {
  const token = useCookie<string | null>(TOKEN_COOKIE, {
    default: () => null,
    sameSite: 'lax',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60, // 1h, matching the backend JWT expiry
  })
  const status = ref<'idle' | 'loading' | 'error'>('idle')
  const error = ref<string | null>(null)
  const isAuthenticated = computed(() => Boolean(token.value))
  async function login(credentials: LoginRequest): Promise<void> {
    status.value = 'loading'
    error.value = null

    try {
      const res = await $fetch<LoginResponse>('/api/auth/login', {
        method: 'POST',
        body: credentials,
      })
      if (!res || typeof res.access_token !== 'string' || !res.access_token) {
        status.value = 'error'
        error.value = 'Something went wrong. Please try again.'
        throw new Error('Malformed login response')
      }
      token.value = res.access_token
      status.value = 'idle'
    } catch (err: unknown) {
      status.value = 'error'
      if (!error.value) {
        error.value = mapLoginError(err)
      }
      throw err
    }
  }

  function logout(): void {
    token.value = null
    status.value = 'idle'
    error.value = null
  }

  function clearError(): void {
    if (status.value === 'error') status.value = 'idle'
    error.value = null
  }

  return {
    token,
    status,
    error,
    isAuthenticated,
    login,
    logout,
    clearError,
  }
})
function mapLoginError(err: unknown): string {
  const anyErr = err as {
    statusCode?: number
    status?: number
    response?: { status?: number }
    data?: { message?: string | string[] }
  }

  const code =
    anyErr?.statusCode ?? anyErr?.status ?? anyErr?.response?.status

  switch (code) {
    case 400:
      return 'Please check your input and try again.'
    case 401:
      return 'Invalid username or password.'
    case 403:
      return 'You do not have access to this portal.'
    case 404:
      return 'Service unavailable. Please try again later.'
    case 429:
      return 'Too many attempts. Please wait a moment and try again.'
    case 500:
    case 502:
    case 503:
    case 504:
      return 'Something went wrong. Please try again.'
    default:
      if (typeof code === 'number') {
        return 'Something went wrong. Please try again.'
      }
      return 'Unable to connect to the server. Please try again.'
  }
}
