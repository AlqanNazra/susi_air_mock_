<script setup lang="ts">
import type { CalendarCell } from '~/types/schedule'
import ScheduleDutyChip from '~/components/schedule/DutyChip.vue'
import ScheduleDutyCompletionIndicator from '~/components/schedule/DutyCompletionIndicator.vue'
const props = defineProps<{
  cell: CalendarCell
  today: string
}>()

const emit = defineEmits<{
  (e: 'select', cell: CalendarCell): void
}>()

const isToday = computed(() => props.cell.inMonth && props.cell.key === props.today)
const entry = computed(() => props.cell.entry)

const ariaLabel = computed(() => {
  const e = entry.value
  const base = `${props.cell.key}`
  if (!e) return base
  const done = e.isComplete
    ? 'completed'
    : `${e.remainingDuties} ${e.remainingDuties === 1 ? 'duty' : 'duties'} remaining`
  return `${base}, ${e.base_name}, ${done}`
})

function onClick() {
  if (!props.cell.inMonth) return
  emit('select', props.cell)
}
</script>

<template>
  <button
    v-if="cell.inMonth"
    type="button"
    class="day"
    :class="{ 'day--today': isToday }"
    :aria-label="ariaLabel"
    :aria-pressed="undefined"
    @click="onClick"
  >
    <span class="day__num" :class="{ 'day__num--today': isToday }">
      {{ cell.day }}
    </span>

    <span v-if="entry" class="day__duty">
      <ScheduleDutyChip :code="entry.base_name" :color="entry.base_color" />
    </span>

    <span v-if="entry" class="day__flag">
      <ScheduleDutyCompletionIndicator :entry="entry" />
    </span>
  </button>
  <div v-else class="day day--outside" aria-hidden="true">
    <span class="day__num day__num--outside">{{ cell.day }}</span>
  </div>
</template>

<style scoped lang="scss">
.day {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 3px;
  min-height: 64px;
  padding: 6px 5px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  font: inherit;
  color: var(--color-text-primary);
  cursor: pointer;
  overflow: hidden;
  text-align: left;
  transition: border-color var(--transition-fast),
    box-shadow var(--transition-fast), background var(--transition-fast);

  &:hover:not(.day--outside) {
    border-color: var(--color-muted);
    background: var(--color-field-bg);
  }
}

.day--outside {
  background: var(--color-bg);
  border-color: transparent;
  cursor: default;
  opacity: 0.45;
}

.day--today {
  border-color: var(--color-brand-red);
  box-shadow: 0 0 0 1px var(--color-brand-red) inset;
}

.day__num {
  font-size: 12px;
  font-weight: 700;
  color: var(--color-text-secondary);
  font-variant-numeric: tabular-nums;
}

.day__num--outside {
  color: var(--color-muted);
}

.day__num--today {
  color: var(--color-brand-red);
  font-weight: 800;
}

.day__duty {
  display: flex;
  justify-content: flex-start;
  min-width: 0;
}

.day__flag {
  display: flex;
  justify-content: flex-end;
  margin-top: auto;
}
</style>
