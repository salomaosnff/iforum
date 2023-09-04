<script setup lang="ts">

</script>

<template>
  <div class="mx-auto prose container">
    <div>
      <div>
        <h1 data-test>
          Por que utilizo o Vue.js?
        </h1>
      </div>
      <p>
        Quase todos os dias recebo essa pergunta, não sou muito de escrever, mas hoje resolvi transformar as minhas
        opiniões em um artigo.
      </p>
      <blockquote>
        <p>
          Este artigo é baseado em experiências que eu tive com alguns frameworks do mercado, por isso, não irei falar
          muito sobre opiniões técnicas.
        </p>
      </blockquote>
      <p>
        Até 2015, eu desenvolvia minhas aplicações somente com o JavaScript Vanilla, Eu já estava cansado de fazer algumas
        tarefas e foi então que eu senti a necessidade de utilizar um framework.
      </p>
      <h1>
        Angular.js
      </h1>
      <p>
        O Angular 1 foi o o primeiro framework que eu tive contato, por meses eu estudei ele mas eu sempre achei ele um
        pouco complexo. Controladores, models, serviços e outras coisas que não lembro no momento só vinham para me
        confundir. Eu consegui criar algumas aplicações com ele mas nada tão grande. Experimentei também o angular 2, mas
        achei ele um pouco pesado e não vi muita vantagem e foi então que eu desisti do Angular.
      </p>
      <h1>
        React.js
      </h1>
      <p>
        Minha experiência com o React.js foi um pouco curta mas consegui absorver algumas coisas sobre ele. Percebi que
        ele era bem mais rápido que o Angular e o tamanho do arquivo também era mais leve. Eu tive um susto ao ver o JSX,
        eu nunca tinha visto HTML junto ao JavaScript. Tentei me adaptar com aquilo mas não consegui. Outra coisa que
        achei estranho foi o data binding, quando vi isso pela primeira vez eu fiquei tipo: <strong>WTF! </strong>como
        algo tão simples no angular pode ser tornar em várias linhas no React? Talvez eu tenha aprendido a maneira errada,
        mas enfim, desisti dele e fui atrás de algo que eu me identificasse melhor.
      </p>
      <h1>
        Vue.js
      </h1>
      <p>
        Estou utilizando o Vue.js há 1 ano, e até agora não tenho o que reclamar.<br>O primeiro ponto a se falar, é a
        curva de aprendizagem, enquanto que no Angular.js e no React.js aprendi o básico em algumas semanas, com o Vue.js
        eu aprendi até mesmo tópicos mais avançados no mesmo tempo!<br>A simplicidade do Vue.js me possibilitou criar
        aplicações que eu não conseguia criar com os frameworks anteriores. No Vue.js tem o melhor do Angular.js e do
        React!
      </p>
      <p>
        O Objetivo do Vue.js e do React.js é criar interfaces reativas, e era exatamente isso que eu consegui, só que com
        a facilidade do Angular, pois, nele há algumas diretivas semelhantes como o v-if e v-model.
      </p>
      <h2>
        Vue templates
      </h2>
      <p>
        Diferente do JSX, os vue templates são mais organizados, tendo o código HTML entre as
        tags<code>&lt;template&gt; &lt;/template&gt;</code>, o código CSS entre as
        tags<code>&lt;style&gt; &lt;/style&gt;</code>, e o código JavaScript do componente entre as
        tags<code>&lt;script&gt;&lt;/script&gt;</code>.
      </p>
      <p>
        Além de separar o código por blocos, eu posso também separar em arquivo, basta adicionar o atributo
        <code>src</code> na tag <code>&lt;style&gt;</code> ou <code>&lt;script&gt;</code>
      </p>
      <p>
        Os Vue templates também me possibilita utilizar pré-processadores, basta apenas instalar o compilador e seu
        respectivo loader para webpack. Assim, posso escrever o estilo dos componentes usando o Stylus, SASS ou LESS
        dentro da tag <code>&lt;style&gt;</code> do template.
      </p>
      <h2>
        Performance
      </h2>
      <p>
        A performance do Vue.js é bem semelhante a do React.js, acredito que seja por causa do virtual-dom contido também
        no React.js.
      </p>
      <h2>
        Libs e plugins
      </h2>
      <p>
        A comunidade do vue.js fornece 2 plugins oficiais para a criação de aplicações mais complexas, que são eles o <a
          href="https://vuex.vuejs.org/en"
          rel="noopener ugc nofollow"
          target="_blank"
        >vuex</a> e <a
          href="https://router.vuejs.org/en"
          rel="noopener ugc nofollow"
          target="_blank"
        >vue-router</a>. Mas existem
        também módulos não oficiais como o <a
          href="https://github.com/axios/axios"
          rel="noopener ugc nofollow"
          target="_blank"
        >axios</a> para consumir recursos HTTP.
      </p>
      <p>
        Há um bom número de bibliotecas para interface de sua aplicação, eu gosto muito do <a
          href="http://vuetifyjs.com"
          rel="noopener ugc nofollow"
          target="_blank"
        >Vuetify</a> pela variedade de componentes, mas existem outras como o
        <a
          href="http://quasar-framework.org"
          rel="noopener ugc nofollow"
          target="_blank"
        >Quasar</a>, <a
          href="https://vuematerial.github.io/"
          rel="noopener ugc nofollow"
          target="_blank"
        >Vue Material</a>, <a
          href="https://github.com/vuejs/awesome-vue#component-collections"
          rel="noopener ugc nofollow"
          target="_blank"
        >e
          várias outras…</a>
      </p>
      <h2>
        Da comunidade para a comunidade
      </h2>
      <p>
        Vue.js não é mantido por uma empresa, diferente do Angular.js que é mantido pela Google, e o React.js que é
        mantido pelo Facebook, o Vue.js foi um projeto pessoal que devido a sua qualidade, passou a ser uma boa
        alternativa.
      </p>
      <h1>
        Conclusão
      </h1>
      <p>
        Este artigo não foi escrito para fazer você largar as ferramentas que você já utiliza toda ferramenta possui seus
        pontos fortes, e aqui apresento uma opção viável para qualquer tipo de projeto. #pas
      </p>
    </div>
  </div>
</template>

<style lang="scss"></style>
