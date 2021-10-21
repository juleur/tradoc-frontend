<script setup lang="ts">
import { useToast } from 'vue-toastification'
import { TranslationFile } from '~/models'
import { getTranslationsFiles } from '~/services'
import DialectTranslationsFiles from '~/components/traduccions/DialectTranslationsFiles.vue'

const toast = useToast()

const translationsFiles = ref<TranslationFile[]>([])

onMounted(async() => {
  const result = await getTranslationsFiles()
  result.map(data => translationsFiles.value = data).mapErr(err => toast.error(err))
})

const lastUpdateFiles = computed<string>(() => {
  const curr = new Date()
  const lastMonday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 1))
  return `${lastMonday.getDate()}/${lastMonday.getUTCMonth() + 1}/${lastMonday.getFullYear()}`
})
</script>

<template>
  <div class="translation-files-box">
    <h1>Las Traduccions Occitanas</h1>
    <p class="mini-sentence">
      Cal un minimum de 20 000 frasas reviradas abans de poder entrainar un <a href="https://en.wikipedia.org/wiki/Neural_machine_translation" rel="noreferrer" target="_blank">NMT</a>
    </p>
    <div class="translation-files-dialects-box">
      <DialectTranslationsFiles
        v-for="translationsFile in translationsFiles"
        :key="translationsFile.dialect"
        :value="translationsFile"
      >
      </DialectTranslationsFiles>
    </div>
    <p class="last-update">
      <span>Darrièra mesa a jorn:</span> {{ lastUpdateFiles }}
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
  margin: 0 2.5vw 0 2.5vw;
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
@media only screen and (max-width: 1000px) {
  .translation-files-dialects-box {
    margin: 0 0 0 0;
  }
}
</style>
