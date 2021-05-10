import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { authStatus } from "@/composables/useAuth";
import { useNotification } from "@/composables/useNotification";
import { isYourDialects } from "@/utils/jwt";
import { capitalize, replaceAccent } from "@/utils/utils";

export async function dialectPermission(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  if (authStatus.value) {
    const dialect = replaceAccent(to.params.dialect as string);
    const subdialect = replaceAccent(to.params.subdialect as string);

    const status = isYourDialects(`${dialect.substr(0, 3)}_${subdialect.substr(0, 3)}`);

    if (status) {
      next();
    } else {
      const { addNotification } = useNotification();
      addNotification(
        403,
        `Ès pas autorizat a far las traduccions en ${capitalize(to.params.dialect as string)} ${capitalize(to.params.subdialect as string)}`
      );
      next("/menut-principal");
    }
  } else {
    next("/sens-autorizacion");
  }
}
