<script setup lang="ts">
withDefaults(
  defineProps<{
    withDescriptor?: boolean
    tone?: 'light' | 'dark'
  }>(),
  { withDescriptor: false, tone: 'light' },
)
</script>

<template>
  <div class="brand-mark" :class="`brand-mark--${tone}`">
    <div class="brand-mark__row">
      <svg
        class="brand-mark__glyph"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M2 20c6 0 9-1 13-4 3.2-2.4 6-6 8-11-1 5-3 8-5 10 3 1 6 0 9-3-1 4-3 7-6 8 2 1 5 1 7-1-2 5-6 8-11 9-4 1-9 1-15-1Z"
          fill="currentColor"
        />
        <path
          d="M14 16 30 3"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
      <span class="brand-mark__word">
        Susi<span class="brand-mark__word-accent">Air</span>
      </span>
    </div>
    <span v-if="withDescriptor" class="brand-mark__descriptor">Pilot App</span>
  </div>
</template>

<style scoped lang="scss">
.brand-mark {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  text-align: left;
}

.brand-mark__row {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.brand-mark__glyph {
  width: 30px;
  height: 30px;
  flex: none;
}

.brand-mark__word {
  font-size: 26px;
  font-weight: 800;
  letter-spacing: -0.5px;
  line-height: 1;
}

.brand-mark__descriptor {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.brand-mark--light {
  color: #fff;

  .brand-mark__glyph,
  .brand-mark__word-accent {
    color: var(--color-brand-red);
  }

  .brand-mark__word {
    color: #fff;
    text-shadow: 0 1px 12px rgba(14, 33, 56, 0.35);
  }

  .brand-mark__descriptor {
    color: rgba(255, 255, 255, 0.85);
  }
}

.brand-mark--dark {
  color: var(--color-primary-navy);
  .brand-mark__glyph,
  .brand-mark__word-accent {
    color: var(--color-brand-red);
  }
  .brand-mark__word {
    color: var(--color-primary-navy);
  }
  .brand-mark__descriptor {
    color: var(--color-text-secondary);
  }
}
</style>
