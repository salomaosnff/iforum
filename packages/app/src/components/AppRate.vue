<script setup lang="ts">
defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits<{
  (name: 'up'): void
  (name: 'down'): void
}>();



function upvote() {
  emit('up');
}

function downvote() {
  emit('down');
}

const signal = ref(0);
</script>

<template>
  <div
    class="flex flex-col items-center justify-center"
  >
    <button
      class="h-6 flex items-center opacity-30"
      :class="{
        'fg--success !opacity-100': signal > 0
      }"
      @click="upvote"
    >
      <UiIcon
        class="text-2em"
        name="menu-up"
      />
    </button>
    <span
      :class="{
        'fg--success': modelValue > 0,
        'fg--danger': modelValue < 0,
        'ml--1ch': modelValue < 0
      }"
    >{{ modelValue }}</span>
    <button
      class="h-6 flex items-center opacity-30"
      :class="{
        'fg--danger !opacity-100': signal < 0
      }"
      @click="downvote"
    >
      <UiIcon
        class="text-2em"
        name="menu-down"
      />
    </button>
  </div>
</template>

<style lang="scss">

</style>
