<template>
  <div class="not-found">
    <p>Impossible de trobar aquesta pagina</p>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  justify-content: center;
}
p {
  margin-top: 4rem;
  font-size: 2.5rem;
  color: #ea4d29;
}
@media only screen and (max-width: 850px) {
  p {
    font-size: 2rem;
  }
}
@media only screen and (max-width: 620px) {
  p {
    font-size: 1.6rem;
  }
}
@media only screen and (max-width: 450px) {
  p {
    font-size: 1.2rem;
  }
}
</style>
