<script setup lang="ts">
const tags = [
  'Ciência da computação',
  'Inteligência Artificial',
  'Estrutura de dados',
  'Computação gráfica',
];
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
      <header>
        <h1 class="mt-0">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        </h1>
        <div class="flex gap-4 text-3 opacity-75">
          <span>123 impressões</span>
          <span>123 comentários</span>
          <span>Publicado por Ênio Carlos</span>
        </div>
        <div class="flex flex-wrap gap-2 mt-2 w-full">
          <UiTag
            v-for="tag in tags"
            :key="tag"
            class="text-3"
          >
            {{ tag }}
          </UiTag>
        </div>
      </header>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quidem nisi ratione esse, molestias est magnam soluta ab repudiandae autem voluptates reprehenderit culpa, tempora neque ducimus atque distinctio, aut inventore!</p>
      <p>Cum enim corporis repellat dolores quas expedita omnis saepe animi dignissimos illum, nostrum impedit odit facere aliquam sequi. Praesentium, aspernatur vero ut dolor amet iste numquam, veritatis et, unde est rerum voluptatum itaque reiciendis eius blanditiis!</p>
      <p>Sed tempora iusto voluptatem incidunt magnam vel aliquid, vero mollitia, numquam nulla minus sit quibusdam est asperiores, maiores saepe reiciendis quae suscipit perferendis velit necessitatibus dolorem enim!</p>
      <p>Optio enim alias ab quae incidunt amet quos aliquam ipsam earum dignissimos eum magnam consequuntur harum rerum voluptatibus quisquam cupiditate deserunt, molestias dicta excepturi. Provident molestiae non excepturi illum distinctio quo voluptatem in reprehenderit nihil a, iusto officiis error, ratione maiores iure dolorem minima voluptatibus laboriosam! Facere inventore error molestias porro, ut officia expedita et velit fugit corporis provident totam vel, nobis quidem sint, minus accusantium quisquam odio? Odio commodi alias, vero voluptate corrupti, ex ipsam magni quae velit temporibus natus beatae harum asperiores sapiente exercitationem corporis? Molestias ipsa consequatur itaque. Atque quo quas quia dolore ea quidem aut totam ab. Eaque quia incidunt, ad quaerat enim voluptatibus distinctio corporis quo magnam voluptas officiis delectus quidem assumenda mollitia reiciendis? Deserunt odio, assumenda obcaecati molestiae enim voluptatibus, voluptate earum hic, unde veniam qui quisquam dolore? Blanditiis vel nisi magni facere fugit voluptates, non magnam neque quas libero alias quo vero velit at numquam repellendus distinctio corrupti quasi culpa fugiat quae sit! Consequatur atque ipsa ex explicabo optio vitae vero asperiores, aliquam eveniet delectus laborum perspiciatis totam a doloremque eligendi excepturi itaque nemo illo eum laboriosam repellat vel tenetur dolorem? Praesentium, dicta, eaque quis repellat dolore necessitatibus reiciendis neque magnam amet hic sit quae eligendi dignissimos, repellendus sint sunt reprehenderit. Mollitia, animi numquam omnis expedita corporis excepturi corrupti, dolorum perspiciatis dignissimos dolorem consectetur consequuntur tempore explicabo sequi minima rerum. Id necessitatibus sapiente odit, nulla alias ipsa velit, a adipisci quis reiciendis et vel eius iste in fugiat repudiandae?</p>
      <p>Fugiat dolores doloribus eum harum, et quasi quia distinctio ex sit voluptas explicabo numquam aut maiores alias quos voluptatem repudiandae eius. Dolorem tenetur obcaecati exercitationem amet, officiis aliquid, earum rerum provident quam molestias itaque quos, eveniet quibusdam maxime in incidunt ab dolor fugiat! Maxime ut necessitatibus, delectus expedita mollitia blanditiis dicta doloribus architecto, possimus ab doloremque quia? Accusantium est corporis facere aspernatur suscipit distinctio sapiente, quam neque non veniam placeat dolorum quibusdam in iusto adipisci eos quidem ex consequatur ipsam obcaecati debitis delectus accusamus ullam! Fugiat molestias illum eaque reiciendis cum enim, incidunt esse libero nam porro quasi quo omnis exercitationem totam quis. Magni omnis dolorem suscipit placeat consequatur tempore nostrum repudiandae aliquid sed impedit? Ducimus aperiam omnis quas atque! Quia repudiandae, neque nemo aperiam hic ea cum magnam asperiores soluta, ad ipsa porro, quaerat eius cupiditate quibusdam cumque sunt quos impedit optio doloremque earum. Quasi minima natus placeat saepe atque? Libero quo voluptatum ipsa vitae earum modi iure ullam eius iste.</p>
    </article>
    <aside class="w-100">
      <h2 class="text-6 font-title mb-2">
        Tópicos relacionados
      </h2>
    </aside>
  </div>
</template>

<style lang="scss">

</style>
