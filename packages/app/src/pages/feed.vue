<script setup lang="ts">
import { Form } from 'vee-validate';
const tags = [
  'Ciência da computação',
  'Inteligência Artificial',
  'Estrutura de dados',
  'Computação gráfica',
];
const users = [
  {
    id: 'salomaosnff',
    username: 'Salomão Neto',
    photo: 'https://github.com/salomaosnff.png',
    score: 1234,
  },
  {
    id: 'JoaoManoelVK',
    username: 'João Manoel',
    photo: 'https://github.com/JoaoManoelVK.png',
    score: 1234,
  },
  {
    id: 'eniokarlos',
    username: 'Ênio Karlos',
    photo: 'https://github.com/eniokarlos.png',
    score: 1234,
  },
  {
    id: 'NatanT',
    username: 'Natan Tôrres',
    photo: 'https://github.com/Natan-Torres-0x00.png',
    score: 1234,
  },
];

const form = reactive({
  title: '',
  body: '', 
});
</script>

<template>
  <div class="container md:flex mx-auto gap-8 px-4">
    <main class="flex-1">
      <Form>
        <h3 class="text-4 font-bold mt-2 mb-4">
          Novo Tópico
        </h3>
        <UiTextField
          v-model="form.title"
          class="mb-2"
          placeholder="Título"
          rules="required|max:32"
        />
        <UiTextField
          v-model="form.body"
          class="mb-4"
          placeholder="Descrição"
          multiple
          rules="required|max:10000"
        />
        <div class="text-right">
          <UiBtn
            class="mb-4"
            rounded
          >
            Publicar
          </UiBtn>
        </div>
      </Form>
      <h3 class="text-4 font-bold mt-2 mb-4">
        Tópicos Recentes
      </h3>
      <article
        v-for="i in 10"
        :key="i"
        class="p-4 bg--panel rounded-md mb-2"
      >
        <header class="flex gap-8">
          <div class="flex flex-col items-center justify-center">
            <button class="h-6 flex items-center opacity-30">
              <UiIcon
                class="text-10"
                name="menu-up"
              />
            </button>
            <span class="text-6 font-bold">123</span>
            <button class="h-6 flex items-center opacity-30">
              <UiIcon
                class="text-10"
                name="menu-down"
              />
            </button>
          </div>
          <div class="flex-1">
            <h1 class="mt-2 font-bold">
              <RouterLink to="/topic">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              </RouterLink>
            </h1>
            <div class="flex flex-wrap gap-2 mt-2 w-full">
              <UiTag
                v-for="tag in tags"
                :key="tag"
                class="text-3"
              >
                {{ tag }}
              </UiTag>
            </div>
            <div class="flex gap-4 text-3 opacity-75 justify-end">
              <span>123 comentários</span>
              <span>Publicado a 1h</span>
              <span>Ênio Carlos</span>
            </div>
          </div>
        </header>
      </article>
    </main>
    <div class="w-80">
      <h3 class="text-6 font-title mb-2">
        Top Usuários
      </h3>

      <ul>
        <li
          v-for="user in users"
          :key="user.id"
          class="flex gap-2 mb-4"
        >
          <img
            :src="user.photo"
            class="w-10 h-10 rounded-md bg--panel"
          >
          <div>
            <p class="text-4">
              {{ user.username }}
            </p>
            <p class="text-3 opacity-50">
              {{ user.score }} pontos
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
.app-featured {
  background: black;
  &__img {
    --mask: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
    mask-image: var(--mask);
    -webkit-mask-image: var(--mask);
  }
}
</style>
