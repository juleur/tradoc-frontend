import { ref, onMounted } from "vue";
import { useNotification } from "@/composables/useNotification";
import { Inputs } from "@/models/inputs";
import { Translation, Feminize } from "@/models/translator";
import { newTraduction } from "@/services/dialectes-api";

function useTextareas() {
  const inputs = ref([] as Inputs[]);
  const showEnglishBox = ref<boolean>(false);

  onMounted(() => {
    inputs.value.push(new Inputs());
  });

  function addLadyTranslation(): void {
    if (inputs.value.length == 1) {
      inputs.value.push(new Inputs());
    }
  }

  function deleteLadyTranslation(): void {
    if (inputs.value.length == 2) {
      inputs.value.pop();
    }
  }

  function resetTextareas() {
    inputs.value = [];
    inputs.value.push(new Inputs());
  }

  async function submitTranslation(id: number, dialect: string): Promise<void> {
    const translation = new Translation();
    translation.id = id;
    translation.abbr = dialect;
    translation.default.occitan = inputs.value[0].occitan;
    translation.default.french = inputs.value[0].french;
    if (inputs.value[0].english.length > 0) {
      translation.default.english = inputs.value[0].english;
    }
    if (inputs.value.length == 2) {
      translation.feminize = new Feminize();
      translation.feminize.occitan = inputs.value[1].occitan;
      translation.feminize.french = inputs.value[1].french;
      if (inputs.value[1].english.length > 0) {
        translation.feminize.english = inputs.value[1].english;
      }
    }

    const { addNotification } = useNotification();

    const result = await newTraduction(translation);
    result
      .map(_ => {
        addNotification(202, "La traduccion es estada presa en compte. Mercés");
        resetTextareas();
      })
      .mapErr(err => addNotification(err.errorCode, err.message));
  }

  function toggleEnglishBox() {
    showEnglishBox.value = !showEnglishBox.value;
  }

  function disabledConfirmBtn(sentence: string) {
    const minLengthOc: number = Math.round(sentence.length * (3 / 4));
    const minLengthFr: number = Math.round(sentence.length * (1 / 2));
    const minLengthEn: number = Math.round(sentence.length * (1 / 2));
    let res = false;
    inputs.value.forEach(t => {
      if (
        (t.occitan === "" || t.occitan.length < minLengthOc) ||
        (t.french === "" || t.french.length < minLengthFr) ||
        (showEnglishBox.value === true &&
          (t.english === "" || t.english.length < minLengthEn))
      ) {
        res = true;
      }
    });
    return res;
  }

  return {
    inputs,
    showEnglishBox,
    toggleEnglishBox,
    addLadyTranslation,
    deleteLadyTranslation,
    submitTranslation,
    resetTextareas,
    disabledConfirmBtn
  };
}

export default useTextareas;
