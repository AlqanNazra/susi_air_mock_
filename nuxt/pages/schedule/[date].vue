<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})
const { data: profile, pending: profilePending } = usePilotProfile()
const route = useRoute()
const rawDate = computed(() => String(route.params.date ?? ''))
const isValid = computed(() => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(rawDate.value)
  if (!m) return false
  const year = Number(m[1])
  const month = Number(m[2])
  const day = Number(m[3])
  if (year < 1 || month < 1 || month > 12 || day < 1) return false
  return day <= new Date(year, month, 0).getDate()
})

const { formatDate } = useFormatters()
const displayDate = computed(() =>
  isValid.value ? formatDate(rawDate.value) : '',
)
const backTo = computed(() => {
  if (!isValid.value) return '/schedule'
  const year = Number(rawDate.value.slice(0, 4))
  const month = Number(rawDate.value.slice(5, 7))
  return `/schedule?year=${year}&month=${month}`
})
</script>

<template>
  <div class="detail-page">
    <div class="detail-page__container">
      <DashboardHeader :profile="profile" :loading="profilePending" />

      <div class="detail">
        <div class="detail__icon" aria-hidden="true">
          <AppIcon name="calendar" :size="28" />
        </div>

        <h1 class="detail__title">Duty Details</h1>

        <p v-if="isValid" class="detail__date">{{ displayDate }}</p>
        <p v-else class="detail__date detail__date--unavailable">
          Schedule date unavailable
        </p>

        <p class="detail__message">Detail page coming soon</p>

        <NuxtLink :to="backTo" class="detail__back">
          <AppIcon name="chevron-left" :size="18" />
          Back to schedule
        </NuxtLink>
      </div>
    </div>

    <DashboardBottomNavigation />
  </div>
</template>

<style scoped lang="scss">
.detail-page {
  min-height: 100vh;
  min-height: 100svh;
  background: var(--color-bg);
  padding-bottom: calc(76px + env(safe-area-inset-bottom, 0px));
}

.detail-page__container {
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  padding: 20px 16px 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.detail {
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

.detail__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 16px;
  color: var(--color-chart-accent);
  background: var(--color-chart-accent-soft);
}

.detail__title {
  margin: 8px 0 0;
  font-size: 20px;
  font-weight: 800;
  color: var(--color-primary-navy);
}

.detail__date {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-secondary);
}

.detail__date--unavailable {
  color: var(--color-muted);
}

.detail__message {
  margin: 4px 0 12px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-warning-text);
  background: var(--color-warning-bg);
  border-radius: var(--radius-pill);
}

.detail__back {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 44px;
  padding: 0 20px;
  border-radius: var(--radius-pill);
  background: var(--color-primary-navy);
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  transition: opacity var(--transition-fast);

  &:hover {
    opacity: 0.9;
  }
}

@media (min-width: 768px) {
  .detail-page__container {
    max-width: 720px;
    padding: 28px 24px 40px;
  }
}

@media (min-width: 1024px) {
  .detail-page {
    padding-bottom: 40px;
  }

  .detail-page__container {
    max-width: 960px;
  }
}
</style>
