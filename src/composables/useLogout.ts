import router from "@/router/index";
import { updateAuthStatus } from "@/composables/useAuth";
import { deleteTokens } from "@/utils/local-storage";
import { deleteSessionStorage } from "@/utils/session-storage";
import { AuthStatus } from "@/models/auth_status";

export function useLogout() {
  function logout() {
    deleteTokens();
    deleteSessionStorage();
    updateAuthStatus(AuthStatus.notLoggedIn);
    router.push("/");
  }

  return { logout };
}
