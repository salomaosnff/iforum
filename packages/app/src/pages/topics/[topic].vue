<script setup lang="ts">
import { useTopicContainer } from '@/container/topic';
import { FindTopicBySlug } from '@/core/domain/topic/stories/find_topic_by_slug.story';
import { CreateCommentStory } from '@/core/domain/comments/stories/create_comment.stories';
import { GetCommentsUseCase } from '@/core/domain/comments/stories/get_comment.story';
import { RateTopicStory } from '@/core/domain/topic/stories/rate_topic.story';
// import { RateCommentStory} from '@/core/domain/comments/stories/rate_comment.story';
import { Models } from 'swagger:iforum';
import { Form, FormActions, GenericObject } from 'vee-validate';
import { useCommentContainer } from '@/container/comment';

const [
  createComment,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getComments,
] = useCommentContainer(CreateCommentStory, GetCommentsUseCase);

const commentForm = reactive({
  body: '',
  author: {
    name: 'Dev2009',
    photo: 'https://w7.pngwing.com/pngs/1004/13/png-transparent-jquery-hd-logo.png',
  },
});

const route = useRoute('/topics/[topic]');
const [findTopicBySlug] = useTopicContainer(FindTopicBySlug);

const replyForm = reactive({
  body: '',
  replyTo: null as string | null | undefined,
});

const topic = ref({
  id: '',
  title: '',
  rate: 0,
  printed: 0,
  tags: [],
  body: '',
  author: {
    name: '',
    photo: '',
  },
  comments: [],
  slug: '',
  createdAt: '',
} as Models.Topic);

const [rate_topic] = useTopicContainer(RateTopicStory);
// const [rate_comment] = useCommentContainer(RateCommentStory);

async function addComment(_: GenericObject, { setErrors }: FormActions<Models.Comment>) {
  const comment = await createComment.execute(route.params.topic, { body: commentForm.body });

  comments.value?.items?.unshift(comment);

  commentForm.body = '';
  setTimeout(() => setErrors({ body: '' }), 1);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function replyComment(_: GenericObject, { resetForm }: FormActions<Models.Comment>) {
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


const sortedComments = computed(() => comments.value?.items?.slice()?.sort((a, b) => (b.rate ?? 0) - (a.rate ?? 0)));

watch(() => route.params.topic, async (slug) => {
  topic.value = await findTopicBySlug.execute(slug);
}, { immediate: true });

const comments = ref<Models.PagedComments>();

watch(() => route.params.topic, async (slug) => {
  comments.value = await getComments.execute(slug);
}, { immediate: true });

async function voteUp() {
  const result = await rate_topic.up(topic.value.slug);
  Object.assign(topic.value, result);
}

async function voteDown() {
  const result = await rate_topic.down(topic.value.slug);
  Object.assign(topic.value, result);
}

// async function voteDownComment() {
//   const result = await rate_comment.down(topic.value.slug, topic.value.id);
// }
</script>

<template>
  <div class="container md:flex mx-auto px-4 gap-8 items-start">
    <article class="flex-1 prose max-w-full">
      <header class="flex mb-8 gap-6 items-start">
        <AppRate
          v-model="topic.rate"
          class="!text-6"
          @up="voteUp"
          @down="voteDown"
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
              @up="voteUp"
              @down="voteDown"
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