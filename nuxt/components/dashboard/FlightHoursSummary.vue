<script setup lang="ts">
import type { LimitCard } from '~/types/dashboard'
defineProps<{
  cards: LimitCard[]
  loading?: boolean
}>()
const skeletonSlots = [0, 1, 2, 3]
</script>

<template>
  <section class="limits">
    <div class="limits__head">
      <h2 class="limits__title">Hours to Limit</h2>
      <NuxtLink v-if="!loading" to="/" class="limits__link">
        View Details
        <AppIcon name="chevron-right" :size="14" />
      </NuxtLink>
    </div>

    <div class="limits__grid">
      <template v-if="loading">
        <div v-for="i in skeletonSlots" :key="`sk-${i}`" class="limits__skeleton" />
      </template>
      <DashboardFlightLimitCard v-else v-for="card in cards" :key="card.key" :card="card" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.limits__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.limits__title {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: var(--color-primary-navy);
}

.limits__link {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-brand-red);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

.limits__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.limits__skeleton {
  height: 116px;
  border-radius: var(--radius-card);
  background: var(--color-surface-muted);
  animation: limits-pulse 1.4s ease-in-out infinite;
}

@keyframes limits-pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.55;
  }
}
@media (min-width: 1024px) {
  .limits__grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (prefers-reduced-motion: reduce) {
  .limits__skeleton {
    animation: none;
  }
}
</style>
