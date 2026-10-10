<script setup lang="ts">
import type { FlightRange } from '~/types/dashboard'
definePageMeta({
  middleware: 'auth',
})
const { data: profile, pending: profilePending } = usePilotProfile()
const range = ref<FlightRange>('1w')
const {
  data: summary,
  pending: summaryPending,
  error: summaryError,
  refresh: refreshSummary,
} = useFlightHours(range)

const {
  data: documentsData,
  pending: documentsPending,
  error: documentsError,
  refresh: refreshDocuments,
} = useDocuments()
const cards = computed(() => summary.value?.summary ?? [])
const chart = computed(() => summary.value?.chart ?? null)
const documents = computed(() => documentsData.value?.documents ?? [])
const chartError = computed(() =>
  summaryError.value ? 'Unable to load flight hours.' : null,
)
const docsError = computed(() =>
  documentsError.value ? 'Unable to load documents.' : null,
)

function onRangeChange(next: FlightRange) {
  range.value = next
}

const { logout } = useAuth()
function onSignOut() {
  logout()
  navigateTo('/login')
}
</script>

<template>
  <div class="dashboard">
    <div class="dashboard__container">
      <DashboardHeader :profile="profile" :loading="profilePending" />

      <DashboardFlightHoursSummary :cards="cards" :loading="summaryPending" />

      <DashboardFlightHoursChart
        :chart="chart"
        :range="range"
        :loading="summaryPending"
        :error="chartError"
        @update:range="onRangeChange"
        @retry="refreshSummary()"
      />

      <DashboardDocumentsList
        :documents="documents"
        :loading="documentsPending"
        :error="docsError"
        view-all-to="/documents"
        @retry="refreshDocuments()"
      />

      <button type="button" class="dashboard__signout" @click="onSignOut">
        <AppIcon name="alert" :size="16" />
        Sign Out
      </button>
    </div>

    <DashboardBottomNavigation />
  </div>
</template>

<style scoped lang="scss">
.dashboard {
  min-height: 100vh;
  min-height: 100svh;
  background: var(--color-bg);
  padding-bottom: calc(76px + env(safe-area-inset-bottom, 0px));
}

.dashboard__container {
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  padding: 20px 16px 32px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.dashboard__signout {
  align-self: center;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 42px;
  padding: 0 20px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  background: var(--color-surface);
  color: var(--color-text-secondary);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background var(--transition-fast), border-color var(--transition-fast);

  &:hover {
    background: var(--color-field-bg);
    border-color: var(--color-muted);
  }
}
@media (min-width: 768px) {
  .dashboard__container {
    max-width: 720px;
    padding: 28px 24px 40px;
    gap: 24px;
  }
}
@media (min-width: 1024px) {
  .dashboard {
    padding-bottom: 40px;
  }

  .dashboard__container {
    max-width: 960px;
  }
}
</style>

