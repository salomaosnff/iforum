<script setup lang="ts">
import { Form } from 'vee-validate';
import { useTopicContainer } from '@/container/topic';
import { CreateTopicStory } from '@/core/domain/topic/stories/create_topic.story';
import { GetFeedUseCase } from '@/core/domain/topic/stories/get_feed.story';
import { RateTopicStory } from '@/core/domain/topic/stories/rate_topic.story';
import { Models } from 'swagger:iforum';

// const users = [
//   {
//     id: 'salomaosnff',
//     username: 'Salomão Neto',
//     photo: 'https://github.com/salomaosnff.png',
//     score: 1234,
//   },
//   {
//     id: 'JoaoManoelVK',
//     username: 'João Manoel',
//     photo: 'https://github.com/JoaoManoelVK.png',
//     score: 1234,
//   },
//   {
//     id: 'eniokarlos',
//     username: 'Ênio Karlos',
//     photo: 'https://github.com/eniokarlos.png',
//     score: 1234,
//   },
//   {
//     id: 'NatanT',
//     username: 'Natan Tôrres',
//     photo: 'https://github.com/Natan-Torres-0x00.png',
//     score: 1234,
//   },
// ];

const router = useRouter();

const [
  createTopic,
  getFeed,
] = useTopicContainer(CreateTopicStory, GetFeedUseCase);

const [rate_topic] = useTopicContainer(RateTopicStory);

const form = reactive({
  title: '',
  body: '',
  tags: '',
});


async function onSubmit() {
  const topic = await createTopic.execute({
    ...form,
    tags: form.tags.split(/[\s,;]+/g).map(tag => tag.trim()).filter(tag => tag),
  });

  await router.push({
    name: '/topics/[topic]',
    params: { topic: topic.slug ?? '' },
  });
}

const feed = ref<Models.Topic[]>([]);

getFeed.execute().then((topics) => {
  feed.value = topics.items ?? [];
});

async function voteUp(topic: Models.Topic) {
  const result = await rate_topic.up(topic.slug);
  Object.assign(topic, result);
}

async function voteDown(topic: Models.Topic) {
  const result = await rate_topic.down(topic.slug);
  Object.assign(topic, result);
}

</script>

<template>
  <div class="container md:flex mx-auto gap-8 px-4">
    <main class="flex-1">
      <Form @submit="onSubmit">
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
        <UiTextField
          v-model="form.tags"
          class="mb-4"
          placeholder="Tags"
          multiple
          rules="required|max:100"
        />
        <div class="text-right">
          <UiBtn
            class="mb-4"
            rounded
            type="submit"
          >
            Publicar
          </UiBtn>
        </div>
      </Form>
      <h3 class="text-4 font-bold mt-2 mb-4">
        Tópicos Recentes
      </h3>
      <p v-if="!feed.length">
        Não há topicos a serem listados
      </p>
      <article
        v-for="topic in feed"
        :key="topic.id"
        class="p-4 bg--panel rounded-md mb-2"
      >
        <header class="flex gap-8">
          <div class="flex flex-col items-center justify-center">
            <!-- <button class="h-6 flex items-center opacity-30">
              <UiIcon
                class="text-10"
                name="menu-up"
              />
            </button> -->
            <!-- <span class="text-6 font-bold">{{ topic.rate }}</span>
            <button class="h-6 flex items-center opacity-30">
              <UiIcon
                class="text-10"
                name="menu-down"
              />
            </button> -->
            <AppRate
              v-model="topic.rate"
              class="!text-6"
              @up="voteUp(topic)"
              @down="voteDown(topic)"
            />
          </div>
          <div class="flex-1">
            <h1 class="mt-2 font-bold">
              <RouterLink :to="{ name: '/topics/[topic]', params: { topic: topic.slug } }">
                {{ topic.title }}
              </RouterLink>
            </h1>
            <div class="flex flex-wrap gap-2 mt-2 w-full">
              <UiTag
                v-for="tag in topic.tags"
                :key="tag"
                class="text-3"
              >
                {{ tag }}
              </UiTag>
            </div>
            <div class="flex gap-4 text-3 opacity-75 justify-end">
              <span>123 comentários</span>
              <span>Publicado a 1h</span>
              <span>{{ topic.author?.name }}</span>
            </div>
          </div>
        </header>
      </article>
    </main>
    <div class="w-80">
      <!-- <h3 class="text-6 font-title mb-2">
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
      </ul> -->
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
