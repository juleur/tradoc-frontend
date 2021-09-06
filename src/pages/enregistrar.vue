<script setup lang="ts">
import { useToast } from 'vue-toastification'
import { useRegisterForm } from '~/composables'
import { register } from '~/services/public_requests'

const router = useRouter()
const toast = useToast()
const { account, disableForm, resetForm } = useRegisterForm()

const show = ref<boolean>(false)

async function submitForm(): Promise<void> {
  const result = await register(
    account.username.value,
    account.email.value,
    account.password.value,
  )
  result
    /* eslint-disable array-callback-return */
    .map((_) => {
      resetForm()
      toast.success('Tu as bien été inscrit, un administrateur doit le vérifier afin que tu puisses te connecter')
      setTimeout(() => {
        router.push('/connexion')
      }, 2500)
    })
    .mapErr((err) => {
      toast.error(err.msg)
      resetForm()
    })
}

const toggleShow = () => show.value = !show.value
</script>

<template>
  <div class="register">
    <h4>Enregistrament del tieu compte</h4>
    <form class="account-valid" autocomplete="off" @submit.prevent="submitForm">
      <div v-if="show">
        <p class="title-character">
          Caractèrs autorizat
        </p>
        <p class="list-character">
          à è ò á é í ó ú ï ü ç À È Ò Á É Í Ó Ú Ï Ü Ç a b c d e f g h i j l m n o p q r s t u v x z A B C D E F G H I J L M N O P Q R S T U V X Z (e sonque un espaci per pseudonim)
        </p>
      </div>
      <div class="pseudonim-field">
        <input
          v-model="account.username.value"
          type="text"
          placeholder="Pseudonim"
          required
        />
        <div @click="toggleShow()">
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
.title-character {
  font-size: 0.85rem;
}
.list-character {
  font-size: 0.75rem;
}
.pseudonim-field {
  display: flex;
  gap: 0 10px;
}
.pseudonim-field > div {
  align-self: center;
  justify-self: center;
}
.account-valid {
  display: flex;
  flex-direction: column;
  max-width: 300px;
  gap: 1.5rem 0;
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
