<script setup lang="ts">
import { useToast } from 'vue-toastification'
import { useAuth, useLoginForm } from '~/composables'
import { login } from '~/services/public-requests'

const router = useRouter()
const toast = useToast()

const { AuthSignedIn } = useAuth()
const { translator, disableForm } = useLoginForm()

async function submitForm(): Promise<void> {
  const result = await login(translator.username.value, translator.password.value)
  result.map((accessToken) => {
    useLocalStorage('accessToken', accessToken)
    AuthSignedIn()
    toast.success('Es connectat')
    router.push('/menut-principau')
  }).mapErr((err) => {
    toast.error(err.msg)
    translator.password.value = ''
  })
}
</script>

<template>
  <transition name="slide-fade">
    <div class="login">
      <h4>Benvenguda</h4>
      <form autocomplete="none" @submit.prevent="submitForm()">
        <input
          v-model="translator.username.value"
          type="text"
          placeholder="Pseudonim"
          required
        />
        <FieldFormError
          :condition="translator.username.error.length > 0"
          :message="translator.username.error"
        ></FieldFormError>
        <input
          v-model="translator.password.value"
          type="password"
          placeholder="Senhal"
          required
        />
        <FieldFormError
          :condition="translator.password.error.length > 0"
          :message="translator.password.error"
        ></FieldFormError>
        <router-link class="forget-pwd" :to="'/senhal-obludat'">
          Senhal obludat ?
        </router-link>
        <button :disabled="disableForm">
          Se connectar
        </button>
        <hr />
        <button class="btn-register">
          <router-link :to="'/enregistrar'">
            S'enregistrar
          </router-link>
        </button>
      </form>
    </div>
  </transition>
</template>

<style scoped>
h4 {
  text-transform: uppercase;
  color: rgba(87, 87, 87, 0.5);
  font-size: 1rem;
  margin-bottom: 2rem;
}
.login {
  display: flex;
  flex-direction: column;
  min-height: 35rem;
  justify-content: center;
  align-items: center;
}
h1 {
  text-transform: uppercase;
  color: #575757;
  font-size: 1.2rem;
}
form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem 0;
  width: 350px;
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
.pwd-err {
  margin-top: -1.4rem;
  font-size: 0.7rem;
  font-weight: 600;
  color: #ca3122;
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
.btn-register {
  height: 32px;
}
hr {
  display: flex;
  margin: 0 2rem 0 2rem;
  border-radius: 10px 10px 10px 10px;
  opacity: 0.3;
  height: 1.5px;
  border: 0;
  background-color: #989898;
}
a {
  text-decoration: none;
  color: inherit;
}
.forget-pwd {
  text-decoration: underline;
  align-self: flex-end;
  font-size: 0.85rem;
  color: #404040;
}
.forget-pwd:hover {
  color: #507d82;
}
@media only screen and (max-width: 1210px) {
  .login {
    justify-content: center;
    align-items: center;
  }
  .login-right {
    display: none;
  }
}
</style>
