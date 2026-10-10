<script setup lang="ts">
import type {
  FlightHoursChart as FlightHoursChartData,
  ChartPoint,
  FlightRange,
} from '~/types/dashboard'
const props = defineProps<{
  chart: FlightHoursChartData | null
  range: FlightRange
  loading?: boolean
  error?: string | null
}>()

const emit = defineEmits<{
  (e: 'update:range', value: FlightRange): void
  (e: 'retry'): void
}>()
const { formatHours, formatDayLabel } = useFormatters()
const VB = { w: 320, h: 176, l: 36, r: 14, t: 14, b: 28 }
const plotW = VB.w - VB.l - VB.r
const plotH = VB.h - VB.t - VB.b
const plotBottom = VB.t + plotH
const data = computed<ChartPoint[]>(() => props.chart?.data ?? [])
const yAxisMax = computed(() => props.chart?.yAxisMax ?? 0)
const limit = computed(() => props.chart?.limit ?? 0)
const windowDays = computed(() => props.chart?.windowDays ?? 0)
const n = computed(() => data.value.length)
const hasData = computed(() => n.value > 1 && yAxisMax.value > 0)

const xFor = (i: number) =>
  VB.l + (n.value <= 1 ? plotW / 2 : (i / (n.value - 1)) * plotW)
const yFor = (v: number) =>
  VB.t +
  (1 -
    (yAxisMax.value
      ? Math.max(0, Math.min(v, yAxisMax.value)) / yAxisMax.value
      : 0)) *
    plotH

