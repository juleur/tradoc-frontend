<script setup lang="ts">
import Cookies from 'js-cookie'

const props = defineProps({
  msg: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
})

const show = ref<boolean>(false)

onMounted(() => {
  if (Cookies.get(`info-${props.id}`) === undefined)
    show.value = true
})

const close = () => {
  Cookies.set(`info-${props.id}`, '', { expires: 7 })
  show.value = !show.value
}
</script>

<template>
  <div v-if="show">
    <ant-design:info-circle-filled color="#ffffff" width="16" height="16" />
    <p>{{ msg }}</p>
    <ic:outline-cancel color="#ffffff" width="16" height="16" @click="close()" />
  </div>
</template>

<style scoped>
div {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #507d82;
  border-radius: 5px 5px 5px 5px;
  padding: 0.3rem 0.5rem 0.3rem 0.5rem;
  margin-top: 0.5rem;
  height: 20px;
}
div > p {
  font-size: 0.85rem;
  color: #ffffff;
  text-align: center;
}
</style>
