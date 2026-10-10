<script setup lang="ts">
import type { DocumentItem, DocumentStatus } from '~/types/dashboard'
const props = defineProps<{ document: DocumentItem }>()
const { formatDate } = useFormatters()
const statusLabel: Record<DocumentStatus, string> = {
  expired: 'Expired',
  soon: 'Soon',
  safe: 'Safe',
}

const label = computed(() => statusLabel[props.document.status])
</script>

<template>
  <li class="doc-item">
    <span class="doc-item__icon" :class="`doc-item__icon--${document.status}`">
      <AppIcon name="file-text" :size="18" />
    </span>

    <div class="doc-item__body">
      <p class="doc-item__name">{{ document.label }}</p>
      <p class="doc-item__date">Expires {{ formatDate(document.expiryDate) }}</p>
    </div>

    <span class="doc-item__badge" :class="`doc-item__badge--${document.status}`">
      {{ label }}
    </span>
    <span class="doc-item__chevron" aria-hidden="true">
      <AppIcon name="chevron-right" :size="16" />
    </span>
  </li>
</template>

<style scoped lang="scss">
.doc-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 4px;
  border-bottom: 1px solid var(--color-border);

  &:last-child {
    border-bottom: none;
  }
}

.doc-item__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  flex: none;
  border-radius: 12px;

  &--safe {
    color: var(--color-success-text);
    background: var(--color-success-bg);
  }
  &--soon {
    color: var(--color-warning-text);
    background: var(--color-warning-bg);
  }
  &--expired {
    color: var(--color-danger-text);
    background: var(--color-danger-bg);
  }
}

.doc-item__body {
  flex: 1;
  min-width: 0;
}

.doc-item__name {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.doc-item__date {
  margin: 2px 0 0;
  font-size: 12px;
  color: var(--color-text-secondary);
}

.doc-item__badge {
  flex: none;
  padding: 5px 12px;
  min-width: 76px;
  text-align: center;
  border-radius: var(--radius-pill);
  font-size: 12px;
  font-weight: 700;

  &--safe {
    color: var(--color-success-text);
    background: var(--color-success-bg);
  }
  &--soon {
    color: var(--color-warning-text);
    background: var(--color-warning-bg);
  }
  &--expired {
    color: var(--color-danger-text);
    background: var(--color-danger-bg);
  }
}

.doc-item__chevron {
  display: inline-flex;
  flex: none;
  color: var(--color-muted);
}
</style>
