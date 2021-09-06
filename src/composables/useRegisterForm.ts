import { reactive, computed, watch } from 'vue'
import { validateEmail } from '~/logic'
// import { useNotification } from './useNotification'
// import { register } from '@/services/auth-api'

const EmailErr = 'Lemail est dnas un mauvais format'
const pwdLengthErr = 'Cal que lo senhal contenga mai de 8 caractèrs.'
const passwordsMatched = 'Lo senhal deu èsser identic al senhal de confirmacion.'
const usernameMaxLengthErr = 'Cal que lo Pseudonim contenga mens de 25 caractèrs.'

function useRegisterForm() {
  let delayTimerPwd: NodeJS.Timeout
  let delayTimerConfirPwd: NodeJS.Timeout

  const account = reactive({
    username: {
      value: '',
      error: '',
    },
    email: {
      value: '',
      error: '',
    },
    password: {
      value: '',
      error: '',
    },
    confirPassword: {
      value: '',
      error: '',
    },
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  watch(account, (newAccount, _) => {
    if (newAccount.username.value.length > 25)
      account.username.error = usernameMaxLengthErr

    else
      account.username.error = ''

    if (newAccount.password.value.length !== 0 && !validateEmail(newAccount.email.value))
      account.email.error = EmailErr

    else
      account.email.error = ''

    if (
      newAccount.password.value.length !== 0
      && newAccount.password.value.length < 8
    ) {
      clearTimeout(delayTimerPwd)
      delayTimerPwd = setTimeout(() => {
        account.password.error = pwdLengthErr
      }, 500)
    }
    else {
      account.password.error = ''
      clearTimeout(delayTimerPwd)
    }

    if (newAccount.password.value !== newAccount.confirPassword.value) {
      if (newAccount.confirPassword.value.length < 3)
        return

      clearTimeout(delayTimerConfirPwd)
      delayTimerConfirPwd = setTimeout(() => {
        account.confirPassword.error = passwordsMatched
      }, 300)
    }
    else {
      account.confirPassword.error = ''
      clearTimeout(delayTimerConfirPwd)
    }
  })

  const disableForm = computed<boolean>(() => {
    if (
      account.username.value.length < 1
      || account.username.value.length > 25
      || !validateEmail(account.email.value)
      || account.password.value.length < 8
      || account.password.value !== account.confirPassword.value
    )
      return true

    return false
  })

  function resetForm(): void {
    account.username.value = ''
    account.email.value = ''
    account.password.value = ''
    account.confirPassword.value = ''
  }

  return {
    account,
    disableForm,
    resetForm,
  }
}

export { useRegisterForm }
