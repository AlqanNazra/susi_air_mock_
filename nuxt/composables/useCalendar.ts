import type { CalendarCell, ScheduleEntry } from '~/types/schedule'
function toKey(year: number, monthIndex: number, day: number): string {
  const mm = String(monthIndex + 1).padStart(2, '0')
  const dd = String(day).padStart(2, '0')
  return `${year}-${mm}-${dd}`
}

export function useCalendar() {
  /**ear, e.
   * @param year  
   * @param month 
   * @param schedules 
   */
  function buildMonth(
    year: number,
    month: number,
    schedules: ScheduleEntry[],
  ): { weeks: CalendarCell[][]; hasEntries: boolean } {
    const byKey = new Map<string, ScheduleEntry>()
    for (const entry of schedules) byKey.set(entry.duty_date, entry)

    const cells: CalendarCell[] = []
    const firstWeekday = new Date(year, month - 1, 1).getDay()
    const leadCount = (firstWeekday + 6) % 7
    const prevMonthDays = new Date(year, month - 1, 0).getDate()
    for (let i = leadCount - 1; i >= 0; i--) {
      const day = prevMonthDays - i
      let py = year
      let pm0 = month - 2
      if (pm0 < 0) {
        pm0 = 11
        py = year - 1
      }
      cells.push({
        key: toKey(py, pm0, day),
        day,
        year: py,
        month: pm0,
        inMonth: false,
        entry: null,
      })
    }
    const daysInMonth = new Date(year, month, 0).getDate()
    for (let day = 1; day <= daysInMonth; day++) {
      cells.push({
        key: toKey(year, month - 1, day),
        day,
        year,
        month: month - 1,
        inMonth: true,
        entry: null,
      })
    }
    let nextDay = 1
    while (cells.length % 7 !== 0) {
      let ny = year
      let nm0 = month
      if (nm0 > 11) {
        nm0 = 0
        ny = year + 1
      }
      cells.push({
        key: toKey(ny, nm0, nextDay),
        day: nextDay,
        year: ny,
        month: nm0,
        inMonth: false,
        entry: null,
      })
      nextDay++
    }
    for (const cell of cells) {
      const match = byKey.get(cell.key)
      if (match) cell.entry = match
    }
    const weeks: CalendarCell[][] = []
    for (let i = 0; i < cells.length; i += 7) {
      weeks.push(cells.slice(i, i + 7))
    }
    return { weeks, hasEntries: byKey.size > 0 }
  }

  return { buildMonth }
}
