import { getSecretQuestions } from '~/services'

export function useSecretQuestions() {
  const secretQuestions = ref<string[]>([])

  const sq1 = ref<string[]>([])
  const sq2 = ref<string[]>([])

  const firstSecretQuestionSelected = ref<string>('')
  const secondSecretQuestionSelected = ref<string>('')

  onMounted(async() => {
    const result = await getSecretQuestions()
    result.map(sqs => secretQuestions.value = sqs)
    sq1.value = secretQuestions.value
    sq2.value = secretQuestions.value
  })

  watch([firstSecretQuestionSelected, secondSecretQuestionSelected], ([newFSQ, newSSQ], [_, __]) => {
    sq1.value = secretQuestions.value.filter(sq => sq !== newSSQ)
    sq2.value = secretQuestions.value.filter(sq => sq !== newFSQ)
  })

  return {
    sq1: readonly(sq1),
    sq2: readonly(sq2),
    firstSecretQuestionSelected,
    secondSecretQuestionSelected,
  }
}
