<script setup lang="ts">
import type { FlightRange } from '~/types/dashboard'
const props = defineProps<{
  modelValue: FlightRange
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: FlightRange): void
}>()

const options: { value: FlightRange; label: string }[] = [
  { value: '1w', label: '1w' },
  { value: '1m', label: '1m' },
  { value: '3m', label: '3m' },
  { value: '6m', label: '6m' },
  { value: '1y', label: '1y' },
]

function select(value: FlightRange) {
  if (props.disabled || value === props.modelValue) return
  emit('update:modelValue', value)
}
</script>

<template>
  <div
    class="range-selector"
    role="group"
    aria-label="Select chart period"
    :aria-disabled="disabled ? 'true' : undefined"
  >
    <button
      v-for="opt in options"
      :key="opt.value"
      type="button"
      class="range-selector__btn"
      :class="{ 'range-selector__btn--active': opt.value === modelValue }"
      :aria-pressed="opt.value === modelValue ? 'true' : 'false'"
      :disabled="disabled"
      @click="select(opt.value)"
    >
      {{ opt.label }}
    </button>
  </div>
</template>

<style scoped lang="scss">
.range-selector {
  display: inline-flex;
  gap: 4px;
  padding: 4px;
  background: var(--color-surface-muted);
  border-radius: var(--radius-pill);
}

.range-selector__btn {
  min-width: 40px;
  min-height: 32px;
  padding: 0 12px;
  border: none;
  background: transparent;
  color: var(--color-text-secondary);
  font-size: 13px;
  font-weight: 600;
  border-radius: var(--radius-pill);
  cursor: pointer;
  transition: background var(--transition-fast), color var(--transition-fast);

  &:hover:not(:disabled):not(.range-selector__btn--active) {
    color: var(--color-primary-navy);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.range-selector__btn--active {
  background: var(--color-primary-navy);
  color: #fff;
  font-weight: 700;
}
</style>
