<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'
const emit = defineEmits<{
  (e: 'success'): void
}>()

const { login, isLoading, clearError } = useAuth()

const username = ref('')
const password = ref('')
const usernameError = ref<string | null>(null)
const passwordError = ref<string | null>(null)
const formError = ref<string | null>(null)
const usernameInputId = 'login-username'
const passwordInputId = 'login-password'
const usernameErrorId = 'login-username-error'
const passwordErrorId = 'login-password-error'
const formErrorId = 'login-form-error'
const showFieldErrors = ref(false)
function validate(): boolean {
  let valid = true
  if (!username.value.trim()) {
    usernameError.value = 'Username is required.'
    valid = false
  } else {
    usernameError.value = null
  }
  if (!password.value) {
    passwordError.value = 'Password is required.'
    valid = false
  } else {
    passwordError.value = null
  }
  return valid
}
function onUsernameInput(value: string) {
  username.value = value
  if (showFieldErrors.value) {
    usernameError.value = value.trim() ? null : 'Username is required.'
  }
  if (formError.value) {
    formError.value = null
    clearError()
  }
}

function onPasswordInput(value: string) {
  password.value = value
  if (showFieldErrors.value) {
    passwordError.value = value ? null : 'Password is required.'
  }
  if (formError.value) {
    formError.value = null
    clearError()
  }
}

async function onSubmit() {
  if (isLoading.value) return
  formError.value = null
  clearError()
  showFieldErrors.value = true
  if (!validate()) {
    nextTick(() => {
      const target = usernameError.value ? usernameInputId : passwordInputId
      document.getElementById(target)?.focus()
    })
    return
  }
  const result = await login({
    username: username.value.trim(),
    password: password.value,
  })
  if (result.ok) {
    password.value = ''
    emit('success')
    return
  }
  password.value = ''
  showFieldErrors.value = false
  formError.value = result.message
}
</script>

<template>
  <form class="login-form" novalidate @submit.prevent="onSubmit">
    <div
      v-if="formError"
      :id="formErrorId"
      class="login-form__alert"
      role="alert"
    >
      <AppIcon name="alert" :size="18" />
      <span>{{ formError }}</span>
    </div>
    <div class="field">
      <label class="field__label" :for="usernameInputId">Username</label>
      <div class="sa-field" :class="{ 'sa-field--invalid': showFieldErrors && usernameError }">
        <span class="sa-field__icon">
          <AppIcon name="user" />
        </span>
        <input
          :id="usernameInputId"
          class="sa-field__input"
          type="text"
          name="username"
          :value="username"
          :disabled="isLoading"
          :aria-invalid="showFieldErrors && usernameError ? 'true' : undefined"
          :aria-describedby="
            showFieldErrors && usernameError ? usernameErrorId : undefined
          "
          placeholder="Enter your username"
          autocomplete="username"
          required
          @input="onUsernameInput(($event.target as HTMLInputElement).value)"
        />
      </div>
      <p
        v-if="showFieldErrors && usernameError"
        :id="usernameErrorId"
        class="field__error"
      >
        {{ usernameError }}
      </p>
    </div>
    <div class="field">
      <label class="field__label" :for="passwordInputId">Password</label>
      <AuthPasswordInput
        :id="passwordInputId"
        :model-value="password"
        :disabled="isLoading"
        :invalid="showFieldErrors && !!passwordError"
        :described-by="
          showFieldErrors && passwordError ? passwordErrorId : undefined
        "
        @update:model-value="onPasswordInput"
      />
      <p
        v-if="showFieldErrors && passwordError"
        :id="passwordErrorId"
        class="field__error"
      >
        {{ passwordError }}
      </p>
    </div>
    <button
      class="btn-primary"
      type="submit"
      :disabled="isLoading"
      :aria-busy="isLoading ? 'true' : undefined"
    >
      <span v-if="isLoading" class="btn-primary__spinner" aria-hidden="true">
        <AppIcon name="spinner" :size="18" />
      </span>
      <span>{{ isLoading ? 'Signing In…' : 'Sign In' }}</span>
      <span v-if="!isLoading" class="btn-primary__arrow" aria-hidden="true">
        <AppIcon name="arrow-right" :size="18" />
      </span>
    </button>
    <div class="login-form__note">
      <p class="login-form__note-primary">Authorized personnel only.</p>
      <p class="login-form__note-secondary">Susi Air Pilot App</p>
    </div>
  </form>
</template>
<style scoped lang="scss">
.login-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.login-form__alert {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  border-radius: 12px;
  background: var(--color-danger-bg);
  color: var(--color-danger-text);
  font-size: 14px;
  font-weight: 500;
  border: 1px solid rgba(230, 55, 87, 0.25);
}

.field {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.field__label {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.field__error {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0;
  font-size: 13px;
  font-weight: 500;
  color: var(--color-danger-text);
}

.btn-primary {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  min-height: 52px;
  margin-top: 4px;
  padding: 0 20px;
  border: none;
  border-radius: var(--radius-pill);
  background: var(--color-brand-red);
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.2px;
  cursor: pointer;
  box-shadow: var(--shadow-button);
  transition: transform var(--transition-fast),
    background var(--transition-fast), box-shadow var(--transition-fast),
    opacity var(--transition-fast);
}

.btn-primary:hover:not(:disabled) {
  background: #d12b48;
}

.btn-primary:active:not(:disabled) {
  transform: translateY(1px);
  box-shadow: 0 4px 12px rgba(230, 55, 87, 0.24);
}

.btn-primary:disabled {
  cursor: not-allowed;
  opacity: 0.85;
}

.btn-primary__spinner {
  display: inline-flex;
}

.btn-primary__arrow {
  display: inline-flex;
  transition: transform var(--transition-fast);
}

.btn-primary:hover:not(:disabled) .btn-primary__arrow {
  transform: translateX(2px);
}

.login-form__note {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  margin-top: 6px;
  text-align: center;
}

.login-form__note-primary {
  margin: 0;
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-secondary);
}

.login-form__note-secondary {
  margin: 0;
  font-size: 12px;
  font-weight: 400;
  color: var(--color-muted);
}
</style>
