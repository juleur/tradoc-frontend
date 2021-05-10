import { ref, readonly } from "vue";
import { AuthStatus } from "@/models/auth_status";

const translatorAuthStatus = ref<boolean>(false);

const authStatus = readonly(translatorAuthStatus);

function updateAuthStatus(status: AuthStatus): void {
  if (AuthStatus.loggedIn === status && translatorAuthStatus.value === false) {
    translatorAuthStatus.value = true;
  }
  if (
    AuthStatus.notLoggedIn === status &&
    translatorAuthStatus.value === true
  ) {
    translatorAuthStatus.value = false;
  }
}

export { authStatus, updateAuthStatus };
