<script setup lang="ts">
const search = ref('');

const router = useRouter();
</script>
<template>
  <div>
    <header class="theme--dark pa-4 sticky top-0 bg--background mb-6 z-10">
      <div class="container flex mx-auto gap-8 items-center px-4">
        <img src="../assets/iforum.svg">
        <UiTextField
          v-model="search"
          placeholder="Pesquisar"
          class="w-2/5 mb--1"
          type="search"
          hide-messages
        />
        <div class="flex-1" />
        <UiBtn
          rounded
          @click="router.push('/signin')"
        >
          Entrar
        </UiBtn> 
      </div>
    </header>
    <RouterView />
    <footer class="pa-4 mt-16">
      <div class="container mx-auto opacity-50 text-3 text-center">
        <p class="mb-1">
          iFórum&copy;2023
        </p>
        <p>Desenvolvido pelo IFCE - Campus Aracati</p>
      </div>
    </footer>
  </div>
</template>
