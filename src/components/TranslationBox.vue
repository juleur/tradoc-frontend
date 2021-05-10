<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TranslationBox",
  props: {
    fullDialect: String,
    index: Number,
    occitan: String,
    french: String,
    english: String,
    showEnglishBox: Boolean
  },
  emits: ["update:occitan", "update:french", "update:english"]
});
</script>

<template>
  <div class="translation-box">
    <!-- occitan -->
    <p>{{ fullDialect }}</p>
    <textarea
      v-if="index == 0"
      :value="occitan"
      @input="$emit('update:occitan', $event.target.value)"
      name="occitan"
      placeholder="Aicí, tradutz la frasa çai-sus dins ton dialècte."
    ></textarea>
    <textarea
      v-if="index == 1"
      :value="occitan"
      @input="$emit('update:occitan', $event.target.value)"
      name="occitan"
      placeholder="Aicí, feminiza la frasa qu'as traducha a esquèrra."
    ></textarea>
    <!-- french -->
    <p>Francés</p>
    <textarea
      :value="french"
      @input="$emit('update:french', $event.target.value)"
      name="french"
      placeholder="Aicí, tradutz la frasa çai-sus en francés."
    ></textarea>
    <!-- english -->
    <p v-if="showEnglishBox">Anglés</p>
    <textarea
      v-if="showEnglishBox"
      :value="english"
      @input="$emit('update:english', $event.target.value)"
      name="english"
      placeholder="Aicí, tradutz la frasa çai-sus en anglés."
    ></textarea>
  </div>
</template>

<style scoped>
.translation-box {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  min-width: 300px;
}
textarea {
  outline: none;
  resize: none;
  min-height: 100px;
  padding: 5px 6px 0px 6px;
  border: 1px solid #e6e6e6;
  border-radius: 8px 8px 8px 8px;
  background-color: #efefef;
  font-size: 0.94rem;
  margin-bottom: 1.3rem;
}
p {
  color: #ea4d29;
  font-size: 1rem;
  margin: 0 0 0.3rem 0.2rem;
}
</style>
