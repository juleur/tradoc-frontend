<script setup lang="ts">
import { useToast } from 'vue-toastification'
import { getConfirmPasswordResetToken, updatePassword } from '~/services'
import { useConfirmTokenForm } from '~/composables'
import { SecretQuestionAndResponse } from '~/models'

const props = defineProps<{ token: string }>()

const router = useRouter()
const toast = useToast()
const { account, disableForm, resetForm } = useConfirmTokenForm()

const secretQuestions = ref<string[]>([])

onMounted(async() => {
  const result = await getConfirmPasswordResetToken(props.token)
  result.map(data => {
    secretQuestions.value[0] = data[0]
    secretQuestions.value[1] = data[1]
  }).mapErr(err => toast.error(err.msg))
})

async function submit(): Promise<void> {
  const secretQuestionsAndResponses: SecretQuestionAndResponse[] = [
    {
      question: secretQuestions.value[0],
      response: account.r1.value
    },
    {
      question: secretQuestions.value[1],
      response: account.r2.value
    }
  ]
  const result = await updatePassword(props.token, secretQuestionsAndResponses, account.password.value)
  result
    .map(msg => {
      toast.success(msg)
      setTimeout(() => router.push('/connexion'), 1500)
    })
    .mapErr(err => {
      toast.error(err.msg)
    })
  resetForm()
}
</script>

<template>
  <div class="confirm-token-box">
    <h2>Confirmacion</h2>
    <form class="confirm-form" @submit.prevent="submit()">
      <input type="text" v-model="secretQuestions[0]" disabled>
      <input type="text" v-model="account.r1.value" placeholder="Ta respònsa">
      <FieldFormError
        :condition="account.r1.error.length > 0"
        :message="account.r1.error"
      ></FieldFormError>
      <input type="text" v-model="secretQuestions[1]" disabled>
      <input type="text" v-model="account.r2.value" placeholder="Ta respònsa">
      <hr>
      <FieldFormError
        :condition="account.r2.error.length > 0"
        :message="account.r2.error"
      ></FieldFormError>
      <input type="text" v-model="account.password.value" placeholder="Novèl senhal">
      <FieldFormError
        :condition="account.password.error.length > 0"
        :message="account.password.error"
      ></FieldFormError>
      <input type="text" v-model="account.confirPassword.value" placeholder="Confirmar novèl senhal">
      <FieldFormError
        :condition="account.confirPassword.error.length > 0"
        :message="account.confirPassword.error"
      ></FieldFormError>
      <button :disabled="disableForm">Confirm</button>
    </form>
  </div>
</template>

<style scoped>
.confirm-token-box {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0 30vw 0 30vw;
}
.confirm-form {
  display: flex;
  flex-direction: column;
  gap: 1rem 0;
  width: 100%;
}
input {
  min-width: 300px;
  height: 1.9rem;
  border: 1.5px solid #e6e6e6;
  border-radius: 5px 5px 5px 5px;
  padding: 0 6px 0 6px;
}
input::placeholder {
  color: rgba(87, 87, 87, 0.6);
}
input:focus {
  outline: none;
}
hr {
  width: 80%;
  border-radius: 50%;
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
