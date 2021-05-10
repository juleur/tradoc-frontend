<script lang="ts">
import { defineComponent } from "vue";
import FieldFormError from "@/components/FieldFormError.vue";
import { useRegister } from "@/composables/useRegister";

export default defineComponent({
  name: "Register",
  components: {
    FieldFormError
  },
  setup() {
    return { ...useRegister() };
  }
});
</script>

<template>
  <div class="register">
    <h4>Finalizacion de l'enregistrament del tieu compte</h4>
    <form class="account-valid" @submit.prevent="submitRegisterForm">
      <input
        v-model="account.username.value"
        type="text"
        placeholder="Pseudonim"
        required
      />
      <FieldFormError
        :condition="account.username.error.length > 0"
        :message="account.username.error"
      ></FieldFormError>
      <input
        v-model="account.code.value"
        type="number"
        placeholder="Còdi d'activacion"
        min="1000"
        max="9999"
        required
      />
      <FieldFormError
        :condition="account.code.error.length > 0"
        :message="account.code.error"
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
      <button :disabled="disableForm">S'enregistrar</button>
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
