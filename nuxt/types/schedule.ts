export interface ScheduleLegendItem {
  code: string
  label: string
  color: string
}
export interface ScheduleEntry {
  id: string
  duty_date: string
  status: number
  base_name: string
  base_color: string
  duty_type: string
  count_schedules: number
  count_logbooks: number
  remainingDuties: number
  isComplete: boolean
}

export interface SchedulesResponse {
  year: number
  month: number
  today: string
  schedules: ScheduleEntry[]
  legend: ScheduleLegendItem[]
}export interface CalendarCell {
  key: string
  day: number
  year: number
  month: number
  inMonth: boolean
  entry: ScheduleEntry | null
}
