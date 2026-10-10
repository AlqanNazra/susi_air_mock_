<script setup lang="ts">
defineProps<{
  title: string
  icon: 'book-open' | 'more-horizontal' | 'calendar' | 'file-text'
}>()
</script>

<template>
  <section class="soon">
    <div class="soon__icon" aria-hidden="true">
      <AppIcon :name="icon" :size="28" />
    </div>

    <h1 class="soon__title">{{ title }}</h1>

    <p class="soon__message">Coming soon</p>
  </section>
</template>

<style scoped lang="scss">
.soon {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
  padding: 36px 20px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-card);
}

.soon__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 16px;
  color: var(--color-chart-accent);
  background: var(--color-chart-accent-soft);
}

.soon__title {
  margin: 8px 0 0;
  font-size: 20px;
  font-weight: 800;
  color: var(--color-primary-navy);
}

.soon__message {
  margin: 4px 0 4px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-warning-text);
  background: var(--color-warning-bg);
  border-radius: var(--radius-pill);
}
</style>