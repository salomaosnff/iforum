<script setup lang="ts">
import { Form } from 'vee-validate';  
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
    <Form
      class="pa-4 bg--panel max-w-110 rounded-md mx-auto"
      @submit="router.push('/feed')"
    >
      <UiTextField
        label="E-mail"
        class="mb-4"
        name="email"
        rules="required|email"
        placeholder="Digite..."
      />
      <UiTextField
        label="Senha"
        class="mb-8"
        type="password"
        name="password"
        rules="required"
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
    </Form>
  </div>
</template>

<route>
  {
    meta: {
      layout: 'blank'
    }
  }
</route>
