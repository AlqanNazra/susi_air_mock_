<script setup lang="ts">
import type { PilotProfile } from '~/types/dashboard'
const props = defineProps<{
  profile: PilotProfile | null
  loading?: boolean
}>()

const { formatHours, greeting, initials } = useFormatters()

const name = computed(() => props.profile?.name ?? '')
const totalHours = computed(() => props.profile?.totalFlightHours ?? null)
const avatarUrl = computed(() => props.profile?.avatarUrl ?? null)
const avatarInitials = computed(() => initials(name.value || 'Pilot'))
</script>

<template>
  <header class="dash-header">
    <div class="dash-header__top">
      <BrandMark tone="dark" />
      <div class="dash-header__actions">
        <span
          class="dash-header__icon-btn"
          role="img"
          aria-label="Notifications"
          title="Notifications"
        >
          <AppIcon name="bell" :size="20" />
        </span>
        <span class="dash-header__avatar" aria-hidden="true">
          <img
            v-if="avatarUrl"
            :src="avatarUrl"
            alt=""
            class="dash-header__avatar-img"
          />
          <template v-else>{{ avatarInitials }}</template>
        </span>
      </div>
    </div>
    <div class="dash-header__body">
      <div class="dash-header__greet">
        <template v-if="loading">
          <span class="dash-header__skeleton dash-header__skeleton--name" />
          <span class="dash-header__skeleton dash-header__skeleton--role" />
        </template>
        <template v-else>
          <p class="dash-header__hello">{{ greeting() }}</p>
          <h1 class="dash-header__name">{{ name || 'Pilot' }}</h1>
          <p class="dash-header__role">Pilot</p>
        </template>
      </div>
      <div class="total-card" :class="{ 'total-card--loading': loading }">
        <span class="total-card__icon" aria-hidden="true">
          <AppIcon name="plane" :size="20" />
        </span>
        <div class="total-card__text">
          <span class="total-card__label">Total Flight Hours</span>
          <span class="total-card__value">
            <template v-if="loading">&nbsp;</template>
            <template v-else>
              {{ formatHours(totalHours) }}<span class="total-card__unit"> h</span>
            </template>
          </span>
        </div>
      </div>
    </div>
  </header>
</template>


<style scoped lang="scss">
.dash-header {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.dash-header__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.dash-header__actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.dash-header__icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  color: var(--color-primary-navy);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
}

.dash-header__avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 999px;
  overflow: hidden;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  background: var(--color-primary-navy);
}

.dash-header__avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.dash-header__body {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.dash-header__greet {
  min-width: 0;
}

.dash-header__hello {
  margin: 0;
  font-size: 14px;
  color: var(--color-text-secondary);
}

.dash-header__name {
  margin: 2px 0 0;
  font-size: 24px;
  font-weight: 800;
  color: var(--color-primary-navy);
  line-height: 1.15;
  overflow-wrap: anywhere;
}

.dash-header__role {
  margin: 0;
  font-size: 13px;
  color: var(--color-text-secondary);
}
.total-card {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: none;
  padding: 12px 14px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-card);
}

.total-card__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  flex: none;
  border-radius: 12px;
  color: var(--color-chart-accent);
  background: rgba(34, 197, 232, 0.12);
}

.total-card__text {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.total-card__label {
  font-size: 11px;
  font-weight: 600;
  color: var(--color-text-secondary);
}

.total-card__value {
  font-size: 22px;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
  color: var(--color-primary-navy);
  line-height: 1.1;
}

.total-card__unit {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-muted);
}
.dash-header__skeleton {
  display: block;
  height: 12px;
  border-radius: 6px;
  background: var(--color-surface-muted);
  &--name {
    width: 140px;
    height: 24px;
    margin: 4px 0;
  }
  &--role {
    width: 60px;
    margin-top: 6px;
  }
}

.total-card--loading .total-card__value {
  display: inline-block;
  width: 90px;
  height: 22px;
  border-radius: 6px;
  background: var(--color-surface-muted);
}
@media (max-width: 400px) {
  .dash-header__body {
    flex-direction: column;
    align-items: stretch;
  }

  .total-card {
    justify-content: flex-start;
  }
}
</style>
