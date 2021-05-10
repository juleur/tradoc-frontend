import { onMounted, reactive, ref, watch, readonly } from "vue";
import { useNotification } from "@/composables/useNotification";
import { fetchSentences } from "@/services/dialectes-api";
import { Sentence } from "@/models/sentence";

function useSentence(locale: string) {
  const state = reactive({
    sentences: [] as Sentence[]
  });

  const dialectePrivate = ref<Sentence>(new Sentence());

  function resetSentence() {
    if (state.sentences.length > 0) {
      dialectePrivate.value.id = state.sentences[0].id;
      dialectePrivate.value.sentence = state.sentences[0].sentence;
    }
  }

  onMounted(async () => {
    const { addNotification } = useNotification();

    const result = await fetchSentences(locale);
    result
      .map(sentences => state.sentences.push(...sentences))
      .mapErr(failure => addNotification(failure.errorCode, failure.message));
    resetSentence();
  });

  watch(state.sentences, async () => {
    if (state.sentences.length == 2) {
      const { addNotification } = useNotification();

      const result = await fetchSentences(locale);
      result
        .map(sentences => state.sentences.push(...sentences))
        .mapErr(failure => addNotification(failure.errorCode, failure.message));
    }
  });

  function skipSentence(): void {
    if (state.sentences.length > 0) {
      state.sentences.shift();
      resetSentence();
    }
  }

  const dialecte = readonly(dialectePrivate);

  return { dialecte, skipSentence };
}

export { useSentence };
