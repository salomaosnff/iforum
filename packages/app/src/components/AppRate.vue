<script setup lang="ts">
// import { useTopicContainer } from '@/container/topic';
// import { RateTopicStory } from '@/core/domain/topic/stories/rate_topic.story';

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits<{
  (name: 'update:model-value', value: number): void
  (name: 'up'): void
  (name: 'down'): void
}>();



function upvote() {
  signal.value = 1;
  emit('update:model-value', props.modelValue + 1);
  emit('up');
}

function downvote() {
  signal.value = -1;
  emit('update:model-value', props.modelValue - 1);
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
