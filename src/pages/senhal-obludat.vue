<script setup lang="ts">
import { useToast } from 'vue-toastification'
import { sendPasswordReset } from '~/services'

const toast = useToast()
const router = useRouter()

const email = ref<string>('')

const IsEmailValid = computed<boolean>(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value))

async function submit() {
  const result = await sendPasswordReset(email.value)
  result.map((msgResp) => {
    toast.success(msgResp)
    setTimeout(() => router.push('/connexion'), 1100)
  }).mapErr(err => toast.error(err.msg))

  email.value = ''
}
</script>

<template>
  <div class="senhal-obludat-box">
    <h2>Senhal obludat</h2>
    <form @submit.prevent="submit">
      <input v-model="email" type="email" placeholder="Saisissez votre email">
      <button :disabled="!IsEmailValid">
        Enviar
      </button>
    </form>
  </div>
</template>

<style>
.senhal-obludat-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}
h2 {
  margin-bottom: 2rem;
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7rem 0;
}
input {
  width: 400px;
  height: 1.9rem;
  padding: 0 6px 0 6px;
}
button {
  width: 120px;
}
input::placeholder {
  color: rgba(87, 87, 87, 0.6);
}
input:focus {
  outline: none;
}
button {
  height: 2.3rem;
  background: linear-gradient(to right, #ea4d29 0%, #ed8d83 75%);
  color: #ffffff;
  border: none;
  border-radius: 5px 5px 5px 5px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
}
button:disabled {
  opacity: 0.5;
}
</style>
