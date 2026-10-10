const HEX_RE = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i
const FALLBACK_COLOR = '#9CA3AF'

function normalizeHex(color: string | null | undefined): string {
  if (!color || typeof color !== 'string') return FALLBACK_COLOR
  const value = color.trim()
  if (!HEX_RE.test(value)) return FALLBACK_COLOR
  if (value.length === 4) {
    const [, r, g, b] = value
    return `#${r}${r}${g}${g}${b}${b}`.toUpperCase()
  }
  return value.toUpperCase()
}

function luminance(hex: string): number {
  const n = normalizeHex(hex)
  const r = parseInt(n.slice(1, 3), 16) / 255
  const g = parseInt(n.slice(3, 5), 16) / 255
  const b = parseInt(n.slice(5, 7), 16) / 255
  const lin = (c: number) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
}

export function useDutyColor() {
  function safeColor(color: string | null | undefined): string {
    return normalizeHex(color)
  }
  function readableForeground(background: string | null | undefined): string {
    const lum = luminance(normalizeHex(background))
    return lum > 0.179 ? '#0E2138' : '#FFFFFF'
  }

  return { safeColor, readableForeground }
}
