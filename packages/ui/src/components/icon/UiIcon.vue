<script setup lang="ts">

defineProps({
  name: String
})

</script>

<template>
  <i class="ui-icon mdi" :class="`mdi-${name}`"></i>

</template>

<style lang="scss">
  @import "https://cdn.jsdelivr.net/npm/@mdi/font@7.2.96/css/materialdesignicons.min.css";
</style>
