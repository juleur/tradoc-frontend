<script lang="ts">
import { defineComponent, PropType } from "vue";
import { DialectFile } from "@/models/dialect_file";

export default defineComponent({
  name: "DialectTranslatedFiles",
  props: {
    dialectFile: Object as PropType<DialectFile>
  }
});
</script>

<template>
  <div class="translation-box">
    <div class="translation-nom-box">
      <h3>{{ dialectFile.nom }}</h3>
    </div>
    <div class="translations-box">
      <div
        class="translation-box"
        v-for="(sub, idx) in dialectFile.subdialectFiles"
        :key="sub.nom"
      >
        <h4>{{ sub.nom }}</h4>
        <div class="translation-download-box">
          <div class="download-file">
            <a :href="sub.filepathFr" download>
              <img
                src="@/assets/cloud-download-outline.webp"
                alt="download"
                width="35"
                height="35"
                :style="[sub.filepathFr === null ? {opacity: 0.4, 'pointer-events': 'none'} : {opacity: 1}]"
              />
            </a>
            <p
              class="lang"
              :style="[sub.filepathFr === null ? {opacity: 0.4, 'pointer-events': 'none'} : {opacity: 1}]"
            >francés</p>
          </div>
          <div class="download-file">
            <a :href="sub.filepathEn" download>
              <img
                src="@/assets/cloud-download-outline.webp"
                alt="download"
                width="35"
                height="35"
                :style="[sub.filepathEn === null ? {opacity: 0.4, 'pointer-events': 'none'} : {opacity: 1}]"
              />
            </a>
            <p class="lang"
              :style="[sub.filepathEn === null ? {opacity: 0.4, 'pointer-events': 'none'} : {opacity: 1}]"
            >anglés</p>
          </div>
        </div>
        <hr v-if="idx < dialectFile.subdialectFiles.length - 1" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.translation-box {
  display: flex;
  flex-direction: column;
  min-width: 300px;
}
.translation-nom-box {
  border-radius: 8px 8px 0 0;
  padding: 10px 0 10px 0;
  background: linear-gradient(to right, #ea4d29 20%, #ed8d83 95%);
  box-shadow: 0 10px 10px -12px #404040;
}
.translation-nom-box > h3 {
  text-align: center;
  color: #ffffff;
  text-transform: uppercase;
}
.translations-box {
  border-radius: 0 0 8px 8px;
  border-left: 1.5px solid rgba(152, 152, 152, 0.3);
  border-right: 1.5px solid rgba(152, 152, 152, 0.3);
  border-bottom: 1.5px solid rgba(152, 152, 152, 0.3);
}
.translation-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
}
.translation-box > h4 {
  text-align: center;
  color: #ea4d29;
  margin-bottom: 0.55rem;
}
.translation-download-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.download-file {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.download-file > a > img:hover {
  filter: invert(46%) sepia(8%) saturate(1563%) hue-rotate(138deg) brightness(94%) contrast(85%);
}
.lang {
  color: #ed8d83;
  opacity: 0.6;
  font-size: 0.95rem;
  font-style: oblique 5deg;
}
hr {
  display: flex;
  margin: 0.4rem 1.3rem 0 1.3rem;
  border-radius: 10px 10px 10px 10px;
  opacity: 0.3;
  height: 1.5px;
  border: 0;
  background-color: #989898;
}
</style>
