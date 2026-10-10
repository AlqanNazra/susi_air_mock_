export interface PilotProfile {
  name: string
  totalFlightHours: number
  avatarUrl: string | null
}
export type FlightRange = '1w' | '1m' | '3m' | '6m' | '1y'
export interface LimitCard {
  key: 'daily' | 'weekly' | 'monthly' | 'annual'
  label: string
  hours: number
  limit: number
  windowDays: number
  remaining: number
  exceeded: boolean
  percentage: number
}
export interface ChartPoint {
  date: string 
  hours: number
  rollingSum: number
}
export interface FlightHoursChart {
  windowDays: number
  limit: number
  yAxisMax: number
  data: ChartPoint[]
}
export interface FlightHoursSummary {
  referenceDate: string
  range: FlightRange
  summary: LimitCard[]
  chart: FlightHoursChart
}
export type DocumentStatus = 'expired' | 'soon' | 'safe'
export interface DocumentItem {
  id: string
  label: string
  expiryDate: string
  daysRemaining: number
  status: DocumentStatus
  color: string
}

export interface DocumentsResponse {
  referenceDate: string
  warningDays: number
  documents: DocumentItem[]
}
