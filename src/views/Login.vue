<script lang="ts">
import { defineComponent } from "vue";
import FieldFormError from "@/components/FieldFormError.vue";
import { useLogin } from "@/composables/useLogin";

export default defineComponent({
  name: "Login",
  components: {
    FieldFormError
  },
  setup() {
    return { ...useLogin() };
  }
});
</script>

<template>
  <div class="login">
    <div class="login-left">
      <h4>Benvenguda</h4>
      <form @submit.prevent="submitLoginForm">
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
        <button :disabled="disableForm">Se connectar</button>
        <hr />
        <button class="btn-register">
          <router-link :to="'/enregistrar'">S'enregistrar</router-link>
        </button>
      </form>
    </div>
    <div class="login-right">
      <img class="troubadour" src="~@/assets/troubadour.svg" alt="troubadour" />
      <img
        class="carte-oc"
        src="~@/assets/fond_de_carte.svg"
        alt="carte occitan"
      />
      <p class="text">« Per trobar mon país, cèrcas pas dins las cartas.<br>Lo camin per i anar es pas marcat. »</p>
    </div>
  </div>
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
  min-height: 35rem;
}
.login-left {
  display: flex;
  flex-direction: column;
  padding: 0 5rem 0 5rem;
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
.login-right {
  flex-grow: 4;
  background: linear-gradient(to right, #ea4d29 -40%, #ed8d83 65%);
  border-radius: 3px 3px 3px 3px;
  display: grid;
  grid-template-columns: 2fr 3fr;
  grid-template-rows: auto 7rem;
  gap: 2rem 0;
}
.troubadour {
  grid-column: 1/2;
  grid-row: 1;
  align-self: end;
  width: 200px;
  justify-self: self-end;
}
.carte-oc {
  grid-column: 2/-1;
  grid-row: 1;
  max-width: 400px;
  align-self: center;
}
.text {
  grid-column: 1/-1;
  grid-row: 2;
  color: #ffffff;
  max-width: 30rem;
  padding: 0 0 0 3.5rem;
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
