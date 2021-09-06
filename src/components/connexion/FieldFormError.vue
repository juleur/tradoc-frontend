<script setup lang="ts">

defineProps({ condition: Boolean, message: String })
</script>

<template>
  <p v-if="condition" class="pwd-err">
    {{ message }}
  </p>
</template>

<style scoped>
.pwd-err {
  margin-top: -1.4rem;
  font-size: 0.7rem;
  font-weight: 600;
  color: #ca3122;
}
</style>