const points = computed(() =>
  data.value.map((d, i) => ({ ...d, i, x: xFor(i), y: yFor(d.rollingSum) })),
)
const linePath = computed(() =>
  points.value
    .map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(' '),
)
const areaPath = computed(() => {
  const pts = points.value
  if (!pts.length) return ''
  const first = pts[0]!
  const last = pts[pts.length - 1]!
  return `${linePath.value} L${last.x.toFixed(2)} ${plotBottom} L${first.x.toFixed(
    2,
  )} ${plotBottom} Z`
})
const limitY = computed(() => yFor(limit.value))
const yTicks = computed(() =>
  [0, yAxisMax.value / 2, yAxisMax.value].map((v) => ({ v, y: yFor(v) })),
)
const xLabelIndices = computed(() => {
  const total = n.value
  if (total === 0) return []
  const set = new Set<number>([0, Math.floor((total - 1) / 2), total - 1])
  if (total > 6) {
    set.add(Math.floor((total - 1) / 4))
    set.add(Math.floor((3 * (total - 1)) / 4))
  }
  return [...set].sort((a, b) => a - b)
})
const activeIndex = ref<number | null>(null)
const activePoint = computed(() =>
  activeIndex.value != null ? (points.value[activeIndex.value] ?? null) : null,
)
const tip = computed(() => {
  const p = activePoint.value
  if (!p) return null
  const w = 104
  const h = 46
  const x = Math.max(VB.l, Math.min(p.x - w / 2, VB.w - VB.r - w))
  const y = Math.max(VB.t, Math.min(p.y - h - 12, plotBottom - h))
  return { x, y, w, h }
})
watch(
  () => props.range,
  () => {
    activeIndex.value = null
  },
)
function showTip(i: number) {
  activeIndex.value = i
}
function hideTip() {
  activeIndex.value = null
}
</script>
<template>
  <section class="chart-card">
    <div class="chart-card__head">
      <div class="chart-card__titles">
        <h2 class="chart-card__title">Flight Hours Trend</h2>
        <p v-if="chart" class="chart-card__caption">
          {{ windowDays }}-day rolling sum
        </p>
      </div>
      <DashboardChartRangeSelector
        :model-value="range"
        :disabled="loading"
        @update:model-value="emit('update:range', $event)"
      />
    </div>
    <div v-if="loading" class="chart-card__body chart-card__body--loading">
      <div class="chart-skeleton" aria-hidden="true" />
    </div>
    <div v-else-if="error" class="chart-card__state" role="alert">
      <AppIcon name="alert" :size="20" />
      <p>{{ error }}</p>
      <button type="button" class="chart-card__retry" @click="emit('retry')">
        Try again
      </button>
    </div>
    <div v-else-if="!hasData" class="chart-card__state">
      <AppIcon name="trending-up" :size="20" />
      <p>No flight-hours data available for this period.</p>
    </div>
    <figure v-else class="chart-card__figure">
      <svg
        class="chart__svg"
        viewBox="0 0 320 176"
        role="img"
        :aria-label="`${windowDays}-day rolling flight-hours trend. Regulatory limit ${formatHours(
          limit,
        )} hours.`"
      >
        <g class="chart__grid">
          <line
            v-for="t in yTicks"
            :key="`g-${t.v}`"
            :x1="VB.l"
            :x2="VB.w - VB.r"
            :y1="t.y"
            :y2="t.y"
          />
          <text
            v-for="t in yTicks"
            :key="`yl-${t.v}`"
            class="chart__axis-label"
            :x="VB.l - 8"
            :y="t.y + 3"
            text-anchor="end"
          >
            {{ formatHours(t.v) }}
          </text>
        </g>
        <g class="chart__limit">
          <line :x1="VB.l" :x2="VB.w - VB.r" :y1="limitY" :y2="limitY" />
          <text
            class="chart__limit-label"
            :x="VB.w - VB.r"
            :y="limitY - 6"
            text-anchor="end"
          >
            Limit {{ formatHours(limit) }} h
          </text>
        </g>
        <path class="chart__area" :d="areaPath" />
        <path class="chart__line" :d="linePath" />
        <circle
          v-for="p in points"
          :key="`dot-${p.date}`"
          class="chart__dot"
          :cx="p.x"
          :cy="p.y"
          r="2.6"
        />
        <template v-if="activePoint && tip">
          <line
            class="chart__guide"
            :x1="activePoint.x"
            :x2="activePoint.x"
            :y1="VB.t"
            :y2="plotBottom"
          />
          <circle
            class="chart__dot chart__dot--active"
            :cx="activePoint.x"
            :cy="activePoint.y"
            r="4.2"
          />
          <g class="chart__tip" :transform="`translate(${tip.x} ${tip.y})`">
            <rect :width="tip.w" :height="tip.h" rx="8" />
            <text class="chart__tip-date" x="10" y="17">
              {{ formatDayLabel(activePoint.date) }}
            </text>
            <text class="chart__tip-value" x="10" y="35">
              {{ formatHours(activePoint.rollingSum) }} h
            </text>
          </g>
        </template>
        <circle
          v-for="p in points"
          :key="`hit-${p.date}`"
          class="chart__hit"
          :cx="p.x"
          :cy="p.y"
          r="13"
          @mouseenter="showTip(p.i)"
          @mouseleave="hideTip"
          @click="showTip(p.i)"
        />
        <text
          v-for="i in xLabelIndices"
          :key="`x-${i}`"
          class="chart__axis-label chart__xlabel"
          :x="xFor(i)"
          :y="VB.h - 9"
          text-anchor="middle"
        >
          {{ formatDayLabel(data[i]!.date) }}
        </text>
      </svg>
      <figcaption class="sr-only">
        <table>
          <caption>
            Flight hours trend ({{ windowDays }}-day rolling sum, limit
            {{ formatHours(limit) }} h)
          </caption>
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Hours</th>
              <th scope="col">Rolling sum</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in points" :key="`tr-${p.date}`">
              <td>{{ p.date }}</td>
              <td>{{ formatHours(p.hours) }}</td>
              <td>{{ formatHours(p.rollingSum) }}</td>
            </tr>
          </tbody>
        </table>
      </figcaption>
    </figure>
  </section>
</template>

<style scoped lang="scss">
.chart-card {
  background: var(--color-surface);
  border-radius: var(--radius-card);
  padding: 16px;
  box-shadow: var(--shadow-card);
}

.chart-card__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 8px;
}

.chart-card__titles {
  min-width: 0;
}

.chart-card__title {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: var(--color-primary-navy);
}

.chart-card__caption {
  margin: 2px 0 0;
  font-size: 12px;
  color: var(--color-text-secondary);
}
.chart-card__body--loading {
  display: block;
}

.chart-skeleton {
  width: 100%;
  aspect-ratio: 320 / 176;
  border-radius: var(--radius-sm);
  background: linear-gradient(
    100deg,
    var(--color-field-bg) 30%,
    rgba(255, 255, 255, 0.7) 50%,
    var(--color-field-bg) 70%
  );
  background-size: 200% 100%;
  animation: chart-skeleton-shimmer 1.4s ease-in-out infinite;
}

@keyframes chart-skeleton-shimmer {
  0% {
    background-position: 150% 0;
  }
  100% {
    background-position: -50% 0;
  }
}
.chart-card__state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 176px;
  padding: 20px;
  text-align: center;
  color: var(--color-text-secondary);
  font-size: 13px;

  p {
    margin: 0;
    max-width: 30ch;
  }
}

.chart-card__state .app-icon {
  color: var(--color-muted);
}

.chart-card__state[role='alert'] .app-icon {
  color: var(--color-danger-text);
}

.chart-card__retry {
  min-height: 36px;
  padding: 0 16px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  background: var(--color-surface);
  color: var(--color-primary-navy);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background var(--transition-fast), border-color var(--transition-fast);

  &:hover {
    background: var(--color-field-bg);
    border-color: var(--color-muted);
  }
}

.chart-card__figure {
  margin: 0;
}

.chart__svg {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
  touch-action: pan-y;
}

// Grid + axes
.chart__grid line {
  stroke: var(--color-border);
  stroke-width: 1;
}

.chart__axis-label {
  fill: var(--color-muted);
  font-size: 8px;
  font-variant-numeric: tabular-nums;
}
.chart__limit line {
  stroke: var(--color-brand-red);
  stroke-width: 1.4;
  stroke-dasharray: 5 4;
}

.chart__limit-label {
  fill: var(--color-brand-red);
  font-size: 8px;
  font-weight: 600;
}
.chart__area {
  fill: var(--color-chart-accent-soft);
  stroke: none;
}

.chart__line {
  fill: none;
  stroke: var(--color-chart-accent);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.chart__dot {
  fill: var(--color-surface);
  stroke: var(--color-chart-accent);
  stroke-width: 1.6;
}

.chart__dot--active {
  fill: var(--color-chart-accent);
  stroke: var(--color-surface);
}

.chart__guide {
  stroke: var(--color-muted);
  stroke-width: 1;
  stroke-dasharray: 2 3;
}
.chart__tip rect {
  fill: var(--color-primary-navy);
  opacity: 0.95;
}

.chart__tip-date {
  fill: rgba(255, 255, 255, 0.75);
  font-size: 8px;
}

.chart__tip-value {
  fill: #fff;
  font-size: 11px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

// Transparent per-point hit areas for pointer + touch.
.chart__hit {
  fill: transparent;
  cursor: pointer;
}

@media (min-width: 1024px) {
  .chart-card {
    padding: 20px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .chart-skeleton {
    animation: none;
  }
}
</style>

