<script setup lang="ts">
const route = useRoute()

interface NavItem {
  label: string
  icon: 'home' | 'calendar' | 'file-text' | 'more-horizontal'
  to: string
}
const items: NavItem[] = [
  { label: 'Home', icon: 'home', to: '/' },
  { label: 'Schedule', icon: 'calendar', to: '/schedule' },
  { label: 'Documents', icon: 'file-text', to: '/documents' },
  { label: 'More', icon: 'more-horizontal', to: '/more' },
]

function isActive(item: NavItem): boolean {
  return item.to === '/' ? route.path === '/' : route.path.startsWith(item.to)
}
</script>

<template>
  <nav class="bottom-nav" aria-label="Primary">
    <NuxtLink
      v-for="item in items"
      :key="item.label"
      :to="item.to"
      class="bottom-nav__item"
      :class="{ 'bottom-nav__item--active': isActive(item) }"
      :aria-current="isActive(item) ? 'page' : undefined"
    >
      <span class="bottom-nav__icon">
        <AppIcon :name="item.icon" :size="22" />
      </span>
      <span class="bottom-nav__label">{{ item.label }}</span>
    </NuxtLink>
  </nav>
</template>

<style scoped lang="scss">
.bottom-nav {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 20;
  display: flex;
  justify-content: space-around;
  align-items: stretch;
  gap: 4px;
  padding: 8px 8px calc(env(safe-area-inset-bottom, 0px) + 8px);
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  box-shadow: 0 -4px 20px rgba(14, 33, 56, 0.06);
}

.bottom-nav__item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  padding: 6px 4px;
  min-height: 52px;
  text-decoration: none;
  color: var(--color-text-secondary);
  border-radius: 12px;
  transition: color var(--transition-fast), background var(--transition-fast);

  &:hover:not(.bottom-nav__item--active) {
    color: var(--color-primary-navy);
  }
}

.bottom-nav__icon {
  display: inline-flex;
}

.bottom-nav__label {
  font-size: 11px;
  font-weight: 600;
}

.bottom-nav__item--active {
  color: var(--color-brand-red);

  .bottom-nav__label {
    font-weight: 700;
  }
}
</style>
