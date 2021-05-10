<script lang="ts">
import { defineComponent } from "vue";
import DialectTranslatedFiles from "@/components/DialectTranslatedFiles.vue";
import { useDialectFiles } from "@/composables/useDialectFiles";

export default defineComponent({
  name: "TranslationFiles",
  components: {
    DialectTranslatedFiles
  },
  setup() {
    return { ...useDialectFiles() };
  }
});
</script>

<template>
  <div class="translation-files-box">
    <h1>Las Traduccions Occitanas</h1>
    <p class="mini-sentence">Cal un minimum de 5 000 frasas reviradas abans de poder entrainar un <a href="https://en.wikipedia.org/wiki/Neural_machine_translation" rel="noreferrer" target="_blank">NMT</a></p>
    <div class="translation-files-dialects-box">
      <DialectTranslatedFiles
        v-for="dialectFile in allFiles.dialectFiles"
        :dialectFile="dialectFile"
        :key="dialectFile.nom"
      ></DialectTranslatedFiles>
    </div>
    <p class="last-update">
      <span>Darrièra mesa a jorn:</span> {{ allFiles.lastDatetimeGenFile }}
    </p>
  </div>
</template>

<style scoped>
.translation-files-box {
  display: flex;
  flex-basis: 90%;
  flex-direction: column;
  align-items: center;
}
h1 {
  margin-bottom: 1rem;
  color: #404040;
}
.translation-files-dialects-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  gap: 2rem 3rem;
}
.last-update {
  margin-top: 1rem;
  font-size: 0.95rem;
  color: #989898;
}
.last-update > span {
  color: #404040;
  text-decoration: underline;
  font-style: oblique 10deg;
  margin-right: 0.2rem;
}
.mini-sentence {
  margin-bottom: 0.8rem;
  color: #507d82;
  font-size: 1.05rem;
}
.mini-sentence > a {
  color: #2f5457;
  text-decoration: none;
}
.mini-sentence > a:hover {
  color: #989898;
  opacity: 0.85;
}
</style>
