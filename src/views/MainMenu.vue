<script lang="ts">
import { defineComponent } from "vue";
import DialectDetails from "@/components/DialectDetails.vue";
import OnlineTranslators from "@/components/OnlineTranslators.vue";
import { useDialects } from "@/composables/useDialects";

export default defineComponent({
  name: "MainMenu",
  components: {
    DialectDetails,
    OnlineTranslators
  },
  setup() {
    return { ...useDialects() };
  }
});
</script>

<template>
  <div class="menut-principal-box">
    <h1>Los Dialectes Occitans</h1>
    <div class="menut-principal-dialects-box">
      <DialectDetails
        v-for="dialect in mainMenu.dialects"
        :key="dialect.nom"
        :dialect="dialect"
      ></DialectDetails>
    </div>
    <OnlineTranslators :online="mainMenu.totalOnlineTranslators"></OnlineTranslators>
    <p class="other-dialect">Contacta l'admin se desiras apondre un sosdialècte</p>
  </div>
</template>

<style scoped>
.menut-principal-box {
  background-image: url("~@/assets/forme_dialecte.svg");
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  flex-basis: 90%;
  flex-direction: column;
  align-items: center;
}
.menut-principal-box > h1 {
  margin-bottom: 2.5rem;
}
.menut-principal-dialects-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem 2rem;
}
h1 {
  color: #404040;
}
.other-dialect {
  margin-top: 2.25rem;
  font-size: 1rem;
  color: #989898;
  font-style: oblique 5deg;
}
</style>
