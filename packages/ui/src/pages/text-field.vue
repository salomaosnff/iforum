<script setup lang="ts">

const value = ref('');

</script>

<template>
  <div class="container mx-auto mt-20 gap-15 flex flex-col">
    <UiTextField
      v-model.lazy="value"
      label="Nome"
      name="nome"
      rules="required"
    />
    <UiTextField
      v-model="value"
      label="Email"
      name="email"
      type="email"
      rules="required|email"
    />
    <UiTextField
      v-model="value"
      label="Descrição"
      name="Descrição"
      multiple
    />
    {{ value }}
  </div>
</template>

<style lang="scss">

</style>
