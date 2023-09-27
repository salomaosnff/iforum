<script setup lang="ts">
import { vColor } from '../../directive/v-color/vColor';

defineProps({
  /** Estilo de borda */
  outline: {
    type: Boolean,
    default: false,
  },
  /** Cor da tag */
  color: {
    type: String,
    default: 'primary',
  },
});

</script>

<template>
  <span
    v-color="color"
    class="ui-chip bg--var inline-flex items-center gap-1 gap-2 whitespace-nowrap rounded-5 px-[1em] py-[0.25em]"
    :class="{
      'ui-chip--outline': outline,
    }"
  >
    <slot />
  </span>
</template>

<style lang="scss">
.ui-chip {
  background: var(--current-color);
  font-weight: 800;
  color: white;

  &--outline {
    border: 2px solid var(--current-color);
    color: var(--current-color);
    background: transparent;
  }
}
</style>