<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Dialect } from "@/models/dialect";

export default defineComponent({
  name: "DialectDetails",
  props: {
    dialect: Object as PropType<Dialect>
  }
});
</script>

<template>
  <div class="dialect-box">
    <div class="dialect-nom-box">
      <h3>{{ dialect.nom }}</h3>
    </div>
    <div class="subdialects-box">
      <div
        class="subdialect-box"
        v-for="(sub, idx) in dialect.subdialects"
        :key="sub.nom"
      >
        <router-link
          :to="`/espaci-traduccion/d/${dialect.nom.toLowerCase()}/sb/${sub.nom.toLowerCase()}`"
        >
          <h4>{{ sub.nom }}</h4>
          <p>Total de las frasas tradusidas <span>{{ sub.total_sentences_translated }}</span></p>
        </router-link>
        <hr v-if="idx < dialect.subdialects.length - 1" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.dialect-box {
  display: flex;
  flex-direction: column;
  min-width: 300px;
}
.dialect-nom-box {
  border-radius: 8px 8px 0 0;
  padding: 10px 0 10px 0;
  background: linear-gradient(to right, #ea4d29 20%, #ed8d83 95%);
  box-shadow: 0 10px 10px -12px #404040;
}
.dialect-nom-box > h3 {
  text-align: center;
  color: #ffffff;
  text-transform: uppercase;
}
.subdialects-box {
  border-radius: 0 0 8px 8px;
  border-left: 1.5px solid rgba(152, 152, 152, 0.3);
  border-right: 1.5px solid rgba(152, 152, 152, 0.3);
  border-bottom: 1.5px solid rgba(152, 152, 152, 0.3);
}
.subdialect-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.subdialect-box > a > h4 {
  color: #404040;
  text-align: center;
  padding: 10px 0 4px 0;
}

.subdialect-box > a > p {
  color: #989898;
  font-size: 0.98rem;
  padding: 2px 0 15px 0;
}

.subdialect-box > a > p > span {
  color: #ea4d29;
  font-weight: bold;
}
.subdialect-box:hover {
  background-color: rgba(152, 152, 152, 0.15);
}
a {
  text-decoration: none;
}

a:visited {
  color: inherit;
}

hr {
  display: flex;
  width: 90%;
  border-radius: 10px 10px 10px 10px;
  opacity: 0.3;
  height: 1.5px;
  border: 0;
  background-color: #989898;
}
</style>
