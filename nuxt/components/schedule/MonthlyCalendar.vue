<script setup lang="ts">
import type { CalendarCell } from '~/types/schedule'
import ScheduleCalendarDayCell from '~/components/schedule/CalendarDayCell.vue'
defineProps<{
  weeks: CalendarCell[][]
  today: string
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'select', cell: CalendarCell): void
}>()

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const
</script>

<template>
  <div class="calendar" :class="{ 'calendar--loading': loading }">
    <div class="calendar__weekdays" role="presentation">
      <span
        v-for="wd in WEEKDAYS"
        :key="wd"
        class="calendar__weekday"
      >
        {{ wd }}
      </span>
    </div>
    <div v-if="loading" class="calendar__grid" aria-hidden="true">
      <span v-for="i in 42" :key="i" class="calendar__skeleton-cell" />
    </div>
    <div v-else class="calendar__grid" role="grid" aria-label="Monthly duty calendar">
      <template v-for="(week, wi) in weeks" :key="`w-${wi}`">
        <ScheduleCalendarDayCell
          v-for="cell in week"
          :key="cell.key"
          :cell="cell"
          :today="today"
          @select="emit('select', $event)"
        />
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.calendar {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-card);
  padding: 12px;
}

.calendar__weekdays,
.calendar__grid {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 4px;
}

.calendar__weekdays {
  gap: 4px;
  margin-bottom: 6px;
}

.calendar__weekday {
  text-align: center;
  font-size: 11px;
  font-weight: 700;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.calendar__skeleton-cell {
  min-height: 64px;
  border-radius: var(--radius-sm);
  background: var(--color-surface-muted);
}
</style>
