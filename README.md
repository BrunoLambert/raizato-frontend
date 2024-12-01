# Documentação

## Uso do Nuxt
Foi decidido usar o Nuxt por causa do tempo para construir o projeto por inteiro. Nuxt poupa tempo com algumas configurações que uma aplicação com, apenas, Vue precisa.

## Packages Adicionais
Junto com Vue e Nuxt, foram usadaos alguns recursos adicionais para ajudar na construção do projeto, tanto em velocidade tanto em praticidade:

* **Nuxt UI**: Componentes prontos para criar a interface
* **Pinia**: Package que cria uma store estilo Vuex para Nuxt 3.

## UI

### Cores
As cores usadas para a construção do sistema foram baseados no logo da empresa Raizato:
* Primária: **#18d556**
* Secundária: **#2a8cfd**

### Design
Design foi pensado de forma simples porém moderna, usando uma abordagem minimalista de mostrar apenas o necessário dentre as opções.

## Estrutura
A estrutura do projeto segue o padrão apresentado na documentação do Nuxt sendo:
* assets: Arquivos de Style e Types (Typescript)
* components: Todos os componentes usados pela aplicação, cuja subpastas representam o contexto que estão inseridas.
* composables: Hooks customizados usados para facilitar e evitar repetição de código em todo lugar.
* layouts: Contém os arquivos que podem ser usados para layout na aplicação. No caso, existe apenas um, pois o único layout necessário era para a parte da aplicação logada.
* pages: Nuxt faz as rotas baseadas nessa pasta, então todas as páginas estarão diagramadas dentro dela em arquivos e subpastas.
* public: arquivos acessados publicamente
* server: SSR do Nuxt (não foi utiizado para essa aplicação)
* store: Usando o Pinia para criar Stores que permitem manipular dados e chamar funções de forma "global" e de forma organizada.
* util: Funções utilizadas pela aplicação sem a necessidade de imports (Nuxt já importa por contexto).

# Starting the Project
You can check, bellow, what commands you need to run to start the project.

## Nuxt UI Minimal Starter

Look at [Nuxt docs](https://nuxt.com/docs/getting-started/introduction) and [Nuxt UI docs](https://ui.nuxt.com) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
