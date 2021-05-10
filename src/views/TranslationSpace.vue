<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router";
import TranslationBox from "@/components/TranslationBox.vue";
import { useSentence } from "@/composables/useSentence";
import useTextareas from "@/composables/useTextareas";
import { useSessionStorage } from "@/composables/useSessionStorage";
import { capitalize, replaceAccent } from "@/utils/utils";

export default defineComponent({
  name: "TranslationSpace",
  components: {
    TranslationBox
  },
  setup() {
    const route = useRoute();
    const fullDialect = computed<string>(
      () =>
        capitalize(route.params.dialect as string) +
        " " +
        capitalize(route.params.subdialect as string)
    );
    const dialectAbbr = computed<string>(() => {
      const dialect: string = replaceAccent(route.params.dialect as string);
      const subdialect: string = replaceAccent(route.params.subdialect as string);
      return `${dialect.substr(0, 3)}_${subdialect.substr(0, 3)}`;
    });

    const { dialecte, skipSentence } = useSentence(dialectAbbr.value);

    function textareaExpender() {
      const textarea = document.getElementById("sentence") as HTMLElement;
      textarea.style.height = "";
      textarea.style.height = Math.min(textarea.scrollHeight, 65) + "px";
    }

    return {
      fullDialect,
      dialectAbbr,
      dialecte,
      skipSentence,
      ...useTextareas(),
      ...useSessionStorage()
    };
  }
});
</script>

<template>
  <h1 class="title">Traduccion en {{ fullDialect }}</h1>
  <div class="translation-space">
    <div class="tradoc-left">
      <img src="~@/assets/tradoc_cote1.svg" alt="image du côté gauche" />
    </div>
    <div class="translations-content">
      <div v-if="showInfoBoxes.one" class="info">
        <img src="~@/assets/info-outline.webp" alt="" width="16" height="16" />
        <p>Siá extrèmament rigorós quand traduses las frasas, per exemple, l'ordenador es pas pro intelligent per comprene que lo mot «frances» equival a «francés».</p>
        <img @click="hideBox(1)" src="~@/assets/cancel.webp" alt="" width="16" height="16" />
      </div>
      <div v-if="showInfoBoxes.two" class="info2">
        <img src="~@/assets/info-outline.webp" alt="" width="16" height="16" />
        <p>Las frasas provenon de sites web occitans, aquestas pòdon comportar de pècas, esites pas a las corregir s'es necessari.</p>
        <img @click="hideBox(2)" src="~@/assets/cancel.webp" alt="" width="16" height="16" />
      </div>
      <div v-if="showInfoBoxes.three" class="info3">
        <img src="~@/assets/info-outline.webp" alt="" width="16" height="16" />
        <p>Oblides pas las dònas, esites pas a femenizar la frasa quand es possible.</p>
        <img @click="hideBox(3)" src="~@/assets/cancel.webp" alt="" width="16" height="16" />
      </div>
      <textarea
        id="sentence"
        class="sentence"
        name="sentence"
        :value="dialecte.sentence"
        @input="textareaExpender"
        disabled
      ></textarea>
      <div class="translations-box">
        <TranslationBox
          v-for="(input, idx) in inputs"
          :key="`tsln-${idx}`"
          :fullDialect="fullDialect"
          :index="idx"
          v-model:occitan="input.occitan"
          v-model:french="input.french"
          v-model:english="input.english"
          :showEnglishBox="showEnglishBox"
        ></TranslationBox>
      </div>
      <div class="option-box">
        <p>Opcion :</p>
        <button @click="skipSentence();resetTextareas()">Passar aquela frasa</button>
        <button v-if="!showEnglishBox" @click="toggleEnglishBox">Traduire en anglés</button>
        <button v-if="showEnglishBox" @click="toggleEnglishBox">Anullar en anglés</button>
        <button v-if="inputs.length == 1" @click="addLadyTranslation">Feminizar la frasa</button>
        <button v-if="inputs.length == 2" @click="deleteLadyTranslation">Anullar la feminizacion</button>
      </div>
      <div class="btn-submit">
        <button
          class="submit-btn-trans"
          @click="submitTranslation(dialecte.id, dialectAbbr);skipSentence()"
          :disabled="disabledConfirmBtn(dialecte.sentence)"
        >Confirmar las traduccions</button>
      </div>
    </div>
    <div class="tradoc-right">
      <img src="~@/assets/tradoc_cote.svg" alt="image du côté droit" />
    </div>
  </div>
