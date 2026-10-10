<script setup lang="ts">
import type { CalendarCell } from '~/types/schedule'
import ScheduleMonthNavigator from '~/components/schedule/MonthNavigator.vue'
import ScheduleMonthlyCalendar from '~/components/schedule/MonthlyCalendar.vue'
import ScheduleDutyLegend from '~/components/schedule/DutyLegend.vue'
definePageMeta({
  middleware: 'auth',
})
const { data: profile, pending: profilePending } = usePilotProfile()
const DEFAULT_YEAR = 2026
const DEFAULT_MONTH = 5
const route = useRoute()
const router = useRouter()
function parseMonthQuery(query: Record<string, unknown>): {
  year: number
  month: number
} | null {
  const y = String(query.year ?? '')
  const m = String(query.month ?? '')
  if (!/^\d{1,4}$/.test(y) || !/^\d{1,2}$/.test(m)) return null
  const year = Number(y)
  const month = Number(m)
  if (year < 1 || year > 9999 || month < 1 || month > 12) return null
  return { year, month }
}
const initial =
  parseMonthQuery(route.query) ?? { year: DEFAULT_YEAR, month: DEFAULT_MONTH }
const year = ref(initial.year)
const month = ref(initial.month)
const { data, pending, error, refresh } = useSchedules(year, month)
function syncQuery() {
  router.replace({
    query: { year: String(year.value), month: String(month.value) },
  })
}
watch(route.query, (query) => {
  const parsed = parseMonthQuery(query)
  if (parsed && (parsed.year !== year.value || parsed.month !== month.value)) {
    year.value = parsed.year
    month.value = parsed.month
  }
})

const schedules = computed(() => data.value?.schedules ?? [])
const legend = computed(() => data.value?.legend ?? [])
const today = computed(() => data.value?.today ?? '2026-05-15')

const { buildMonth } = useCalendar()
const calendar = computed(() =>
  buildMonth(year.value, month.value, schedules.value),
)
const weeks = computed(() => calendar.value.weeks)
const hasEntries = computed(() => calendar.value.hasEntries)

const errorMessage = computed(() =>
  error.value ? 'Unable to load schedule.' : null,
)
const isEmpty = computed(
  () => !pending.value && !error.value && !hasEntries.value,
)

function goPrev() {
  if (month.value > 1) {
    month.value -= 1
  } else {
    month.value = 12
    year.value -= 1
  }
  syncQuery()
}

function goNext() {
  if (month.value < 12) {
    month.value += 1
  } else {
    month.value = 1
    year.value += 1
  }
  syncQuery()
}

function onSelectDay(cell: CalendarCell) {
  navigateTo(`/schedule/${cell.key}`)
}

const { logout } = useAuth()
function onSignOut() {
  logout()
  navigateTo('/login')
}
</script>

<style scoped lang="scss">
.schedule-page {
  min-height: 100vh;
  min-height: 100svh;
  background: var(--color-bg);
  padding-bottom: calc(76px + env(safe-area-inset-bottom, 0px));
}

.schedule-page__container {
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  padding: 20px 16px 32px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.schedule-page__title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.schedule-page__title {
  margin: 0;
  font-size: 22px;
  font-weight: 800;
  color: var(--color-primary-navy);
}

.schedule-page__signout {
  display: inline-flex;
  align-items: center;
  min-height: 36px;
  padding: 0 14px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  background: var(--color-surface);
  color: var(--color-text-secondary);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background var(--transition-fast), border-color var(--transition-fast);

  &:hover {
    background: var(--color-field-bg);
    border-color: var(--color-muted);
  }
}

.schedule-state {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  border-radius: var(--radius-card);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
}

.schedule-state--error {
  border-color: rgba(230, 55, 87, 0.35);
  background: var(--color-danger-bg);
  color: var(--color-danger-text);
}

.schedule-state--empty {
  background: var(--color-surface-muted);
  border-color: var(--color-border);
  color: var(--color-text-secondary);
}

.schedule-state__text {
  min-width: 0;
}

.schedule-state__title {
  margin: 0;
  font-size: 14px;
  font-weight: 700;
}

.schedule-state__desc {
  margin: 0;
  font-size: 13px;
}

.schedule-state__retry {
  margin-left: auto;
  flex: none;
  min-height: 36px;
  padding: 0 16px;
  border: 1px solid var(--color-danger);
  border-radius: var(--radius-pill);
  background: #fff;
  color: var(--color-danger);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: var(--color-danger);
    color: #fff;
  }
}

@media (min-width: 768px) {
  .schedule-page__container {
    max-width: 720px;
    padding: 28px 24px 40px;
    gap: 24px;
  }
}

@media (min-width: 1024px) {
  .schedule-page {
    padding-bottom: 40px;
  }

  .schedule-page__container {
    max-width: 960px;
  }
}
</style>


<template>
  <div class="schedule-page">
    <div class="schedule-page__container">
      <DashboardHeader :profile="profile" :loading="profilePending" />

      <div class="schedule-page__title-row">
        <h1 class="schedule-page__title">My Schedule</h1>
        <button
          type="button"
          class="schedule-page__signout"
          @click="onSignOut"
        >
          Sign Out
        </button>
      </div>
      <ScheduleMonthNavigator
        :year="year"
        :month="month"
        :loading="pending"
        @prev="goPrev"
        @next="goNext"
      />
      <div
        v-if="errorMessage"
        class="schedule-state schedule-state--error"
        role="alert"
      >
        <AppIcon name="alert" :size="20" />
        <div class="schedule-state__text">
          <p class="schedule-state__title">{{ errorMessage }}</p>
          <p class="schedule-state__desc">
            Check your connection and try again.
          </p>
        </div>
        <button
          type="button"
          class="schedule-state__retry"
          @click="refresh()"
        >
          Retry
        </button>
      </div>
      <div v-else-if="isEmpty" class="schedule-state schedule-state--empty">
        <AppIcon name="calendar" :size="20" />
        <p class="schedule-state__desc">
          No scheduled duties for this month.
        </p>
      </div>
      <ScheduleMonthlyCalendar
        :weeks="weeks"
        :today="today"
        :loading="pending"
        @select="onSelectDay"
      />

      <ScheduleDutyLegend :legend="legend" :loading="pending" />
    </div>

    <DashboardBottomNavigation />
  </div>
</template>