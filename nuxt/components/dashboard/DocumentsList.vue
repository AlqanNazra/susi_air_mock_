<script setup lang="ts">
import type { DocumentItem } from '~/types/dashboard'
withDefaults(
  defineProps<{
    documents: DocumentItem[]
    loading?: boolean
    error?: string | null
    viewAllTo?: string | null
  }>(),
  { loading: false, error: null, viewAllTo: null },
)
defineEmits<{ (e: 'retry'): void }>()
const skeletonRows = [0, 1, 2, 3, 4]
</script>

<template>
  <section class="docs" aria-label="My Documents">
    <div class="docs__head">
      <h2 class="docs__title">My Documents</h2>
      <NuxtLink v-if="viewAllTo && !loading && !error" :to="viewAllTo" class="docs__link">
        View All
        <AppIcon name="chevron-right" :size="14" />
      </NuxtLink>
    </div>
    <ul v-if="loading" class="docs__list docs__list--skeleton" aria-hidden="true">
      <li v-for="i in skeletonRows" :key="`sk-${i}`" class="docs__skeleton-row">
        <span class="docs__skeleton-icon" />
        <span class="docs__skeleton-lines">
          <span class="docs__skeleton-line" />
          <span class="docs__skeleton-line docs__skeleton-line--short" />
        </span>
        <span class="docs__skeleton-badge" />
      </li>
    </ul>
    <div v-else-if="error" class="docs__state docs__state--error" role="alert">
      <AppIcon name="alert" :size="20" />
      <p>{{ error }}</p>
      <button type="button" class="docs__retry" @click="$emit('retry')">
        Try again
      </button>
    </div>
    <div v-else-if="documents.length === 0" class="docs__state">
      <span class="docs__empty-icon"><AppIcon name="file-text" :size="24" /></span>
      <p class="docs__empty-title">No documents found</p>
      <p class="docs__empty-text">
        Your documents will appear here once available from the system.
      </p>
    </div>
    <ul v-else class="docs__list">
      <DashboardDocumentListItem
        v-for="doc in documents"
        :key="doc.id"
        :document="doc"
      />
    </ul>
  </section>
</template>

<style scoped lang="scss">
.docs {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-card);
  padding: 18px 16px 8px;
}

.docs__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 6px;
}

.docs__title {
  margin: 0;
  font-size: 18px;
  font-weight: 800;
  color: var(--color-primary-navy);
}

.docs__link {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  min-height: 32px;
  font-size: 13px;
  font-weight: 700;
  color: var(--color-brand-red);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

.docs__list {
  margin: 0;
  padding: 0;
  list-style: none;
}

// Skeleton rows.
.docs__skeleton-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 0;
  border-bottom: 1px solid var(--color-border);

  &:last-child {
    border-bottom: none;
  }
}

.docs__skeleton-icon,
.docs__skeleton-badge {
  flex: none;
  border-radius: 10px;
  background: var(--color-surface-muted);
  animation: docs-pulse 1.4s ease-in-out infinite;
}

.docs__skeleton-icon {
  width: 38px;
  height: 38px;
}

.docs__skeleton-badge {
  width: 60px;
  height: 24px;
  border-radius: var(--radius-pill);
}

.docs__skeleton-lines {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.docs__skeleton-line {
  height: 12px;
  border-radius: 6px;
  background: var(--color-surface-muted);
  animation: docs-pulse 1.4s ease-in-out infinite;

  &--short {
    width: 55%;
  }
}
.docs__state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 32px 20px;
  text-align: center;
}

.docs__empty-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 14px;
  color: var(--color-text-secondary);
  background: var(--color-surface-muted);
}

.docs__empty-title {
  margin: 4px 0 0;
  font-size: 15px;
  font-weight: 700;
  color: var(--color-primary-navy);
}

.docs__empty-text {
  margin: 0;
  max-width: 32ch;
  font-size: 13px;
  color: var(--color-text-secondary);
}

.docs__state--error {
  color: var(--color-text-secondary);

  .app-icon {
    color: var(--color-danger-text);
  }

  p {
    margin: 0;
    font-size: 13px;
  }
}

.docs__retry {
  min-height: 36px;
  margin-top: 4px;
  padding: 0 16px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  background: var(--color-surface);
  color: var(--color-primary-navy);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background var(--transition-fast), border-color var(--transition-fast);

  &:hover {
    background: var(--color-field-bg);
    border-color: var(--color-muted);
  }
}

@keyframes docs-pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.55;
  }
}

@media (prefers-reduced-motion: reduce) {
  .docs__skeleton-icon,
  .docs__skeleton-badge,
  .docs__skeleton-line {
    animation: none;
  }
}
</style>
