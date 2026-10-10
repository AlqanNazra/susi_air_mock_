<script setup lang="ts">
import type { ScheduleLegendItem } from '~/types/schedule'
defineProps<{
  legend: ScheduleLegendItem[]
  loading?: boolean
}>()

const { safeColor, readableForeground } = useDutyColor()

function swatchStyle(color: string) {
  const bg = safeColor(color)
  return { background: bg, color: readableForeground(bg) }
}
</script>

<template>
  <section class="legend" aria-label="Duty legend">
    <h3 class="legend__title">Legend</h3>
    <ul v-if="loading" class="legend__grid" aria-hidden="true">
      <li v-for="i in 6" :key="i" class="legend__item">
        <span class="legend__swatch legend__swatch--skeleton" />
        <span class="legend__skeleton legend__skeleton--code" />
        <span class="legend__skeleton legend__skeleton--label" />
      </li>
    </ul>
    <p
      v-else-if="legend.length === 0"
      class="legend__empty"
    >
      No duty categories to display.
    </p>
    <ul v-else class="legend__grid">
      <li v-for="item in legend" :key="item.code" class="legend__item">
        <span
          class="legend__swatch"
          :style="swatchStyle(item.color)"
          aria-hidden="true"
        >
          {{ item.code.charAt(0) }}
        </span>
        <span class="legend__code">{{ item.code }}</span>
        <span class="legend__label">{{ item.label }}</span>
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
.legend {
  padding: 14px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-card);
}

.legend__title {
  margin: 0 0 10px;
  font-size: 13px;
  font-weight: 700;
  color: var(--color-primary-navy);
}

.legend__grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
}

@media (min-width: 400px) {
  .legend__grid {
    grid-template-columns: 1fr 1fr;
  }
}

.legend__item {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.legend__swatch {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex: none;
  border-radius: 7px;
  font-size: 11px;
  font-weight: 800;
}

.legend__swatch--skeleton {
  background: var(--color-surface-muted);
}

.legend__code {
  font-size: 12px;
  font-weight: 700;
  color: var(--color-primary-navy);
  flex: none;
}

.legend__label {
  font-size: 12px;
  color: var(--color-text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.legend__skeleton {
  display: block;
  height: 10px;
  border-radius: 5px;
  background: var(--color-surface-muted);

  &--code {
    width: 34px;
  }

  &--label {
    flex: 1;
    min-width: 40px;
  }
}

.legend__empty {
  margin: 0;
  font-size: 13px;
  color: var(--color-text-secondary);
}
</style>
