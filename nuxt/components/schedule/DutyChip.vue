<script setup lang="ts">
const props = defineProps<{
  code: string
  color: string
}>()

const { safeColor, readableForeground } = useDutyColor()

const background = computed(() => safeColor(props.color))
const foreground = computed(() => readableForeground(background.value))
const chipStyle = computed(() => ({
  background: background.value,
  color: foreground.value,
}))
</script>

<template>
  <span class="duty-chip" :style="chipStyle">{{ code }}</span>
</template>

<style scoped lang="scss">
.duty-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  height: 17px;
  padding: 0 5px;
  border-radius: 5px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.02em;
  line-height: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-variant-numeric: tabular-nums;
}
</style>
