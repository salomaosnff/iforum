<script setup lang="ts">
import { vColor } from '@iforum/ui/directive/v-color/vColor';
import { UiInputProps } from './UiInputProps';

defineProps({ ...UiInputProps });
</script>

<template>
  <label
    v-color="color"
    class="ui-input block"
    :class="{'ui-input--error': error, 'ui-input--disabled': disabled}"
  >
    <span
      v-if="label"
      class="block ui-input__label font-bold mb-1"
    >{{ label }}</span>
    <div class="ui-input__field flex gap-2 px-2 py-1 rounded-1">
      <slot name="prepend" />
      <div class="flex-1">
        <slot />
      </div>
      <slot name="append" />
    </div>
    <div
      v-if="!hideMessages"
      class="text-3 mt-1 min-h-3"
    >
      <p
        v-if="error"
        class="ui-input__error fg--danger"
      >{{ error }}</p>
      <p
        v-else-if="hint"
        class="ui-input__hint opacity-75 "
      >{{ hint }}</p>
    </div>
  </label>
</template>

<style lang="scss">

.ui-input {
  &__field {
    background-color: var(--theme-input-bg);
  }

  &:focus-within {
    .ui-input__field {
      box-shadow: 0 0 0 1px var(--current-color);
    }

    .ui-input__label {
      opacity: 1;
    }
  }

  &__label {
    opacity: 0.75;
  }

  &--error {
    --current-color: var(--theme-danger) !important;
    .ui-input__field {
      box-shadow: 0 0 0 1px var(--current-color);
    }
    .ui-input__label {
      color: var(--current-color)
    }
  }

  &--disabled {
    @apply: opacity-50 pointer-events-none select-none;
  }
}

</style>
