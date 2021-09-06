import { computed, reactive, watch } from 'vue'

const pwdMinLengthErr = 'Cal que lo senhal contenga mai de 8 caractèrs.'
const usernameMaxLengthErr = 'Cal que lo Pseudonim contenga mens de 25 caractèrs.'

export function useLoginForm() {
  const translator = reactive({
    username: {
      value: '',
      error: '',
    },
    password: {
      value: '',
      error: '',
    },
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  watch(translator, (newValue, _) => {
    if (newValue.username.value.length > 25)
      translator.username.error = usernameMaxLengthErr

    else
      translator.username.error = ''

    if (
      newValue.password.value.length > 0
      && newValue.password.value.length < 8
    )
      translator.password.error = pwdMinLengthErr

    else
      translator.password.error = ''
  })

  const disableForm = computed<boolean>(() => {
    if (
      translator.username.value.length === 0
      || translator.password.value.length < 8
    )
      return true

    return false
  })

  return {
    translator,
    disableForm,
  }
}
