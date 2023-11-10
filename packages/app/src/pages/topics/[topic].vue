<script setup lang="ts">
import { useTopicContainer } from '@/container/topic';
import { FindTopicBySlug } from '@/core/domain/topic/stories/find_topic_by_slug.story';
import { Models } from 'swagger:iforum';
import { Form, FormActions, GenericObject } from 'vee-validate';

const commentForm = reactive({
  body: '',
  author: {
    name: 'Dev2009',
    photo: 'https://w7.pngwing.com/pngs/1004/13/png-transparent-jquery-hd-logo.png',
  },
});

const route = useRoute('/topics/[topic]');
const [findTopicBySlug] = useTopicContainer(FindTopicBySlug);

const replyForm = ref({
  body: '',
  replyTo: null as string | null | undefined,
  author: {
    name: 'Dev2009',
    photo: 'https://w7.pngwing.com/pngs/1004/13/png-transparent-jquery-hd-logo.png',
  },
});

const topic = ref({
  id: '',
  title: 'Angular e Outros Frameworks Front-End: Experiências e Perspectivas',
  rate: -321,
  printed: 13658,
  tags: [
    'Angular',
    'Desenvolvimento web',
    'Front-end',
  ],
  body: 'Olá comunidade! Tenho usado o Angular em meus projetos web front-end e estou realmente impressionado com os benefícios que ele oferece. A estrutura robusta, o suporte extenso da comunidade e as ferramentas de desenvolvimento são incomparáveis. Além disso, o Angular fornece uma arquitetura escalável que facilita a manutenção de projetos complexos. Quem mais aqui é fã do Angular?',
  author: {
    name: 'AngularFanatic',
    photo: 'https://www.jornalopcao.com.br/wp-content/uploads/2014/06/100_9002.jpg',
  },
  comments: [],
  slug: '',
  createdAt: '',
} as Models.Topic);

async function addComment(_: GenericObject, { resetForm }: FormActions<Comment>) {
  // topic.value.comments.unshift({
  //   id: id++,
  //   body: commentForm.body,
  //   rate: 0,
  //   author: commentForm.author,
  //   replies: [],
  // });

  requestAnimationFrame(() => resetForm());

  commentForm.body = '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function replyComment(_: GenericObject, { resetForm }: FormActions<Comment>) {
  // const comment = topic.value.comments.find(comment => comment.id === replyForm.value.replyTo);

  // if (!comment) {
  //   return;
  // }

  // comment.replies.unshift({
  //   id: id++,
  //   body: replyForm.value.body,
  //   rate: 0,
  //   author: replyForm.value.author,
  //   replies: [],
  // });

  // replyForm.value.body = '';
  // replyForm.value.replyTo = null;
  // resetForm();
}

// const sortedComments = computed(() => topic.value.comments.slice().sort((a, b) => b.rate - a.rate));


const sortedComments: Models.Comment[] = [];

watch(() => route.params.topic, async (slug) => {
  topic.value = await findTopicBySlug.execute(slug);
},{ immediate: true });
</script>

<template>
  <div class="container md:flex mx-auto px-4 gap-8 items-start">
    <article class="flex-1 prose max-w-full">
      <header class="flex mb-8 gap-6 items-start">
        <AppRate
          v-model="topic.rate"
          class="!text-6"
        />
        <div>
          <h1 class="mt-0">
            {{ topic.title }}
          </h1>
          <div class="flex flex-wrap gap-2 my-2 w-full">
            <UiTag
              v-for="tag in topic.tags"
              :key="tag"
              class="text-3"
            >
              {{ tag }}
            </UiTag>
          </div>
          <div class="flex gap-4 text-3 justify-end items-center">
            <!-- <span class="opacity-75">{{ topic.printed }} impressões</span>
            <span class="opacity-75">{{ topic.comments.length }} comentários</span> -->
            <span class="opacity-75">Publicado por</span>
            <div class="flex gap-1 items-center">
              <!-- <img
                :src="topic.author.photo"
                :alt="topic.author?.name"
                class="w-6 h-6 rounded-full object-cover"
              > -->
              <span class="opacity-75">{{ topic.author?.name }}</span>
            </div>
          </div>
        </div>
      </header>
      <p>{{ topic.body }}</p>
      <footer>
        <Form
          ref="commentFormEl"
          class="mb-4"
          @submit="addComment"
        >
          <h3 class="text-6 mt-2 mb-4">
            Comentarios
          </h3>
          <UiTextField
            v-model="commentForm.body"
            placeholder="Digite aqui..."
            name="body"
            multiple
            rules="required|max:10000"
          />
          <div class="text-right">
            <UiBtn rounded>
              Publicar
            </UiBtn>
          </div>
        </Form>
        <div
          v-for="comment in sortedComments"
          :key="comment.id"
          class="p-4 bg--panel rounded-md mb-2"
        >
          <div class="flex gap-6 items-start">
            <AppRate
              v-model="comment.rate"
              class="text-6 min-w-14"
            />
            <div class="flex-1">
              <p class="mt-0">
                {{ comment.body }}
              </p>
              <div class="flex gap-4 text-3 items-center justify-end">
                <a
                  href="#"
                  class="text-3"
                  @click.prevent="replyForm.replyTo = comment.id"
                >Responder</a>
                <div class="flex-1" />
                <span class="opacity-75">Publicado a 1h</span>
                <div class="flex gap-1 items-center">
                  <!-- <img
                    :src="comment.author.photo"
                    :alt="comment.author.name"
                    class="w-6 h-6 rounded-full object-cover"
                  > -->
                  <span class="opacity-75">{{ comment.author?.name }}</span>
                </div>
              </div>
            </div>
          </div>
          <Form
            v-if="replyForm.replyTo === comment.id"
            ref="replyCommentEl"
            @submit="replyComment"
          >
            <h3 class="text-6 mt-2 mb-4">
              Responder comentário
            </h3>
            <UiTextField
              v-model="replyForm.body"
              placeholder="Digite aqui..."
              multiple
              autofocus
              name="body"
              rules="required|max:10000"
            />
            <div class="text-right">
              <UiBtn rounded>
                Publicar
              </UiBtn>
            </div>
          </Form>

          <!-- <div
            v-for="reply in comment.replies"
            :key="reply.id"
            class="flex gap-6 items-start app-reply ml-8"
          >
            <AppRate v-model="reply.rate" />
            <div class="flex-1">
              <p class="mt-0">
                {{ reply.body }}
              </p>
              <div class="flex gap-4 text-3 items-center justify-end">
                <span class="opacity-75">Publicado a 1h</span>
                <div class="flex gap-1 items-center">
                  <img
                    :src="reply.author.photo"
                    :alt="reply.author.name"
                    class="w-6 h-6 rounded-full object-cover"
                  >
                  <span class="opacity-75">{{ reply.author.name }}</span>
                </div>
              </div>
            </div>
          </div> -->
        </div>
      </footer>
    </article>
    <aside class="w-70">
      <h2 class="text-6 font-title mb-2">
        Tópicos relacionados
      </h2>
    </aside>
  </div>
</template>

<style lang="scss">
.app-reply {
  @apply py-2;

  &+& {
    border-top: 1px solid var(--theme-panel);
  }
}

article header {
  border-bottom: 1px solid var(--theme-panel);
  @apply pb-4;
}

article footer {
  @apply pt-2 mt-8;
  border-top: 1px solid var(--theme-panel);
}
</style>