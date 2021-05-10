<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Footer"
});
</script>

<template>
  <footer>
    <div class="discord-like">
      <h4>Rejonhètz-nos sus Discord</h4>
      <div class="discord-info">
        <img
          src="~@/assets/flags/discord-nostre-pais.webp"
          alt="image discord Nòstre País"
        />
        <h4>Nòstre País</h4>
        <a href="https://discord.gg/BaN9v46" rel="noreferrer" target="_blank">
          <p>Rejónher</p>
        </a>
      </div>
    </div>
    <p class="designer">Designat per <a href="https://www.behance.net/tjze" rel="noreferrer" target="_blank">Thomas Jauze</a></p>
  </footer>
</template>

<style scoped>
footer {
  background-image: url("~@/assets/wave_footer.svg");
  height: 256px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  padding-top: 4rem;
}
.discord-like {
  max-width: 400px;
  min-width: 300px;
}
.discord-info {
  padding: 1rem 1rem 1rem 1rem;
  display: flex;
  align-items: center;
  background-color: #232529;
  border-radius: 1px 1px 1px 1px;
}
.discord-like > h4 {
  color: #ffffff;
}
.discord-info > h4 {
  color: #ffffff;
  font-size: 1rem;
  margin-right: 4rem;
}
.discord-info > img {
  width: 60px;
  height: 60px;
  border-radius: 18px 18px 18px 18px;
  margin-right: 1rem;
}
.discord-info > a {
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: #ffffff;
  width: 130px;
  height: 45px;
  border-radius: 3px 3px 3px 3px;
  background-color: #39a96d;
  font-size: 1rem;
}
.designer {
  font-size: 0.9rem;
  color: #ffffff;
}
.designer > a {
  text-decoration: none;
  color: #404040;
  font-weight: 600;
}
@media only screen and (max-width: 750px) {
  body {
    margin: 0 -0.5rem 0 -0.5rem !important;
  }
  .discord-info > h4 {
    font-size: 0.8rem;
    margin-right: 3.5rem;
  }
}
@media only screen and (max-width: 550px) {
  footer {
    height: 210px;
    margin-top: 4rem;
  }
  .discord-info > h4 {
    margin-right: 1.75rem;
  }
}
@media only screen and (max-width: 400px) {
  .discord-info > h4 {
    margin-right: 1rem;
  }
}
@media only screen and (max-width: 350px) {
  .discord-info > h4 {
    font-size: 0.6rem;
    margin-right: 0.4rem;
  }
}
</style>
