<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const { data: profile, pending: profilePending } = usePilotProfile()

</script>

<template>
  <div class="placeholder-page">
    <div class="placeholder-page__container">
      <DashboardHeader :profile="profile" :loading="profilePending" />

      <ComingSoonCard title="Logbook" icon="book-open" />
    </div>

    <DashboardBottomNavigation />
  </div>
</template>

<style scoped lang="scss">
.placeholder-page {
  min-height: 100vh;
  min-height: 100svh;
  background: var(--color-bg);
  padding-bottom: calc(76px + env(safe-area-inset-bottom, 0px));
}

.placeholder-page__container {
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  padding: 20px 16px 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

@media (min-width: 768px) {
  .placeholder-page__container {
    max-width: 720px;
    padding: 28px 24px 40px;
  }
}

@media (min-width: 1024px) {
  .placeholder-page {
    padding-bottom: 40px;
  }

  .placeholder-page__container {
    max-width: 960px;
  }
}
</style>