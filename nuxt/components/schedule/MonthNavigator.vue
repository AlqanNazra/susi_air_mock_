<script setup lang="ts">
const props = defineProps<{
  year: number
  month: number
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'prev'): void
  (e: 'next'): void
}>()

const { formatMonthYear } = useFormatters()
const label = computed(() => formatMonthYear(props.year, props.month))
</script>

<template>
  <div class="month-nav">
    <button
      type="button"
      class="month-nav__btn"
      aria-label="Previous month"
      :disabled="loading"
      @click="emit('prev')"
    >
      <AppIcon name="chevron-left" :size="20" />
    </button>

    <div class="month-nav__label" aria-live="polite">
      <h2 class="month-nav__title">{{ label }}</h2>
    </div>

    <button
      type="button"
      class="month-nav__btn"
      aria-label="Next month"
      :disabled="loading"
      @click="emit('next')"
    >
      <AppIcon name="chevron-right" :size="20" />
    </button>
  </div>
</template>

<style scoped lang="scss">
.month-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.month-nav__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  flex: none;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  color: var(--color-primary-navy);
  cursor: pointer;
  transition: background var(--transition-fast), border-color var(--transition-fast);

  &:hover:not(:disabled) {
    background: var(--color-field-bg);
    border-color: var(--color-muted);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.month-nav__label {
  flex: 1;
  text-align: center;
  min-width: 0;
}

.month-nav__title {
  margin: 0;
  font-size: 18px;
  font-weight: 800;
  color: var(--color-primary-navy);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
