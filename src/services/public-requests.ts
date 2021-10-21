import { Result, ok, err } from 'neverthrow'
import { publicAPI } from './instance-api'
import { Error, SecretQuestionAndResponse, TranslationFile } from '~/models'
import { isFetching } from '~/stores'

async function login(username: string, password: string): Promise<Result<string, Error>> {
  isFetching.value = true
  try {
    const response = await publicAPI.post('login', {
      username,
      password,
    }, { withCredentials: true })
    return ok(response.data)
  }
  catch (error: any) {
    return err({
      status: error.response.status,
      msg: error.response.data.error,
    })
  }
  finally {
    isFetching.value = false
  }
}

async function refreshToken(): Promise<Result<string, Error>> {
  isFetching.value = true
  try {
    const response = await publicAPI.get('refreshtoken', { withCredentials: true })
    return ok(response.data)
  }
  catch (error: any) {
    return err({
      status: error.response.status,
      msg: error.response.data.error,
    })
  }
  finally {
    isFetching.value = false
  }
}

async function register(username: string, email: string, password: string, secretQuestionsAndResponses: SecretQuestionAndResponse[]): Promise<Result<string, Error>> {
  isFetching.value = true
  try {
    const response = await publicAPI.post('register', {
      username,
      email,
      password,
      secretQuestionsAndResponses,
    })
    return ok(response.data.msg)
  }
  catch (error: any) {
    return err({
      status: error.response.status,
      msg: error.response.data.error,
    })
  }
  finally {
    isFetching.value = false
  }
}

async function sendPasswordReset(email: string): Promise<Result<string, Error>> {
  isFetching.value = true
  try {
    const response = await publicAPI.post('send_pwd_reset', { email })
    return ok(response.data.msg)
  }
  catch (error: any) {
    return err({
      status: error.response.status,
      msg: error.response.data.error,
    })
  }
  finally {
    isFetching.value = false
  }
}

async function getSecretQuestions(): Promise<Result<string[], Error>> {
  isFetching.value = true
  try {
    const response = await publicAPI.get('secret_questions')
    return ok(response.data)
  }
  catch (error: any) {
    return err({
      status: error.response.status,
      msg: error.response.data.error,
    })
  }
  finally {
    isFetching.value = false
  }
}

async function getConfirmPasswordResetToken(token: string): Promise<Result<string[], Error>> {
  isFetching.value = true
  try {
    const response = await publicAPI.get(`confirm_token/${token}`)
    return ok(response.data)
  }
  catch (error: any) {
    return err({
      status: error.response.status,
      msg: error.response.data.error,
    })
  }
  finally {
    isFetching.value = false
  }
}

async function updatePassword(
  token: string,
  secretQuestionsAndResponses: SecretQuestionAndResponse[],
  password: string
): Promise<Result<string, Error>> {
  isFetching.value = true
  try {
    const response = await publicAPI.post(`update_pwd`, {
      token,
      secretQuestionsAndResponses,
      password,
    })
    return ok(response.data.msg)
  }
  catch (error: any) {
    return err({
      status: error.response.status,
      msg: error.response.data.error,
    })
  }
  finally {
    isFetching.value = false
  }
}

async function getTranslationsFiles(): Promise<Result<TranslationFile[], Error>> {
  isFetching.value = true
  try {
    const response = await publicAPI.get('translations_files')
    return ok(response.data)
  }
  catch (error: any) {
    return err({
      status: error.response.status,
      msg: error.response.data.error,
    })
  }
  finally {
    isFetching.value = false
  }
}

export {
  login,
  refreshToken,
  register,
  sendPasswordReset,
  getSecretQuestions,
  getConfirmPasswordResetToken,
  updatePassword,
  getTranslationsFiles,
}
