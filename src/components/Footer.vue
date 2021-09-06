<template>
  <footer>
    <img src="../../public/assets/img/wave_footer.webp">
    <a href="https://github.com/antfu/vitesse-lite" target="_blank" rel="noreferrer">
      <carbon-logo-github width="50" height="50" />
    </a>
  </footer>
</template>

<style scoped>
footer {
  margin-top: 3rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 150px 150px 150px;
}
img {
  width: 100% !important;
  height: 450px;
  grid-column: 1/-1;
  grid-row: 1/-1;
}
a {
  grid-column: 2/3;
  grid-row: 2/3;
  justify-self: center;
  color: inherit;
  text-decoration: none;
}
a:hover {
  color: #507d82;
}

@media only screen and (max-width: 1000px) {
  footer {
    grid-template-rows: 100px 100px 100px;
  }
  img {
    height: 300px;
  }
}
@media only screen and (max-width: 700px) {
  footer {
    grid-template-rows: 70px 70px 70px;
  }
  img {
    height: 210px;
  }
}
@media only screen and (max-width: 450px) {
  footer {
    grid-template-rows: 50px 50px 50px;
  }
  img {
    height: 150px;
  }
}
</style>
