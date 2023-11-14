<script setup lang="ts">
import { Form } from 'vee-validate';
import { UserRegisterStory } from '@/core/domain/user/stories/user_register.story';
import { useUserContainer } from '@/container/user';
import { useUserStore } from '@/store/user';

const [userRegister] = useUserContainer(UserRegisterStory);

const userStore = useUserStore();

const form = ref({
  name: '',
  email: '',
  password: '',
});

const router = useRouter();

async function onSubmit() {
  userStore.user = await userRegister.execute(form.value);
}

watchEffect(() => {
  if (userStore.user) {
    router.push('/feed');
  }
});
</script>
<template>
  <div class="container px-4 mx-auto">
    <img
      src="../assets/brand.svg"
      class="w-25 mx-auto block"
    >
    <h2 class="text-6 text-center mb-4">
      Cadastre-se no iFórum
    </h2>
    <Form
      class="pa-4 bg--panel max-w-110 rounded-md mx-auto"
      @submit="onSubmit"
    >
      <UiTextField
        v-model="form.name"
        label="Nome"
        class="mb-4"
        rules="required"
      />
      <UiTextField
        v-model="form.email"
        label="E-mail Acadêmico"
        class="mb-4"
        hint="Utilize um e-mail acadêmico do ifce."
        rules="required|email|academic_email"
      />
      <div class="flex gap-4">
        <UiTextField
          v-model="form.password"
          label="Senha"
          class="mb-4"
          type="password"
          name="password"
          rules="required|min:6|max:32"
        />
        <UiTextField
          label="Confirme a senha"
          class="mb-8"
          type="password"
          rules="required|confirmed:@password"
        />
      </div>
      <UiBtn
        class="block h-10 w-full mb-2"
        rounded
        type="submit"
      >
        Registrar
      </UiBtn>
      <UiBtn
        class="block h-10 w-full"
        variant="flat"
        @click="router.push('/signin')"
      >
        Já tenho uma conta
      </UiBtn>
    </Form>
  </div>
</template>

<route>
  {
    meta: {
      layout: 'blank',
      public: true
    }
  }
</route>
