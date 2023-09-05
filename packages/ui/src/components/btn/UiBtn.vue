<script setup lang="ts">
import {vColor} from '@iforum/ui/directive/vColor'

defineProps({
  color: {
    type: String,
    default: 'primary',
  },
  rounded: Boolean,
  disabled: Boolean,
  variant: {
    type: String as PropType<'outline'| 'flat' | 'default'>,
    default: 'default', 
  },
  tag: {
    type: String,
    default: 'button',
  },
  icon: Boolean

});

</script>

<template>
  <component v-color="color" :is="tag" class="ui-btn" :class="[`ui-btn--${variant}`, {
    'ui-btn--rounded': rounded,
    'ui-btn--disabled': disabled,
    'ui-btn--icon': icon
  }]" >
    <slot />
  </component>
</template>

<style lang="scss">

.ui-btn {
  @apply: px-4 py-1 rounded-1 font-semibold transition inline-flex gap-2 justify-center items-center select-none;
  
  &:active {
    filter: brightness(90%);
    transform: scale(95%);
  }
  &--default {
    background: var(--current-color);
    color: var(--current-text-color, #FFFFFFE0 );

    &:hover {
      filter: brightness(90%)
    }
  }
  &--rounded {
    @apply: px-5;
    border-radius: 20px;
  }
  &--disabled {
    @apply: opacity-50 pointer-events-none;
  }

  &--flat, &--outline {
    color: var(--current-text-color, var(--current-color));
  }

  &--flat {
    @apply: relative;
   

    &::before {
      @apply: absolute inset-0 opacity-8;
      content: '';
      background: var(--current-color);
      border-radius: inherit;
    }
    &:hover, &:active {
      &::before{
        @apply: opacity-15;
      }
    }
  }

  &--outline {
    border: 1px solid var(--current-color)

  }
  &--icon {
    @apply: aspect-ratio-1 p-0 h-8;
    &.ui-btn--rounded {
      @apply: rounded-full;
    }
  }

  .ui-btn:not(&--icon) > .ui-icon {
    &:first-child {
      @apply: ml--2;
    }
    &:last-child {
      @apply: mr--2;
    }
  }
}

</style>
