import { reactive, computed, watch } from 'vue'

const pwdLengthErr = 'Cal que lo senhal contenga mai de 8 caractèrs.'
const responseQuestionLenghErr = 'Cal que responsa contenga mai de 3 caractèrs.'
const passwordsMatched = 'Lo senhal deu èsser identic al senhal de confirmacion.'

function useConfirmTokenForm() {
  let delayTimerPwd: NodeJS.Timeout
  let delayTimerConfirPwd: NodeJS.Timeout

  const account = reactive({
    r1: {
      value: '',
      error: '',
    },
    r2: {
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

  watch(account, (newAccount, _) => {
    // handle response field error
    if (newAccount.r1.value.length !== 0 && newAccount.r1.value.length < 3)
      account.r1.error = responseQuestionLenghErr
    else
      account.r1.error = ''

    if (newAccount.r2.value.length !== 0 && newAccount.r2.value.length < 3)
      account.r2.error = responseQuestionLenghErr
    else
      account.r2.error = ''

    // handle confirm password field
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
      account.r1.value.length < 3 ||
      account.r2.value.length < 3 ||
      account.password.value.length < 9 ||
      account.password.value !== account.confirPassword.value
    )
      return true

    return false
  })

  function resetForm(): void {
    account.r1.value = ''
    account.r2.value = ''
    account.password.value = ''
    account.confirPassword.value = ''
  }

  return {
    account,
    disableForm,
    resetForm,
  }
}

export { useConfirmTokenForm }
