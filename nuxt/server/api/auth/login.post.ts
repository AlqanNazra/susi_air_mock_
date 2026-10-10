import { createError, defineEventHandler, readBody } from 'h3'
import type { LoginResponse } from '~/types/auth'
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const body = await readBody<{ username?: string; password?: string }>(event)
  if (
    !body ||
    typeof body.username !== 'string' ||
    typeof body.password !== 'string'
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      data: { statusCode: 400, message: 'Username and password are required.' },
    })
  }

  try {
    return await $fetch<LoginResponse>(`${config.apiBase}/auth/login`, {
      method: 'POST',
      body: { username: body.username, password: body.password },
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

    if (upstreamStatus && upstreamStatus >= 400 && upstreamStatus < 600) {
      throw createError({
        statusCode: upstreamStatus,
        statusMessage: anyErr?.response?.statusText || 'Upstream Error',
        data: anyErr?.data ?? {
          statusCode: upstreamStatus,
          message: 'Authentication failed.',
        },
      })
    }
    throw createError({
      statusCode: 502,
      statusMessage: 'Bad Gateway',
      data: {
        statusCode: 502,
        message: 'Unable to reach the authentication service.',
      },
    })
  }
})
