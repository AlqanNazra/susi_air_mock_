export interface LoginRequest {
  username: string
  password: string
}
export interface LoginResponse {
  access_token: string
  token_type: string
}
export interface ApiErrorBody {
  statusCode: number
  message: string | string[]
  error?: string
}