</template>

<style scoped>
.title {
  text-align: center;
  font-size: 1.7rem;
}
.translation-space {
  display: flex;
  justify-content: space-between;
}
.translations-content {
  flex-grow: 2;
  display: flex;
  flex-direction: column;
  gap: 1.5rem 0;
  padding: 0 1rem 0 1rem;
}
.info {
  display: flex;
  gap: 0 0.1rem;
  background-color: #507d82;
  border-radius: 5px 5px 5px 5px;
  padding: 0.3rem 0.5rem 0.3rem 0.5rem;
  margin-top: 0.5rem;
}
.info2 {
  display: flex;
  gap: 0 2rem;
  background-color: #507d82;
  border-radius: 5px 5px 5px 5px;
  padding: 0.3rem 0.5rem 0.3rem 0.5rem;
}
.info3 {
  display: flex;
  justify-content: space-between;
  background-color: #507d82;
  border-radius: 5px 5px 5px 5px;
  padding: 0.3rem 0.5rem 0.3rem 0.5rem;
}
.info > img,
.info2 > img,
.info3 > img {
  filter: invert(100%);
}
.info > p,
.info2 > p,
.info3 > p {
  font-size: 0.85rem;
  color: #ffffff;
  text-align: center;
}
.sentence {
  resize: none;
  outline: none;
  width: 100%;
  padding: 5px 6px 5px 6px;
  border: 1px solid #e6e6e6;
  border-radius: 8px 8px 8px 8px;
  background-color: #efefef;
  color: #507d82;
  font-size: 0.94rem;
  margin-top: 0.4rem;
}
.translations-box {
  display: flex;
  gap: 1rem 2rem;
  margin-top: 1.6rem;
}
.option-box {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 1rem;
}
.option-box > p {
  color: #404040;
  margin-right: 0.6rem;
  margin-top: 0.3rem;
}
button {
  color: #ffffff;
  background-color: #ea4d29;
  border-radius: 6px 6px 6px 6px;
  border: none;
  padding: 0.2rem 0.3rem 0.2rem 0.3rem;
  font-size: 0.6rem;
  margin-right: 0.6rem;
}
.btn-submit {
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn-submit > button {
  color: #ffffff;
  background-color: #ea4d29;
  border-radius: 6px 6px 6px 6px;
  border: none;
  padding: 0.5rem 1.3rem 0.5rem 1.3rem;
  font-size: 1.3rem;
  margin-right: 0.6rem;
}

.btn-submit > button:disabled {
  background-color: rgba(234, 77, 41, 0.5);
}

@media only screen and (max-width: 1000px) {
  .tradoc-left {
    display: none;
  }
  .tradoc-right {
    display: none;
  }
}
@media only screen and (max-width: 850px) {
  .title {
    font-size: 1.4rem;
  }
  .translations-box {
    flex-wrap: wrap;
  }
}
@media only screen and (max-width: 675px) {
  .title {
    font-size: 1.25rem;
  }
  .sentence {
    height: 5rem;
  }
  .translations-content {
    padding: 0 0.6rem 0 0.6rem;
  }
}
@media only screen and (max-width: 450px) {
  .sentence {
    height: 7rem;
  }
  .translations-content {
    padding: 0 0.2rem 0 0.2rem;
  }
}
</style>
