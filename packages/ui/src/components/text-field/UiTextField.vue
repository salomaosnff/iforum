<script setup lang="ts">
import { PropType, computed, toRef, watchEffect } from 'vue';
import { UiInputProps } from '../input/UiInputProps';
import { RuleExpression, useField } from 'vee-validate';
import { ref } from 'vue';

const props = defineProps({
  ...UiInputProps,
  modelValue: {
    type: String,
    default: undefined,
  },
  modelModifiers: {
    type: Object as PropType<{lazy: boolean, number: boolean}>,
    default: () => ({
      lazy: false,
      number: false, 
    }),
  },
  type: {
    type: String as PropType<'text' | 'password' | 'url' | 'email' | 'search'>,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: undefined,
  },
  rules: {
    type: Array as PropType<RuleExpression<string>>,
    default: undefined,
  },
  name: {
    type: String,
    default: undefined,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  rows: {
    type: Number,
    default: 4, 
  },
  autofocus: Boolean,
});

watchEffect(() => {
  if (props.multiple && props.type !== 'text') {
    console.warn('UiTextField: multiple prop is only supported for type="text"');
  }
});

const emit = defineEmits<{
  (name:'update:modelValue', value:string): void;
}>();

const inputProps = computed(() => {
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    modelValue, type, placeholder, rules, error, ...rest 
  } = props;
  return rest;
});

const {
  value, errorMessage, 
} = useField(
  () => props.name ?? props.label ?? crypto.randomUUID(),
  toRef(props, 'rules'),
  { initialValue: props.modelValue },
);

const error = computed(() =>  props.error ?? errorMessage.value);
const lazyValue =  ref(props.modelValue ?? '');

watch(lazyValue, () => {
  if (props.modelModifiers.lazy) {
    return;
  }
  setValue(lazyValue.value);
});

watchEffect(() => {
  lazyValue.value = props.modelValue ?? '';
});

function setValue(newValue: string) {
  value.value = newValue;
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let modelValue: any = newValue;

  if (props.modelModifiers.number) {
    modelValue = Number(newValue);
  }

  emit('update:modelValue', modelValue);
}

function onConfirm() {
  if (!props.modelModifiers.lazy) {
    return;
  }
  setValue(lazyValue.value);
}

const control = ref<HTMLInputElement>();

watchEffect(() => {
  if (props.autofocus) {
    control.value?.focus();
  }
});

</script>

<template>
  <UiInput
    class="ui-text-field"
    v-bind="inputProps"
    :error="error"
  >
    <textarea
      v-if="multiple"
      ref="control"
      v-model="lazyValue"
      class="ui-text-field__textarea"
      :placeholder="placeholder"
      :name="name"
      :rows="rows"
      :autofocus="autofocus"
    />
    <input
      v-else
      ref="control"
      v-model="lazyValue"
      class="ui-text-field__control"
      :type="type"
      :placeholder="placeholder"
      :name="name"
      :autofocus="autofocus"
      @blur="onConfirm"
      @keydown.enter="onConfirm"
    >
  </UiInput>
</template>

<style lang="scss">
.ui-text-field {
  &__control {
    @apply: w-full block;
    background: none;
    outline: none;
  }

  &__textarea {
    @apply: w-full block;
    background: none;
    outline: none;
  }
}


</style>
