<script setup lang="ts">
import type { ScheduleEntry } from '~/types/schedule'
const props = defineProps<{
  entry: ScheduleEntry
}>()

const showIndicator = computed(() => props.entry.count_schedules > 0)
const isComplete = computed(() => props.entry.isComplete)
const remaining = computed(() => props.entry.remainingDuties)

const ariaLabel = computed(() => {
  if (!showIndicator.value) return ''
  if (isComplete.value) return 'Completed'
  const n = remaining.value
  return `${n} ${n === 1 ? 'duty' : 'duties'} remaining`
})
</script>

<template>
  <span
    v-if="showIndicator"
    class="completion"
    :class="{
      'completion--done': isComplete,
      'completion--pending': !isComplete,
    }"
    :aria-label="ariaLabel"
    role="img"
    :title="ariaLabel"
  >
    <AppIcon v-if="isComplete" name="check" :size="11" />
    <span v-else class="completion__count">{{ remaining }}</span>
  </span>
</template>

<style scoped lang="scss">
.completion {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  flex: none;
  border-radius: 999px;
  font-size: 9px;
  font-weight: 700;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}

.completion--done {
  background: var(--color-success);
  color: #fff;
}

.completion--pending {
  background: var(--color-warning);
  color: #422006;
}
</style>
