import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { authStatus } from "@/composables/useAuth";
import { getJWT } from "@/utils/jwt";

export async function loggedInGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const jwt = getJWT();
  if (authStatus.value || !!jwt) {
    next();
  } else {
    next({
      path: "/sens-autorizacion"
    });
  }
}
