import { createError, getCookie } from 'h3'
import type { H3Event } from 'h3'
const TOKEN_COOKIE = 'sa_pilot_token'
export async function proxyAuthedGet(
  event: H3Event,
  path: string,
): Promise<unknown> {
  const config = useRuntimeConfig(event)
  const token = getCookie(event, TOKEN_COOKIE)

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      data: {
        statusCode: 401,
        message: 'Your session has expired. Please sign in again.',
      },
    })
  }

  try {
    return await $fetch(`${config.apiBase}${path}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })
  } catch (err: unknown) {
    const anyErr = err as {
      statusCode?: number
      status?: number
      response?: { status?: number; statusText?: string }
      data?: unknown
    }
    const upstreamStatus =
      anyErr?.statusCode ?? anyErr?.status ?? anyErr?.response?.status
    if (
      typeof upstreamStatus === 'number' &&
      upstreamStatus >= 400 &&
      upstreamStatus < 600
    ) {
      throw createError({
        statusCode: upstreamStatus,
        statusMessage: anyErr?.response?.statusText || 'Upstream Error',
        data: anyErr?.data ?? {
          statusCode: upstreamStatus,
          message: 'Request failed.',
        },
      })
    }
    throw createError({
      statusCode: 502,
      statusMessage: 'Bad Gateway',
      data: {
        statusCode: 502,
        message: 'Unable to reach the server. Please try again.',
      },
    })
  }
}
