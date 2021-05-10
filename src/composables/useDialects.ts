import { onMounted, ref,  readonly } from "vue";
import { useNotification } from "@/composables/useNotification";
import { fetchDialectes } from "@/services/dialectes-api";
import { MainMenu } from "@/models/main_menu";

function useDialects() {
  const mainMenu = ref<MainMenu>({} as MainMenu);

  onMounted(async () => {
    const { addNotification } = useNotification();

    const result = await fetchDialectes();
    result
      .map(data => {
        mainMenu.value.dialects = data.dialects;
        mainMenu.value.totalOnlineTranslators = data.totalOnlineTranslators;
      })
      .mapErr(err => addNotification(err.errorCode, err.message));
  });

  return { mainMenu: readonly(mainMenu) };
}

export { useDialects };
