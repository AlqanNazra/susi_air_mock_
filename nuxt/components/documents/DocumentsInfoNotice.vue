<template>
  <div class="info-notice">
    <span class="info-notice__icon" aria-hidden="true">
      <AppIcon name="info" :size="22" />
    </span>
    <div class="info-notice__text">
      <p class="info-notice__title">Keep your documents up to date</p>
      <p class="info-notice__body">
        Ensure all required documents are valid to avoid any issues with your
        flight operations.
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.info-notice {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 16px;
  border-radius: var(--radius-card);
  background: #eef4ff;
}

.info-notice__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  flex: none;
  border-radius: 999px;
  color: #fff;
  background: #2563eb;
}

.info-notice__text {
  min-width: 0;
}

.info-notice__title {
  margin: 0;
  font-size: 14px;
  font-weight: 800;
  color: var(--color-primary-navy);
}

.info-notice__body {
  margin: 4px 0 0;
  font-size: 13px;
  line-height: 1.5;
  color: var(--color-text-secondary);
}
</style>
