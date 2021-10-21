<script setup lang="ts">
import { useToast } from 'vue-toastification'
import { useRegisterForm } from '~/composables'
import { useSecretQuestions } from '~/composables/useSecretQuestions'
import { register } from '~/services/public-requests'
import tippy from 'tippy.js';
import { SecretQuestionAndResponse } from '~/models';


const router = useRouter()
const toast = useToast()
const { account, disableForm, resetForm } = useRegisterForm()

const { firstSecretQuestionSelected, secondSecretQuestionSelected, sq1, sq2 } = useSecretQuestions()

async function submitForm(): Promise<void> {
  const secretQuestionsAndResponses: SecretQuestionAndResponse[] = [
    {
      question: firstSecretQuestionSelected.value,
      response: account.q1.value,
    },
    {
      question: secondSecretQuestionSelected.value,
      response: account.q2.value,
    },
  ]

  const result = await register(
    account.username.value,
    account.email.value,
    account.password.value,
    secretQuestionsAndResponses,
  )

  result
    .map((msgResp) => {
      resetForm()
      toast.success(msgResp)
      setTimeout(() => router.push('/connexion'), 1500)
    })
    .mapErr((err) => {
      toast.error(err.msg)
      resetForm()
    })
}

onMounted(() => {
  tippy('#pseudo-tooltip', {
    content: "Caractèrs autorizat: à è ò á é í ó ú ï ü ç À È Ò Á É Í Ó Ú Ï Ü Ç a b c d e f g h i j l m n o p q r s t u v x z A B C D E F G H I J L M N O P Q R S T U V X Z (e sonque un espaci per pseudonim)",
    placement: 'right',
    animation: 'fade',
  });
  tippy('#sq-tooltip', {
    content: "Les réponses seront gardés",
    placement: 'right',
    animation: 'fade',
  });
})
</script>

<template>
  <div class="register">
    <h4>Enregistrament del tieu compte</h4>
    <form class="account-valid" autocomplete="off" @submit.prevent="submitForm">
      <div class="tooltip-field">
        <input
          v-model="account.username.value"
          type="text"
          placeholder="Pseudonim"
          required
        />
        <div id="pseudo-tooltip">
          <ant-design:info-circle-filled color="#507d82" width="18" height="18" />
        </div>
      </div>
      <FieldFormError
        :condition="account.username.error.length > 0"
        :message="account.username.error"
      ></FieldFormError>
      <input
        v-model="account.email.value"
        type="text"
        placeholder="Corric"
        required
      />
      <FieldFormError
        :condition="account.email.error.length > 0"
        :message="account.email.error"
      ></FieldFormError>
      <div class="tooltip-field">
        <select v-model="firstSecretQuestionSelected" class="select-list">
          <option v-for="sq in sq1" :key="sq" :value="sq">
            {{ sq }}
          </option>
        </select>
        <div id="sq-tooltip">
          <ant-design:info-circle-filled color="#507d82" width="18" height="18" />
        </div>
      </div>
      <input
        v-model="account.q1.value"
        type="text"
        placeholder="Respònsa a la question"
        required
      />
      <FieldFormError
        :condition="account.q1.error.length > 0"
        :message="account.q1.error"
      ></FieldFormError>
      <div class="tooltip-field">
        <select v-model="secondSecretQuestionSelected" class="select-list">
          <option v-for="sq in sq2" :key="sq" :value="sq">
            {{ sq }}
          </option>
        </select>
        <div id="sq-tooltip">
          <ant-design:info-circle-filled color="#507d82" width="18" height="18" />
        </div>
      </div>
      <input
        v-model="account.q2.value"
        type="text"
        placeholder="Respònsa a la question"
        required
      />
      <FieldFormError
        :condition="account.q2.error.length > 0"
        :message="account.q2.error"
      ></FieldFormError>
      <input
        v-model="account.password.value"
        type="password"
        placeholder="Senhal"
        required
      />
      <FieldFormError
        :condition="account.password.error.length > 0"
        :message="account.password.error"
      ></FieldFormError>
      <input
        v-model="account.confirPassword.value"
        type="password"
        placeholder="Senhal de confirmacion"
        required
      />
      <FieldFormError
        :condition="account.confirPassword.error.length > 0"
        :message="account.confirPassword.error"
      ></FieldFormError>
      <button :disabled="disableForm">
        S'enregistrar
      </button>
    </form>
  </div>
</template>

<style scoped>
h4 {
  color: #ea4d29;
  font-size: 1.4rem;
  margin-bottom: 2rem;
}
.register {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.tooltip-field {
  display: flex;
  gap: 0 10px;
}
.tooltip-field > div {
  align-self: center;
  justify-self: center;
}
.tooltip-field > input,
.tooltip-field > select {
  width: 100%;
}
.account-valid {
  display: flex;
  flex-direction: column;
  width: 600px;
  gap: 1.5rem 0;
}
input,
.select-list {
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
@media only screen and (max-width: 1210px) {
  /* .login {
    justify-content: center;
    align-items: center;
  } */
}
</style>
