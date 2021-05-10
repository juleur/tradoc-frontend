import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { authStatus } from "@/composables/useAuth";

export function alreadyLoggedInGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  if (authStatus.value) {
    next("/");
  } else {
    next();
  }
}
