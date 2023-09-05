<div style="text-align:center; margin: 3rem 0;">
  <img src="../../../../assets/iforum.svg" height="64" style="filter: drop-shadow(4px 4px 0px black) drop-shadow(8px 2px 0px black)">
</div>

## Páginas

<p>Aqui ficam o código das telas da aplicação.<p>

Cada arquivo `.vue` representa uma rota específica e segue o seguinte padrão:

| Nome do arquivo       | Rota criada automaticamente |
| --------------------- | --------------------------- |
| index.vue             | /                           |
| foo.vue               | /foo                        |
| foo/index.vue         | /foo                        |
| foo/\[bar\].vue       | /foo/`bar`                  |
| foo/\[bar\]/index.vue | /foo/`bar`                  |
| foo/\[bar\]/baz.vue   | /foo/`bar`/baz              |
| \[...all\].vue        | `Todas as outras rotas`     |