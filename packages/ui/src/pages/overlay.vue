<script setup lang="ts">
const input = ref('');

</script>

<template>
  <UiOverlayMenu close-on-click> 
    <template #activator="{attrs}">
      <button v-bind="attrs">
        Open
      </button>
    </template>
    <UiTextField v-model="input" />
  </UiOverlayMenu>
</template>

<style lang="scss">

</style>
