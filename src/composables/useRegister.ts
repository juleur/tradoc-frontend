import router from "@/router";
import { reactive, ref, computed, watch } from "vue";
import { useNotification } from "./useNotification";
import { register } from "@/services/auth-api";

const codeErr = "Lo còdi d'activacion es obligatòriament un nombre de 4 chifras.";
const pwdLengthErr = "Cal que lo senhal contenga mai de 8 caractèrs.";
const passwordsMatched = "Lo senhal deu èsser identic al senhal de confirmacion.";
const usernameMaxLengthErr = "Cal que lo Pseudonim contenga mens de 25 caractèrs.";

function useRegister() {
  let delayTimerPwd: number;
  let delayTimerConfirPwd: number;

  const account = reactive({
    username: {
      value: "",
      error: ""
    },
    code: {
      value: 2500,
      error: ""
    },
    password: {
      value: "",
      error: ""
    },
    confirPassword: {
      value: "",
      error: ""
    }
  });

  watch(account, (newAccount, _) => {
    if (newAccount.username.value.length > 25) {
      account.username.error = usernameMaxLengthErr;
    } else {
      account.username.error = "";
    }

    if (newAccount.code.value < 1000 || newAccount.code.value > 9999) {
      account.code.error = codeErr;
    } else {
      account.code.error = "";
    }

    if (
      newAccount.password.value.length !== 0 &&
      newAccount.password.value.length < 8
    ) {
      clearTimeout(delayTimerPwd);
      delayTimerPwd = setTimeout(() => {
        account.password.error = pwdLengthErr;
      }, 500);
    } else {
      account.password.error = "";
      clearTimeout(delayTimerPwd);
    }

    if (newAccount.password.value !== newAccount.confirPassword.value) {
      if (newAccount.confirPassword.value.length < 3) {
        return;
      }
      clearTimeout(delayTimerConfirPwd);
      delayTimerConfirPwd = setTimeout(() => {
        account.confirPassword.error = passwordsMatched;
      }, 300);
    } else {
      account.confirPassword.error = "";
      clearTimeout(delayTimerConfirPwd);
    }
  });

  const disableForm = computed<boolean>(() => {
    if (
      account.username.value.length < 1 ||
      account.username.value.length > 25 ||
      account.code.error.length > 0 ||
      account.password.value.length < 8 ||
      account.password.value !== account.confirPassword.value
    ) {
      return true;
    }
    return false;
  });

  function cleanFieldsForm(): void {
    account.username.value = "";
    account.code.value = 2500;
    account.password.value = "";
    account.confirPassword.value = "";
  }

  async function submitRegisterForm(): Promise<void> {
    const code = isNaN(account.code.value)
      ? account.code.value
      : parseInt(account.code.value.toString());

    const result = await register(
      account.username.value,
      code,
      account.password.value
    );
    result
      .map(() => {
        setTimeout(() => {
          router.push("/connexion");
        }, 2500);
        cleanFieldsForm();
      })
      .mapErr(err => {
        const { addNotification } = useNotification();
        addNotification(err.errorCode, err.message);
        cleanFieldsForm();
      });
  }

  return {
    account,
    submitRegisterForm,
    disableForm
  };
}

export { useRegister };
