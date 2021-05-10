import { computed, reactive, watch } from "vue";
import router from "@/router/index";
import { updateAuthStatus } from "@/composables/useAuth";
import { useNotification } from "@/composables/useNotification";
import { login } from "@/services/auth-api";
import { AuthStatus } from "@/models/auth_status";
import { setTokens } from "@/utils/local-storage";

const pwdMinLengthErr = "Cal que lo senhal contenga mai de 8 caractèrs.";
const usernameMaxLengthErr = "Cal que lo Pseudonim contenga mens de 25 caractèrs.";

export function useLogin() {
  const translator = reactive({
    username: {
      value: "",
      error: ""
    },
    password: {
      value: "",
      error: ""
    }
  });

  watch(translator, (newValue, __) => {
    if (newValue.username.value.length > 25) {
      translator.username.error = usernameMaxLengthErr;
    } else {
      translator.username.error = "";
    }

    if (
      newValue.password.value.length > 0 &&
      newValue.password.value.length < 8
    ) {
      translator.password.error = pwdMinLengthErr;
    } else {
      translator.password.error = "";
    }
  });

  async function submitLoginForm(): Promise<void> {
    const result = await login(
      translator.username.value,
      translator.password.value
    );
    result
      .map(tokens => {
        setTokens(tokens);
        updateAuthStatus(AuthStatus.loggedIn);
        router.push("/menut-principal");
      })
      .mapErr(err => {
        const { addNotification } = useNotification();
        addNotification(err.errorCode, err.message);

        translator.password.value = "";
      });
  }

  const disableForm = computed<boolean>(() => {
    if (
      translator.username.value.length == 0 ||
      translator.password.value.length < 8
    ) {
      return true;
    }
    return false;
  });

  return {
    translator,
    submitLoginForm,
    disableForm
  };
}
