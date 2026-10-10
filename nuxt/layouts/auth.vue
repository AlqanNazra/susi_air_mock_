<script setup lang="ts">
defineOptions({ name: 'LayoutAuth' })
</script>

<template>
  <div class="auth-layout">
    <section class="auth-hero">
      <img
        class="auth-hero__img"
        src="/images/susi-air-hero.svg"
        alt="A Susi Air regional turboprop aircraft parked on the apron"
        fetchpriority="high"
        decoding="async"
      />
      <div class="auth-hero__scrim" aria-hidden="true" />
      <div class="auth-hero__brand">
        <BrandMark />
        <h1 class="auth-hero__title">Pilot Portal</h1>
        <p class="auth-hero__subtitle">Sign in to manage your flight operations</p>
      </div>
    </section>
    <section class="auth-panel">
      <div class="auth-panel__card">
        <div class="auth-panel__brand auth-panel__brand--mobile">
          <BrandMark with-descriptor />
        </div>
        <slot />
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.auth-layout {
  min-height: 100vh;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  background: var(--color-bg);
}

.auth-hero {
  position: relative;
  min-height: 46vh;
  min-height: 46svh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: calc(env(safe-area-inset-top, 0px) + 40px) 24px 72px;
  overflow: hidden;
  background: var(--color-primary-navy);
}

.auth-hero__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 60%;
}

.auth-hero__scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(14, 33, 56, 0.35) 0%,
    rgba(14, 33, 56, 0.15) 40%,
    rgba(14, 33, 56, 0.55) 100%
  );
}

.auth-hero__brand {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  text-align: center;
  color: #fff;
}

.auth-hero__title {
  margin: 6px 0 0;
  font-size: 30px;
  font-weight: 800;
  letter-spacing: -0.4px;
  color: #fff;
  text-shadow: 0 2px 16px rgba(14, 33, 56, 0.4);
}

.auth-hero__subtitle {
  margin: 0;
  max-width: 30ch;
  font-size: 15px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.92);
  text-shadow: 0 1px 10px rgba(14, 33, 56, 0.45);
}

.auth-panel {
  flex: 1;
  display: flex;
  justify-content: center;
  margin-top: -56px;
  padding: 0 20px calc(env(safe-area-inset-bottom, 0px) + 32px);
}

.auth-panel__card {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 440px;
  background: var(--color-surface);
  border-radius: 20px;
  padding: 28px 24px 24px;
  box-shadow: var(--shadow-card);
}

.auth-panel__brand--mobile {
  display: flex;
  justify-content: center;
  margin-bottom: 18px;
  color: var(--color-primary-navy);
}

@media (min-width: 768px) {
  .auth-hero {
    min-height: 40vh;
    padding-bottom: 96px;
  }

  .auth-hero__title {
    font-size: 34px;
  }

  .auth-panel__card {
    max-width: 460px;
    padding: 32px 32px 28px;
  }
}

@media (min-width: 1024px) {
  .auth-layout {
    flex-direction: row;
  }

  .auth-hero {
    flex: 1.15;
    min-height: 100vh;
    min-height: 100svh;
    justify-content: center;
    padding: 48px;
  }

  .auth-hero__brand {
    max-width: 420px;
  }

  .auth-hero__title {
    font-size: 44px;
  }

  .auth-hero__subtitle {
    font-size: 17px;
  }

  .auth-panel {
    flex: 1;
    align-items: center;
    margin-top: 0;
    padding: 48px;
  }

  .auth-panel__card {
    align-self: center;
    max-width: 420px;
    padding: 40px 36px;
  }

  .auth-panel__brand--mobile {
    display: none;
  }
}
</style>
