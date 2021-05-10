import { onMounted, readonly, reactive } from "vue";
import { hideInfo, showInfo } from "@/utils/session-storage";

function useSessionStorage() {
  const infoBoxes = reactive({
    one: true,
    two: true,
    three: true
  });

  function updateStatusBoxes(): void {
    infoBoxes.one = showInfo(1);
    infoBoxes.two = showInfo(2);
    infoBoxes.three = showInfo(3);
  }

  onMounted(() => updateStatusBoxes());

  function hideBox(nb: number): void {
    hideInfo(nb);
    updateStatusBoxes();
  }

  return { showInfoBoxes: readonly(infoBoxes), hideBox };
}

export { useSessionStorage };
