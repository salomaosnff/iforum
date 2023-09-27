<script setup lang="ts">
const router = useRouter();
</script>

<template>
  <div class="container px-4 mx-auto">
    <img
      src="../assets/brand.svg"
      class="w-25 mx-auto block"
    >
    <h2 class="text-6 text-center mb-4">
      Entre no iFórum
    </h2>
    <form class="pa-4 bg--panel max-w-110 rounded-md mx-auto">
      <UiTextField
        label="E-mail"
        class="mb-4"
        placeholder="Digite..."
      />
      <UiTextField
        label="Senha"
        class="mb-8"
        type="password"
        placeholder="Digite..."
      />
      <UiBtn
        class="block h-10 w-full mb-2"
        rounded
        type="submit"
      >
        Entrar
      </UiBtn>
      <UiBtn
        class="block h-10 w-full"
        variant="flat"
        type="button"
        @click="router.push('/signup')"
      >
        Registre-se
      </UiBtn>
    </form>
  </div>
</template>

<route>
  {
    meta: {
      layout: 'blank'
    }
  }
</route>
