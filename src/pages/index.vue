<script setup lang="ts">
const title = 'Website'
const description = 'es una platafòrma participativa de traduccion dels dialèctes Occitans en Francés e/o Anglés.'
</script>

<template>
  <div class="home">
    <img class="poly1" src="public/assets/svg/polygone_1.svg" alt="" />
    <img class="poly2" src="public/assets/svg/polygone_2.svg" alt="" />
    <img class="poly3" src="public/assets/svg/polygone_3.svg" alt="" />
    <img class="illus-home" src="public/assets/svg/illustrations_home.svg" alt="" />
    <h1 class="title">
      {{ title }}
    </h1>
    <h2 class="description">
      {{ description }}
    </h2>
    <h3 class="more-info">
      Utilizaràn puèi aquelas traduccions per formar un
      <a
        href="https://www.neurotrad.com/blog/nmt-neural-machine-translation/"
        rel="noreferrer"
        target="_blank"
      >motor de traduccion automatica neuronala</a>.
    </h3>
  </div>
</template>

<style scoped>
.home {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: repeat(8, auto);
  margin: 0 2vw 0 2vw;
}

.title {
  grid-column: 2/3;
  grid-row: 1;
  color: #ea4d29;
  text-transform: uppercase;
  font-size: 1.4rem;
  font-family: "Cera Pro Medium";
  align-self: flex-end;
}
.poly1 {
  width: 6rem;
  grid-column: 1 / 2;
  grid-row: 1;
}
.poly2 {
  width: 10rem;
  grid-column: 1 / 2;
  grid-row: 5;
}
.poly3 {
  width: 10rem;
  grid-column: 4 / 5;
  grid-row: 4;
}
.illus-home {
  width: 30rem;
  grid-column: 5 / -1;
  justify-self: center;
  grid-row: 2/6;
}
.description {
  grid-column: 2 / 6;
  grid-row: 2;
  text-transform: uppercase;
  font-size: 1.2rem;
  font-family: "Cera Pro Medium";
  color: #404040;
}
.more-info {
  grid-column: 2 / 4;
  grid-row: 4;
  color: #989898;
  font-weight: 100;
  font-size: 0.9rem;
}
.more-info > a {
  text-decoration: none;
  color: rgba(64, 64, 64, 0.7);
}
.more-info > a:hover {
  color: #ed8d83;
}

@media only screen and (max-width: 1279px) {
  .home {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, auto);
  }
  .illus-home {
    display: none;
  }
  .description {
    grid-column: 2 / 4;
    grid-row: 2;
  }
}
@media only screen and (max-width: 960px) {
  .home {
    grid-template-columns: 1fr 3fr 1fr;
    grid-template-rows: repeat(3, auto);
  }
  .description {
    grid-column: 2/4;
    grid-row: 2;
  }
}
@media only screen and (max-width: 800px) {
  .home {
    margin: 2rem 1rem 4rem 1rem;
    grid-template-columns: 1fr 3fr 1fr;
    grid-template-rows: repeat(3, auto);
  }
  .poly1,
  .poly2,
  .poly3 {
    display: none;
  }
  .description {
    grid-column: 2/3;
    grid-row: 2;
  }
  .more-info {
    grid-column: 2/3;
    grid-row: 3;
  }
}
@media only screen and (max-width: 550px) {
  .home {
    margin: 1rem 0.5rem 2rem 0.5rem;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3, auto);
  }
  .description {
    grid-column: 2/-1;
    grid-row: 2;
  }
  .more-info {
    grid-column: 2/-1;
    grid-row: 3;
  }
}
</style>

<!-- <template>
  <div>INDEX</div>
  <div>
    <p class="text-4xl">
      <carbon-campsite class="inline-block" />
    </p>
    <p>
      <a rel="noreferrer" href="https://github.com/antfu/vitesse-lite" target="_blank">
        Vitesse Lite
      </a>
    </p>
    <p>
      <em class="text-sm opacity-75">Opinionated Vite Starter Template</em>
    </p>

    <div class="py-4" />

    <input
      id="input"
      v-model="name"
      placeholder="What's your name?"
      type="text"
      autocomplete="false"
      p="x-4 y-2"
      w="250px"
      text="center"
      bg="transparent"
      border="~ rounded gray-200 dark:gray-700"
      outline="none active:none"
      @keydown.enter="go"
    >

    <div>
      <button
        class="m-3 text-sm btn"
        :disabled="!name"
        @click="go"
      >
        Go
      </button>
    </div>
  </div>
</template> -->
