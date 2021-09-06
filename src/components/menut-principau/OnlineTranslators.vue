<script setup lang="ts">
defineProps({ online: { type: Number, required: true } })
</script>

<template>
  <p v-if="online > 1">
    Sètz actualament <span>{{ online }}</span> traductors en linha
  </p>
  <p v-else>
    Siás actualament <span>l'unic</span> traductor en linha
  </p>
</template>

<style scoped>
p {
  margin-top: 1.2rem;
  font-size: 0.95rem;
  color: #ea4d29;
}
p > span {
  color: #404040;
  font-weight: bolder;
}
</style>
