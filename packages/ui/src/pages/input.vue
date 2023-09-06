<script setup lang="ts">

</script>

<template>
  <div class="container mx-auto">
    <UiInput
      label="Label"
      hint="Texto de ajuda"
    >
      <template #prepend>
        <UiIcon name="home" />
      </template>
      <span>Lorem ipsum dolor sit amet.</span>
      <template #append>
        <UiIcon name="close" />
      </template>
    </UiInput>
    <UiInput
      label="Label"
      hint="Texto de ajuda"
      error="Texto de Erro"
    >
      <span>Lorem ipsum dolor sit amet.</span>
    </UiInput>
    <UiInput
      label="Label"
      hint="Texto de ajuda"
      disabled
    >
      <span>Lorem ipsum dolor sit amet.</span>
    </UiInput>
  </div>
</template>

<style lang="scss">

</style>
