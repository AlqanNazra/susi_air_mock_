<script setup lang="ts">
import type { LimitCard } from '~/types/dashboard'
const props = defineProps<{ card: LimitCard }>()
const { formatHours } = useFormatters()
const tone = computed<'danger' | 'warning' | 'normal'>(() => {
  if (props.card.exceeded) return 'danger'
  if (props.card.percentage >= 80) return 'warning'
  return 'normal'
})
const barWidth = computed(() =>
  Math.max(0, Math.min(100, props.card.percentage)),
)

const toneLabel = computed(
  () =>
    ({ normal: 'Within limit', warning: 'Approaching limit', danger: 'Over limit' })[
      tone.value
    ],
)
</script>

<template>
  <article class="limit-card" :class="`limit-card--${tone}`">
    <div class="limit-card__head">
      <span class="limit-card__icon" aria-hidden="true">
        <AppIcon name="clock" :size="16" />
      </span>
      <span class="limit-card__label">{{ card.label }}</span>
    </div>

    <p class="limit-card__value">
      <span class="limit-card__hours">{{ formatHours(card.hours) }}</span>
      <span class="limit-card__limit">/ {{ formatHours(card.limit) }} h</span>
    </p>

    <div
      class="limit-card__track"
      role="progressbar"
      :aria-valuenow="card.percentage"
      aria-valuemin="0"
      aria-valuemax="100"
      :aria-label="`${card.label}: ${formatHours(card.hours)} of ${formatHours(card.limit)} hours used`"
    >
      <span class="limit-card__bar" :style="{ width: `${barWidth}%` }" />
    </div>

    <p class="limit-card__foot">
      <span class="limit-card__pct">{{ Math.round(card.percentage) }}%</span>
      <span class="limit-card__state">{{ toneLabel }}</span>
    </p>
  </article>
</template>

<style scoped lang="scss">
.limit-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 14px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-card);
}

.limit-card__head {
  display: flex;
  align-items: center;
  gap: 6px;
}

.limit-card__icon {
  display: inline-flex;
  color: var(--color-text-secondary);
}

.limit-card__label {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-secondary);
}

.limit-card__value {
  display: flex;
  align-items: baseline;
  gap: 4px;
  margin: 0;
}

.limit-card__hours {
  font-size: 22px;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
  color: var(--color-primary-navy);
  line-height: 1.1;
}

.limit-card__limit {
  font-size: 12px;
  font-weight: 500;
  color: var(--color-muted);
}

.limit-card__track {
  position: relative;
  height: 6px;
  border-radius: var(--radius-pill);
  background: var(--color-surface-muted);
  overflow: hidden;
}

.limit-card__bar {
  display: block;
  height: 100%;
  border-radius: var(--radius-pill);
  background: var(--color-chart-accent);
  transition: width var(--transition-base);
}

.limit-card__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0;
}

.limit-card__pct {
  font-size: 12px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: var(--color-text-secondary);
}

.limit-card__state {
  font-size: 11px;
  font-weight: 600;
  color: var(--color-text-secondary);
}
.limit-card--warning {
  .limit-card__bar {
    background: var(--color-warning);
  }
  .limit-card__pct,
  .limit-card__state {
    color: var(--color-warning-text);
  }
}

.limit-card--danger {
  .limit-card__bar {
    background: var(--color-danger);
  }
  .limit-card__pct,
  .limit-card__state {
    color: var(--color-danger-text);
  }
}
</style>
