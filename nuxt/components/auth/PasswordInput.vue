<script setup lang="ts">
const props = defineProps<{
  modelValue: string
  id: string
  disabled?: boolean
  invalid?: boolean
  describedBy?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const visible = ref(false)

const inputType = computed(() => (visible.value ? 'text' : 'password'))

function onInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}

function toggle() {
  visible.value = !visible.value
}
</script>

<template>
  <div
    class="sa-field password-field"
    :class="{ 'sa-field--invalid': invalid }"
  >
    <span class="sa-field__icon">
      <AppIcon name="lock" />
    </span>
    <input
      :id="id"
      class="sa-field__input"
      :type="inputType"
      :value="modelValue"
      :disabled="disabled"
      :aria-invalid="invalid ? 'true' : undefined"
      :aria-describedby="describedBy"
      placeholder="Enter your password"
      autocomplete="current-password"
      required
      @input="onInput"
    />
    <button
      type="button"
      class="sa-field__toggle"
      :aria-label="visible ? 'Hide password' : 'Show password'"
      :aria-pressed="visible ? 'true' : 'false'"
      :disabled="disabled"
      @click.prevent="toggle"
    >
      <AppIcon :name="visible ? 'eye-off' : 'eye'" :size="20" />
    </button>
  </div>
</template>

<style scoped lang="scss">
.password-field {
  padding-right: 6px;
}
</style>
