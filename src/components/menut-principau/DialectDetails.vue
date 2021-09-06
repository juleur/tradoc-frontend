<script setup lang="ts">
import type { PropType } from '@vue/runtime-core'
import { Dialect } from '~/models'
import { capitalize } from '~/logic'
import { isYourDialects } from '~/helpers'

defineProps({ dialect: { type: Object as PropType<Dialect>, required: true } })

</script>

<template>
  <div class="dialect-box">
    <div class="dialect-nom-box">
      <h3>{{ dialect.dialect }}</h3>
    </div>
    <div class="subdialects-box">
      <div
        v-for="(sub, idx) in dialect.subdialects"
        :key="sub.subdialect"
        class="subdialect-box"
      >
        <router-link
          :to="`/espaci-traduccion/${dialect.dialect}-${sub.subdialect}`"
        >
          <h4>{{ capitalize(sub.subdialect) }}</h4>
          <p>Total de las frasas tradusidas <span>{{ sub.total_translations }}</span></p>
          <p v-if="isYourDialects(dialect.dialect, sub.subdialect)" class="by-you">
            Dont <span>{{ sub.total_translation_by_translator }}</span> per tieu
          </p>
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
p {
  margin: 0 0.8rem 0 0.8rem;
  text-align: center;
}
.by-you {
  font-size: 0.85rem !important;
}
</style>
