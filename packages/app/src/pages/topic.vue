<script setup lang="ts">
import { Form } from 'vee-validate';

const tags = [
  'Ciência da computação',
  'Inteligência Artificial',
  'Estrutura de dados',
  'Computação gráfica',
];
const form = reactive({
  title: '',
  body: '',
});
const replyTo = ref();
</script>



<template>
  <div class="container flex mx-auto px-4 gap-8 items-start">
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
    <article class="flex-1 prose max-w-full overflow-hidden">
      <header class="mb-8">
        <h1 class="mt-0">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
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
          <span>123 impressões</span>
          <span>123 comentários</span>
          <span>Publicado por Ênio Carlos</span>
        </div>
      </header>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quidem nisi ratione esse, molestias est magnam soluta
        ab repudiandae autem voluptates reprehenderit culpa, tempora neque ducimus atque distinctio, aut inventore!
      </p>
      <p>
        Cum enim corporis repellat dolores quas expedita omnis saepe animi dignissimos illum, nostrum impedit odit facere
        aliquam sequi. Praesentium, aspernatur vero ut dolor amet iste numquam, veritatis et, unde est rerum voluptatum
        itaque reiciendis eius blanditiis!
      </p>
      <p>
        Sed tempora iusto voluptatem incidunt magnam vel aliquid, vero mollitia, numquam nulla minus sit quibusdam est
        asperiores, maiores saepe reiciendis quae suscipit perferendis velit necessitatibus dolorem enim!
      </p>
      <p>
        Optio enim alias ab quae incidunt amet quos aliquam ipsam earum dignissimos eum magnam consequuntur harum rerum
        voluptatibus quisquam cupiditate deserunt, molestias dicta excepturi. Provident molestiae non excepturi illum
        distinctio quo voluptatem in reprehenderit nihil a, iusto officiis error, ratione maiores iure dolorem minima
        voluptatibus laboriosam! Facere inventore error molestias porro, ut officia expedita et velit fugit corporis
        provident totam vel, nobis quidem sint, minus accusantium quisquam odio? Odio commodi alias, vero voluptate
        corrupti, ex ipsam magni quae velit temporibus natus beatae harum asperiores sapiente exercitationem corporis?
        Molestias ipsa consequatur itaque. Atque quo quas quia dolore ea quidem aut totam ab. Eaque quia incidunt, ad
        quaerat enim voluptatibus distinctio corporis quo magnam voluptas officiis delectus quidem assumenda mollitia
        reiciendis? Deserunt odio, assumenda obcaecati molestiae enim voluptatibus, voluptate earum hic, unde veniam qui
        quisquam dolore? Blanditiis vel nisi magni facere fugit voluptates, non magnam neque quas libero alias quo vero
        velit at numquam repellendus distinctio corrupti quasi culpa fugiat quae sit! Consequatur atque ipsa ex explicabo
        optio vitae vero asperiores, aliquam eveniet delectus laborum perspiciatis totam a doloremque eligendi excepturi
        itaque nemo illo eum laboriosam repellat vel tenetur dolorem? Praesentium, dicta, eaque quis repellat dolore
        necessitatibus reiciendis neque magnam amet hic sit quae eligendi dignissimos, repellendus sint sunt
        reprehenderit. Mollitia, animi numquam omnis expedita corporis excepturi corrupti, dolorum perspiciatis
        dignissimos dolorem consectetur consequuntur tempore explicabo sequi minima rerum. Id necessitatibus sapiente
        odit, nulla alias ipsa velit, a adipisci quis reiciendis et vel eius iste in fugiat repudiandae?
      </p>
      <p>
        Fugiat dolores doloribus eum harum, et quasi quia distinctio ex sit voluptas explicabo numquam aut maiores alias
        quos voluptatem repudiandae eius. Dolorem tenetur obcaecati exercitationem amet, officiis aliquid, earum rerum
        provident quam molestias itaque quos, eveniet quibusdam maxime in incidunt ab dolor fugiat! Maxime ut
        necessitatibus, delectus expedita mollitia blanditiis dicta doloribus architecto, possimus ab doloremque quia?
        Accusantium est corporis facere aspernatur suscipit distinctio sapiente, quam neque non veniam placeat dolorum
        quibusdam in iusto adipisci eos quidem ex consequatur ipsam obcaecati debitis delectus accusamus ullam! Fugiat
        molestias illum eaque reiciendis cum enim, incidunt esse libero nam porro quasi quo omnis exercitationem totam
        quis. Magni omnis dolorem suscipit placeat consequatur tempore nostrum repudiandae aliquid sed impedit? Ducimus
        aperiam omnis quas atque! Quia repudiandae, neque nemo aperiam hic ea cum magnam asperiores soluta, ad ipsa porro,
        quaerat eius cupiditate quibusdam cumque sunt quos impedit optio doloremque earum. Quasi minima natus placeat
        saepe atque? Libero quo voluptatum ipsa vitae earum modi iure ullam eius iste.
      </p>

      <footer>
        <Form class="mb-4">
          <h3 class="text-6 mt-2 mb-4">
            Comentarios
          </h3>
          <UiTextField
            v-model="form.body"
            placeholder="Digite aqui..."
            multiple
            rules="required|max:10000"
          />
          <div class="text-right">
            <UiBtn
              rounded
            >
              Publicar
            </UiBtn>
          </div>
        </Form>
        <div
          v-for="i in 10"
          :key="i"
          class="p-4 bg--panel rounded-md mb-2"
        >
          <div class="flex gap-6 items-start">
            <div class="flex flex-col items-start justify-center">
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
              <p class="mt-0">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis exercitationem velit quisquam laborum nostrum eos voluptatum modi rerum et temporibus, tenetur, neque possimus quibusdam soluta fuga nam ipsam veritatis unde? Voluptates ducimus accusantium aperiam nemo libero, qui perspiciatis inventore sed dolorem, nam incidunt assumenda porro harum hic iste veniam recusandae?
              </p>
              <a
                href="#"
                @click.prevent="replyTo = i"
              >Responder</a>
              <div class="flex gap-4 text-3 opacity-75 justify-end">
                <span>123 comentários</span>
                <span>Publicado a 1h</span>
                <span>Ênio Carlos</span>
              </div>
            </div>
          </div>
          <Form v-if="replyTo === i">
            <h3 class="text-6 mt-2 mb-4">
              Responder comentário
            </h3>
            <UiTextField
              v-model="form.body"
              placeholder="Digite aqui..."
              multiple
              autofocus
              rules="required|max:10000"
            />
            <div class="text-right">
              <UiBtn
                rounded
              >
                Publicar
              </UiBtn>
            </div>
          </Form>
        </div>
      </footer>
    </article>
    <aside class="w-100">
      <h2 class="text-6 font-title mb-2">
        Tópicos relacionados
      </h2>
    </aside>
  </div>
</template>

<style lang="scss"></style>
