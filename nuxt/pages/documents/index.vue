<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const { data: profile, pending: profilePending } = usePilotProfile()

const {
  data: documentsData,
  pending: documentsPending,
  error: documentsError,
  refresh: refreshDocuments,
} = useDocuments()

const documents = computed(() => documentsData.value?.documents ?? [])
const docsError = computed(() =>
  documentsError.value ? 'Unable to load documents.' : null,
)
</script>

<template>
  <div class="documents-page">
    <div class="documents-page__container">
      <DashboardHeader :profile="profile" :loading="profilePending" />

      <DashboardDocumentsList
        :documents="documents"
        :loading="documentsPending"
        :error="docsError"
        @retry="refreshDocuments()"
      />

      <DocumentsInfoNotice />
    </div>

    <DashboardBottomNavigation />
  </div>
</template>

<style scoped lang="scss">
.documents-page {
  min-height: 100vh;
  min-height: 100svh;
  background: var(--color-bg);
  padding-bottom: calc(76px + env(safe-area-inset-bottom, 0px));
}

.documents-page__container {
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  padding: 20px 16px 32px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

@media (min-width: 768px) {
  .documents-page__container {
    max-width: 720px;
    padding: 28px 24px 40px;
  }
}

@media (min-width: 1024px) {
  .documents-page {
    padding-bottom: 40px;
  }

  .documents-page__container {
    max-width: 960px;
  }
}
</style>
