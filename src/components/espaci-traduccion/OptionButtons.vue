<script setup lang="ts">

const props = defineProps({
  showEnglishBox: {
    type: Boolean,
    required: true,
  },
  showFemaleBoxes: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['skip-sentence', 'toggle-english', 'toggle-female'])

const skipSentenceBtn = () => emit('skip-sentence', null)
const toggleEnglishBtn = () => emit('toggle-english', !props.showEnglishBox)
const toggleFemaleBtn = () => emit('toggle-female', !props.showFemaleBoxes)
</script>

<template>
  <div class="option-box">
    <p>Opcion :</p>
    <button @click="skipSentenceBtn">
      Passar aquela frasa
    </button>
    <button v-if="!showEnglishBox" @click="toggleEnglishBtn">
      Traduire en anglés
    </button>
    <button v-if="showEnglishBox" @click="toggleEnglishBtn">
      Anullar en anglés
    </button>
    <button v-if="!showFemaleBoxes" @click="toggleFemaleBtn">
      Feminizar la frasa
    </button>
    <button v-if="showFemaleBoxes" @click="toggleFemaleBtn">
      Anullar la feminizacion
    </button>
  </div>
</template>

<style scoped>
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
p {
  margin: 0;
}
</style>
