<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FieldFormError",
  props: {
    condition: Boolean,
    message: String
  }
});
</script>

<template>
  <p class="pwd-err" v-if="condition">{{ message }}</p>
</template>

<style scoped>
.pwd-err {
  margin-top: -1.4rem;
  font-size: 0.7rem;
  font-weight: 600;
  color: #ca3122;
}
</style>
