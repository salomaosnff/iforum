<script setup lang="ts">
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
</script>

<template>
  <div class="container md:flex mx-auto gap-8 px-4">
    <main>
      <div class="theme--dark w-full aspect-ratio-21/9 app-featured mb-2 relative rounded-md overflow-clip">
        <img
          src="https://blogibsamericas.com/wp-content/uploads/2023/04/Img-IA-1920-x-1080-1920x960.jpg"
          class="w-full h-full object-cover app-featured__img"
        >

        <div class="absolute bottom-0 left-0 right-0 p-8">
          <h1 class="text-8 font-title mb-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </h1>
          <p class="text-3 mb-4 opacity-80">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
          <UiBtn
            variant="outline"
            rounded
          >
            Saiba Mais
          </UiBtn>       
        </div>
      </div>
      <section class="p-4 bg--panel rounded-md mb-2">
        <h3 class="text-6 font-title mb-2">
          Junte-se à comunidade
        </h3>
        <p class="mb-4">
          Descubra e participe da nossa comunidade acadêmica! Registre-se agora e acesse discussões, recursos e
          informações valiosas.
        </p> 
        
        <UiBtn rounded>
          <RouterLink to="/signup">
            Registre-se
          </RouterLink>
        </UiBtn>
      </section>
      <section class="p-4 bg--panel rounded-md mb-2">
        <h3 class="text-6 font-title mb-2">
          Precisando de Ajuda?
        </h3>
        <p class="mb-4">
          Enfrentando dificuldades em resolver atividades? Peça ajuda, compartilhe conhecimentos e supere desafios junto
          a outros estudantes.
        </p>
        
        <UiBtn rounded>
          <RouterLink to="/signin">
            Preciso de ajuda
          </RouterLink>
        </UiBtn>
      </section>
      <section class="p-4 bg--panel rounded-md mb-2">
        <h3 class="text-6 font-title mb-2">
          Compartilhe Seu Conhecimento
        </h3>
        <p class="mb-4">
          Enriqueça a comunidade compartilhando pesquisas. Publique e debata artigos sobre tópicos relevantes e
          inovadores.
        </p>

        <UiBtn rounded>
          <RouterLink to="/signin">
            Ver tópicos
          </RouterLink>
        </UiBtn>
      </section>
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
