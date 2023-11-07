<script setup lang="ts">
import { useAuthContainer } from '@/container/auth.js';
import { UserLoginStory } from '@/core/domain/user/stories/user_login.story';
import { Form } from 'vee-validate';

const router = useRouter();

const [userLogin] = useAuthContainer(UserLoginStory);

const form = ref({
  login: '',
  password: '',
});

async function onSubmit(){
  await userLogin.execute(form.value);
  router.push('/feed');
}
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
      @submit="onSubmit"
    >
      <UiTextField
        v-model="form.login"
        label="E-mail"
        class="mb-4"
        name="email"
        rules="required|email"
        placeholder="Digite..."
      />
      <UiTextField
        v-model="form.password"
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
