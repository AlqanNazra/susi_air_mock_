
const MONTHS_SHORT = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const

const MONTHS_LONG = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const

export function useFormatters() {
  function formatHours(value: number | null | undefined): string {
    if (typeof value !== 'number' || !Number.isFinite(value)) return '—'
    const rounded = Math.round(value * 10) / 10
    const hasDecimal = !Number.isInteger(rounded)
    return rounded.toLocaleString('en-US', {
      minimumFractionDigits: hasDecimal ? 1 : 0,
      maximumFractionDigits: 1,
    })
  }

  function formatDate(iso: string | null | undefined): string {
    if (!iso) return '—'
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso)
    if (!m) return iso
    const year = m[1] as string
    const month = MONTHS_SHORT[Number(m[2]) - 1] ?? (m[2] as string)
    return `${Number(m[3])} ${month} ${year}`
  }
  function formatDayLabel(iso: string): string {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso)
    if (!m) return iso
    const month = MONTHS_SHORT[Number(m[2]) - 1] ?? (m[2] as string)
    return `${month} ${Number(m[3])}`
  }
  function greeting(): string {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning,'
    if (hour < 18) return 'Good afternoon,'
    return 'Good evening,'
  }
  function initials(name: string): string {
    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join('')
  }
  function formatMonthYear(year: number, month: number): string {
    const name = MONTHS_LONG[month - 1] ?? ''
    return `${name} ${year}`
  }

  return {
    formatHours,
    formatDate,
    formatDayLabel,
    greeting,
    initials,
    formatMonthYear,
  }
}
