<script setup lang="ts">
type IconName =
  | 'user'
  | 'lock'
  | 'eye'
  | 'eye-off'
  | 'alert'
  | 'spinner'
  | 'arrow-right'
  | 'plane'
  | 'bell'
  | 'calendar'
  | 'book-open'
  | 'more-horizontal'
  | 'file-text'
  | 'clock'
  | 'trending-up'
  | 'chevron-right'
  | 'chevron-left'
  | 'home'
  | 'info'
  | 'check'

const props = withDefaults(
  defineProps<{
    name: IconName
    size?: number | string
  }>(),
  { size: 20 },
)
const paths: Record<IconName, string> = {
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
  'eye-off':
    '<path d="M10.7 6.2A9.9 9.9 0 0 1 12 6c6.5 0 10 6 10 6a17.6 17.6 0 0 1-2.4 3.3M6.6 6.7A17.4 17.4 0 0 0 2 12s3.5 6 10 6a9.6 9.6 0 0 0 4-.85"/><path d="M14.1 14.2a3 3 0 1 1-4.2-4.2"/><path d="m2 2 20 20"/>',
  alert:
    '<circle cx="12" cy="12" r="9"/><path d="M12 8v4"/><path d="M12 16h.01"/>',
  'arrow-right': '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
  spinner: '<path d="M12 3a9 9 0 1 0 9 9" />',
  plane:
    '<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>',
  bell:
    '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  calendar:
    '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  'book-open':
    '<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',
  'more-horizontal':
    '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
  'file-text':
    '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M9 13h6M9 17h4"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  'trending-up':
    '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
  'chevron-right': '<path d="m9 18 6-6-6-6"/>',
  home:
    '<path d="m3 9.5 9-7 9 7V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22v-8h6v8"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
  'chevron-left': '<path d="m15 18-6-6 6-6"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
}
</script>

<template>
  <svg
    class="app-icon"
    :class="{ 'app-icon--spin': name === 'spinner' }"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
    v-html="paths[name]"
  />
</template>

<style scoped lang="scss">
.app-icon {
  display: block;
  flex: none;
}

.app-icon--spin {
  animation: app-icon-spin 0.7s linear infinite;
}

@keyframes app-icon-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
