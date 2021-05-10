<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Protected"
});
</script>

<template>
  <div class="protected">
    <h2>Problèma d'autentificacion</h2>
    <p>As pas l'autorizacion d'accedir a aquela pagina, pregària de contactar l'administrator.</p>
  </div>
</template>

<style scoped>
.protected {
  display: flex;
  flex-direction: column;
  height: 50vh;
  align-items: center;
  justify-content: center;
  gap: 1rem 0;
}
h2 {
  color: #ed8d83;
}
p {
  color: #507d82;
}
</style>
