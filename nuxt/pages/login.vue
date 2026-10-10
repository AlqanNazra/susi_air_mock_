<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  middleware: 'guest',
})

const router = useRouter()

function onSuccess() {
  router.push('/')
}
</script>

<template>
  <AuthLoginForm @success="onSuccess" />
</template>
